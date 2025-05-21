# E-Commerce Platform Architecture Overview (dummy docs)

## Key Characteristics

- **Scalability**: Auto-scaling EC2 instances with RDS read replicas
- **Resilience**: Circuit breakers in API gateway
- **Performance**: Redis cache layer for product catalog

## Main Actors

- Online Shopper (Customer)
- Third-Party Seller
- System Administrator

## Main Use Cases

- Browse/search products, checkout, order tracking, reviews, returns
- Seller inventory/product management
- Admin configuration, monitoring, support

## System Landscape

- Frontend: Web/mobile apps, CDN for static content
- Backend: Microservices for catalog, orders, payments, search, recommendations, notifications
- Data: RDS for structured data, Redis for caching, S3 for static assets

## Integration

- Payment gateway (Stripe)
- CDN (Cloudflare)
- Notification (Email/SMS providers)
- Shipping/logistics partners
