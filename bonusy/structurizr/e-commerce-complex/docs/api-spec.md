# API Specification (dummy API)

## Product Service

### GET /api/products/{sku}
Returns product data as JSON.

### POST /api/products
Creates a new product (admin/seller only).

## Order Service

### POST /api/orders
Places a new order.

### GET /api/orders/{orderId}
Returns order details.

## Authentication

### POST /api/auth/login
Authenticates a user and returns a JWT.
