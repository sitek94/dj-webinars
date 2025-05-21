# Deliveroo Vehicle Service

This is a simple Spring Boot application that provides a REST API for managing vehicles. It uses PostgreSQL as the database and is fully containerized using Docker Compose.

## Prerequisites
- Docker and Docker Compose installed

## Running the Application

1. **Build and start the services:**
   ```sh
   docker compose up --build
   ```
   This will build the application Docker image and start both the app and PostgreSQL database.

2. **Access the API:**
   - The application will be available at [http://localhost:8080](http://localhost:8080)
   - The main endpoint:
     - `GET /vehicles` — returns a list of vehicles (pre-populated with demo data)

   Example using `curl`:
   ```sh
   curl http://localhost:8080/vehicles
   ```

## Project Structure
- `src/main/java/com/deliveroo/` — Java source code
- `src/main/resources/application.properties` — Spring Boot configuration
- `Dockerfile` — Docker build instructions
- `compose.yaml` — Docker Compose setup for app and database

## Useful Maven Commands (for local development)
- Build the project: `./mvnw clean package`
- Run tests: `./mvnw test`
- Run locally: `./mvnw spring-boot:run`

## Notes
- The database is initialized with some sample vehicles on first run.
- The application uses Java 21 and Spring Boot 3. 