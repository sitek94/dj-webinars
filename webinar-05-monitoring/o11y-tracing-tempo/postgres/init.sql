CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, price, stock) VALUES 
('laptop', 999.99, 25),
('smartphone', 699.99, 50),
('headphones', 199.99, 100),
('tablet', 349.99, 30),
('smartwatch', 249.99, 45);
