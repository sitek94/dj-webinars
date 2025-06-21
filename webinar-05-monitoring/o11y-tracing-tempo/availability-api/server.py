import logging
from flask import Flask, request, jsonify
import tracing

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Set up Flask app and instrument it
app = Flask(__name__)
from opentelemetry.instrumentation.flask import FlaskInstrumentor
FlaskInstrumentor().instrument_app(app)

# In-memory data store for product inventory.
# Initialized with values from init.sql for the sake of exercise
inventory_db = {
    "laptop": 25,
    "smartphone": 50,
    "headphones": 100,
    "tablet": 30,
    "smartwatch": 45,
}

@app.route('/health', methods=['GET'])
def health():
    logger.debug('Health check requested')
    return 'OK', 200

@app.route('/availability/<product_name>', methods=['GET'])
def get_availability(product_name):
    """
    Gets the current inventory count for a given product.
    """
    quantity = inventory_db.get(product_name, 0)
    logger.info(f"Availability check for {product_name}: {quantity} items available.")
    return jsonify({"product_name": product_name, "quantity": quantity})


@app.route('/availability/<product_name>', methods=['POST'])
def update_availability(product_name):
    """
    Updates the inventory count for a given product.
    """
    data = request.get_json()
    new_quantity = data.get('quantity')

    if new_quantity is None:
        logger.warning(f"Update failed for {product_name}: quantity missing.")
        return jsonify({"error": "Missing 'quantity' in request body"}), 400

    inventory_db[product_name] = int(new_quantity)
    logger.info(f"Stock updated for {product_name}: new quantity is {new_quantity}.")

    return jsonify({"product_name": product_name, "quantity": inventory_db[product_name]})

# Add a new endpoint to get all inventory data at once for initialization
@app.route('/availability', methods=['GET'])
def get_all_availability():
    """
    Gets the entire inventory list.
    """
    logger.info("Full inventory requested.")
    return jsonify(inventory_db)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001)
