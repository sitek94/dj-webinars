import {faker} from '@faker-js/faker'
import { sleep } from 'bun';

/**
 * Configuration
 */
const API_BASE_URL = "http://localhost:3000";
const PRODUCTS_API_URL = `${API_BASE_URL}/availability`;

// We'll scale a 24-hour day into a shorter real-time duration.
// 1 simulated hour = 30 real-time seconds.
// Total simulation time: 24 * 30s = 720s = 12 minutes.
const SIM_HOUR_TO_REAL_MS = 30 * 1000;
const SIM_MINUTE_TO_REAL_MS = SIM_HOUR_TO_REAL_MS / 60;

const INITIAL_INVENTORY = {
  laptop: 25,
  smartphone: 50,
  headphones: 100,
  tablet: 30,
  smartwatch: 45,
};

// Keep track of the current state of inventory locally in the script.
let currentInventory = { ...INITIAL_INVENTORY };

/**
 * Sends a POST request to the products-api to update the quantity of a product.
 * @param productName The name of the product to update.
 * @param quantity The new inventory quantity.
 */
async function updateAvailability(productName: keyof typeof INITIAL_INVENTORY, quantity: number) {
  const roundedQuantity = Math.max(0, Math.floor(quantity));
  console.log(`[API Call] Updating ${productName} quantity to ${roundedQuantity}`);

  try {
    const response = await fetch(`${PRODUCTS_API_URL}/${productName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: roundedQuantity }),
    });

    if (!response.ok) {
      console.error(
        `[API Error] Failed to update ${productName}: ${response.status} ${response.statusText}`
      );
    }
    // Update our local state only after a successful API call.
    currentInventory[productName] = roundedQuantity;
  } catch (error) {
    console.error(`[Network Error] Could not connect to the API:`, error.message);
    // Exit if we can't talk to the API, as the simulation can't proceed.
    process.exit(1);
  }
}

/**
 * Generates a series of sale events for a given time window.
 * This function helps create more realistic, randomized activity.
 *
 * @param products An array of product names to generate sales for.
 * @param timeWindow An object with `startHour` and `endHour`.
 * @param salesConfig An object with `salesPerHour` and `unitsPerSale` (min/max).
 * @returns An array of sorted sale event objects.
 */
function generateSaleEvents(
  products: (keyof typeof INITIAL_INVENTORY)[],
  timeWindow: { startHour: number; endHour: number },
  salesConfig: {
    salesPerHour: { min: number; max: number };
    unitsPerSale: { min: number; max: number };
  }
) {
  const events: { product: string; time: Date; units: number }[] = [];
  const { startHour, endHour } = timeWindow;
  const durationHours = endHour - startHour;

  for (const product of products) {
    const totalSales = faker.number.int({
      min: durationHours * salesConfig.salesPerHour.min,
      max: durationHours * salesConfig.salesPerHour.max,
    });

    for (let i = 0; i < totalSales; i++) {
      const saleTime = faker.date.between({
        from: new Date(0).setHours(startHour, 0, 0),
        to: new Date(0).setHours(endHour - 1, 59, 59),
      });

      events.push({
        product,
        time: saleTime,
        units: faker.number.int(salesConfig.unitsPerSale),
      });
    }
  }

  return events.sort((a, b) => a.time.getTime() - b.time.getTime());
}

/**
 * Executes a list of sale events, sleeping between them to simulate time passing.
 * @param events An array of sale event objects.
 * @param startTime The Date object representing the start of the event block.
 */
async function runEventBlock(events: any[], startTime: Date) {
  let lastEventTime = startTime;

  for (const event of events) {
    const simMinutesSinceLastEvent =
      (event.time.getTime() - lastEventTime.getTime()) / (1000 * 60);
    const realWaitMs = simMinutesSinceLastEvent * SIM_MINUTE_TO_REAL_MS;

    await sleep(realWaitMs);

    const newQuantity = currentInventory[event.product] - event.units;
    await updateAvailability(event.product, newQuantity);

    lastEventTime = event.time;
  }
}

// --- Main Simulation Logic ---

console.log("Starting Black Friday Sales Event Simulation...");
console.log(`Simulation will run for approximately ${SIM_HOUR_TO_REAL_MS * 24 / 1000 / 60} minutes.`);
console.log("-------------------------------------------------");


// 0. Reset to Initial State
console.log("[SETUP] Resetting all product inventory to initial values...");
for (const [product, quantity] of Object.entries(INITIAL_INVENTORY)) {
  await updateAvailability(product as keyof typeof INITIAL_INVENTORY, quantity);
}
console.log("[SETUP] Reset complete.");
let simClock = new Date(0); // Clock starts at 00:00


// 1. Overnight Organic Sales (00:00 - 09:00)
console.log("\n--- Simulating: Overnight Organic Sales (00:00 - 09:00) ---");
const overnightEvents = generateSaleEvents(
  ["laptop", "headphones", "smartwatch"],
  { startHour: 0, endHour: 9 },
  {
    salesPerHour: { min: 0.2, max: 0.4 }, // ~2-3 sales over 9 hours
    unitsPerSale: { min: 1, max: 2 },
  }
);
await runEventBlock(overnightEvents, simClock);
simClock.setHours(9, 0, 0);
await sleep(1000); // Small pause for clarity


// 2. Morning Hype (09:00)
console.log("\n--- Simulating: Morning Hype (09:05) ---");
const hypeTime = new Date(simClock.getTime() + 5 * 60 * 1000); // 09:05
const realWaitTilHype = 5 * SIM_MINUTE_TO_REAL_MS;
await sleep(realWaitTilHype);

const hypeSaleUnits = faker.number.int({ min: 10, max: 15 });
console.log(`[09:05] Marketing blast! Sudden interest in Headphones.`);
await updateAvailability("headphones", currentInventory.headphones - hypeSaleUnits);
simClock.setHours(12, 0, 0); // Advance clock to noon for next block
await sleep(1000);


// 3. Doorbuster Sale (12:00 - 16:00)
console.log("\n--- Simulating: Doorbuster Sale (12:00 - 16:00) ---");
const doorbusterStart = new Date(0);
doorbusterStart.setHours(12, 0, 0);

// 3a. Smartwatch sells out completely between 12:00 and 14:00
const smartwatchSelloutEvents: { product: string; time: Date; units: number }[] = [];
let smartwatchStock = currentInventory.smartwatch;
const numSales = faker.number.int({min: 8, max: 12});
for (let i = 0; i < numSales && smartwatchStock > 0; i++) {
    const saleTime = faker.date.between({
        from: new Date(0).setHours(12,0,0),
        to: new Date(0).setHours(13,59,0)
    });
    // Sell a variable chunk, ensuring the last sale clears the stock
    const unitsToSell = (i === numSales - 1) ? smartwatchStock : Math.ceil(smartwatchStock / (numSales - i)) + faker.number.int({min: -1, max: 2});
    smartwatchSelloutEvents.push({
        product: "smartwatch",
        time: saleTime,
        units: unitsToSell,
    });
    smartwatchStock -= unitsToSell;
}

// 3b. Laptop and Headphones sell steadily
const otherDoorbusterEvents = generateSaleEvents(
  ["laptop", "headphones"],
  { startHour: 12, endHour: 16 },
  {
    salesPerHour: { min: 2, max: 4 }, // 1 sale every 15-30 mins
    unitsPerSale: { min: 3, max: 8 },
  }
);

const allDoorbusterEvents = [...smartwatchSelloutEvents, ...otherDoorbusterEvents]
    .sort((a,b) => a.time.getTime() - b.time.getTime());

await runEventBlock(allDoorbusterEvents, doorbusterStart);
simClock.setHours(16, 0, 0);
await sleep(1000);


// 4. The Restock (16:00)
console.log("\n--- Simulating: The Restock (16:00) ---");
const restockQuantity = faker.number.int({ min: 70, max: 80 });
console.log(`[16:00] A new shipment arrived! Headphones are restocked.`);
await updateAvailability("headphones", restockQuantity);
simClock.setHours(18,0,0); // Next phase is at 18:00
// Wait for 2 simulated hours (16:00 -> 18:00)
await sleep(2 * SIM_HOUR_TO_REAL_MS);


// 5. Evening Wind-Down (18:00 - 24:00)
console.log("\n--- Simulating: Evening Wind-Down (18:00 - 24:00) ---");
const eveningStart = new Date(0);
eveningStart.setHours(18, 0, 0);
const eveningEvents = generateSaleEvents(
  ["laptop", "headphones"], // Smartwatch is sold out
  { startHour: 18, endHour: 24 },
  {
    salesPerHour: { min: 1, max: 1.5 }, // Roughly one sale per hour
    unitsPerSale: { min: 1, max: 3 },
  }
);
await runEventBlock(eveningEvents, eveningStart);


// --- Simulation End ---
console.log("\n-------------------------------------------------");
console.log("Black Friday Simulation complete!");
console.log("Final Inventory State:");
console.table(currentInventory);
console.log(
  "Check your Grafana dashboard. You may need to set the time range to 'Last 15 minutes'."
);

