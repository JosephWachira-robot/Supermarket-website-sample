CREATE TABLE IF NOT EXISTS users ( id SERIAL PRIMARY KEY, full_name VARCHAR(255), email VARCHAR(255) UNIQUE, phone VARCHAR(20), password_hash VARCHAR(255), role VARCHAR(20) DEFAULT 'customer', created_at TIMESTAMP DEFAULT now() );

CREATE TABLE IF NOT EXISTS categories ( id SERIAL PRIMARY KEY, name VARCHAR(100) UNIQUE, slug VARCHAR(120) UNIQUE );

CREATE TABLE IF NOT EXISTS products ( id SERIAL PRIMARY KEY, name VARCHAR(255), slug VARCHAR(255) UNIQUE, description TEXT, price NUMERIC(10,2), sku VARCHAR(100), stock INTEGER DEFAULT 0, category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL, image_url TEXT, created_at TIMESTAMP DEFAULT now() );

CREATE TABLE IF NOT EXISTS orders ( id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id), total_amount NUMERIC(10,2), currency VARCHAR(10) DEFAULT 'KES', status VARCHAR(50) DEFAULT 'pending', payment_method VARCHAR(50), metadata JSONB, created_at TIMESTAMP DEFAULT now() );

CREATE TABLE IF NOT EXISTS order_items ( id SERIAL PRIMARY KEY, order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE, product_id INTEGER REFERENCES products(id), quantity INTEGER, unit_price NUMERIC(10,2) );

CREATE TABLE IF NOT EXISTS payments ( id SERIAL PRIMARY KEY, order_id INTEGER REFERENCES orders(id), provider VARCHAR(50), provider_payment_id VARCHAR(255), amount NUMERIC(10,2), status VARCHAR(50), raw_response JSONB, created_at TIMESTAMP DEFAULT now() );

INSERT INTO categories (name, slug) VALUES ('Groceries','groceries') ON CONFLICT DO NOTHING;
INSERT INTO categories (name, slug) VALUES ('Beverages','beverages') ON CONFLICT DO NOTHING;
INSERT INTO categories (name, slug) VALUES ('Household','household') ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, sku, stock, category_id, image_url) VALUES
('Sunrise Maize Flour 2kg','sunrise-maize-2kg','Maize flour - 2kg pack',180.00,'SMF-2KG',50,1,'/images/sunrise-maize-2kg.jpg') ON CONFLICT DO NOTHING,
('Tusker Lager 500ml','tusker-500ml','Bottle 500ml',150.00,'TUS-500',120,2,'/images/tusker-500ml.jpg') ON CONFLICT DO NOTHING,
('Omo Washing Powder 2kg','omo-2kg','Laundry powder',400.00,'OMO-2KG',80,3,'/images/omo-2kg.jpg') ON CONFLICT DO NOTHING;

INSERT INTO users (full_name, email, phone, password_hash, role) VALUES ('Sumkam Admin','admin@sumkamsupermarket.co.ke','+254700000000','$2b$12$EXAMPLEHASH','admin') ON CONFLICT DO NOTHING;
