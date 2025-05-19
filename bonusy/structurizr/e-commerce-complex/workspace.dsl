workspace "E-Commerce Platform" "Large-scale distributed system handling online retail operations" {

    !adrs adrs
    !docs docs/overview.md

    model {
        // People
        customer = person "Online Shopper" "Uses web/mobile interfaces to browse and purchase products"
        seller = person "Third-Party Seller" "Manages product listings and inventory"
        admin = person "System Administrator" "Manages platform configuration and monitoring"

        // Core System
        ecommerce_platform = softwareSystem "E-Commerce Platform" "Handles all e-commerce operations" {
            web_app = container "Web Application" "Next.js frontend" "JavaScript"
            mobile_app = container "Mobile App" "iOS/Android clients" "Swift/Kotlin"
            api_gateway = container "API Gateway" "Kong API management"
            auth_service = container "Authentication Service" "Keycloak OIDC provider"
            product_service = container "Product Service" "Spring Boot microservice" {
                product_catalog = component "Product Catalog" "Manages SKU data"
                inventory_manager = component "Inventory Manager" "Stock level tracking"
            }
            order_service = container "Order Service" "Spring Boot microservice"
            cart_service = container "Shopping Cart Service" "Node.js microservice"
            payment_service = container "Payment Service" "Spring Boot microservice"
            search_service = container "Search Service" "Elasticsearch"
            recommendation_service = container "Recommendation Service" "ML-driven suggestions"
            notification_service = container "Notification Service" "Sends emails/SMS"
            inventory_service = container "Inventory Service" "Tracks stock levels"
            admin_portal = container "Admin Portal" "React web app"
        }

        // External Systems
        payment_gateway = softwareSystem "Payment Processor" "External Stripe integration"
        cdn = softwareSystem "CDN" "Cloudflare edge network"

        // Relationships
        customer -> ecommerce_platform "Browses products and makes purchases"
        seller -> ecommerce_platform "Manages inventory and products"
        admin -> ecommerce_platform "Configures and monitors system"
        ecommerce_platform -> payment_gateway "Processes payments"
        ecommerce_platform -> cdn "Serves static assets"

        // Internal service relationships
        web_app -> api_gateway "API requests"
        mobile_app -> api_gateway "API requests"
        api_gateway -> auth_service "Authenticates users"
        api_gateway -> product_service "Product info requests"
        api_gateway -> order_service "Order processing"
        api_gateway -> cart_service "Cart management"
        api_gateway -> payment_service "Payment processing"
        api_gateway -> search_service "Product search"
        api_gateway -> recommendation_service "Gets product suggestions"
        api_gateway -> notification_service "Sends notifications"
        api_gateway -> inventory_service "Stock checks"

        // Deployment environment belongs here!
        production = deploymentEnvironment "Production" {
            deploymentNode "AWS Cloud" {
                deploymentNode "EC2 Auto Scaling Group" {
                    containerInstance web_app
                    containerInstance api_gateway
                    containerInstance auth_service
                    containerInstance product_service
                    containerInstance order_service
                    containerInstance cart_service
                    containerInstance payment_service
                    containerInstance search_service
                    containerInstance recommendation_service
                    containerInstance notification_service
                    containerInstance inventory_service
                    containerInstance admin_portal
                }
                deploymentNode "RDS Cluster" {
                    infrastructureNode "User Database" "PostgreSQL"
                    infrastructureNode "Order Database" "PostgreSQL"
                    infrastructureNode "Product Database" "PostgreSQL"
                }
                deploymentNode "Elasticache" {
                    infrastructureNode "Redis Cache" "Redis"
                }
                deploymentNode "S3 Bucket" {
                    infrastructureNode "Static Content Storage" "S3"
                }
            }
        }
    }

    views {
        systemContext ecommerce_platform {
            include *
            autolayout lr
        }
        container ecommerce_platform {
            include *
            autolayout tb
        }
        component product_service {
            include *
            autolayout tb
        }
        // Deployment view references the environment name from model
        deployment * production {
            include *
            autolayout lr
        }
        styles {
            element "Software System" {
                background #1168bd
                color #ffffff
            }
            element "Container" {
                background #438dd5
                color #ffffff
            }
            element "Component" {
                background #85BBF0
                color #000000
            }
        }
    }

    configuration {
        visibility public
    }
}
