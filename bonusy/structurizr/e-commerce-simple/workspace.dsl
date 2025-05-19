workspace "E-Commerce System" "A simplified C4 model of an e-commerce system" {

    model {
        customer = person "Customer" "A customer who wants to buy products online"
        admin = person "Admin" "Staff member managing products and orders"
        paymentProvider = softwareSystem "Payment Provider" "Handles payment processing"

        ecommerce = softwareSystem "E-Commerce System" "Allows customers to browse and purchase products online" {
            webApp = container "Web Application" "Provides e-commerce functionality to customers" "React SPA"
            apiApplication = container "API Application" "Provides e-commerce functionality via API" "Node.js" {
                authComponent = component "Authentication Component" "Handles user authentication"
                productComponent = component "Product Component" "Manages product catalog"
                orderComponent = component "Order Component" "Manages customer orders"
            }
            database = container "Database" "Stores product catalog, orders, etc." "MongoDB"

            webApp -> apiApplication "Makes API calls to" "JSON/HTTPS"
            apiApplication -> database "Reads from and writes to"
            apiApplication -> paymentProvider "Processes payments via"
        }

        # customer -> ecommerce.webApp "Browses and purchases products using"
        customer -> ecommerce "Browses and purchases products using"
        admin -> ecommerce "Manages products and orders"
    }

    views {
        systemContext ecommerce "SystemContext" {
            include *
            autoLayout
        }

        container ecommerce "Containers" {
            include *
            autoLayout
        }

        # component ecommerce.apiApplication "Components" {
        #     include *
        #     autoLayout
        # }

        styles {
            element "Person" {
                shape Person
                background #08427B
                color #ffffff
            }
            element "Software System" {
                background #1168BD
                color #ffffff
            }
            element "Container" {
                background #438DD5
                color #ffffff
            }
            element "Component" {
                background #85BBF0
                color #000000
            }
        }
    }
}
