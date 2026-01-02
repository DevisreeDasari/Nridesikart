-- Create categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sub_categories table
CREATE TABLE sub_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_id VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  address_line_1 VARCHAR(255) NOT NULL,
  address_line_2 VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  pin_code VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create shops table
CREATE TABLE shops (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_name VARCHAR(255) NOT NULL,
  manager_name VARCHAR(255) NOT NULL,
  shop_name VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50) NOT NULL,
  business_doc_url TEXT NOT NULL,
  address_line_1 VARCHAR(255) NOT NULL,
  address_line_2 VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  pin_code VARCHAR(20) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending_approval' CHECK (status IN ('pending_approval', 'active', 'rejected', 'info_requested')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create agents table
CREATE TABLE agents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  id_proof_url TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending_approval' CHECK (status IN ('pending_approval', 'active', 'rejected', 'info_requested')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create shoppers table
CREATE TABLE shoppers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  id_proof_url TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending_approval' CHECK (status IN ('pending_approval', 'active', 'rejected', 'info_requested')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  discount_price DECIMAL(10,2),
  category VARCHAR(100) NOT NULL,
  sub_category VARCHAR(100) NOT NULL,
  brand VARCHAR(255),
  images TEXT[] NOT NULL DEFAULT '{}',
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  stock INTEGER NOT NULL DEFAULT 0,
  shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'out_of_stock')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_clerk_id ON users(clerk_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_sub_category ON products(sub_category);
CREATE INDEX idx_products_shop_id ON products(shop_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_shops_status ON shops(status);
CREATE INDEX idx_agents_status ON agents(status);
CREATE INDEX idx_shoppers_status ON shoppers(status);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_sub_categories_slug ON sub_categories(slug);
CREATE INDEX idx_sub_categories_category_id ON sub_categories(category_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_shops_updated_at BEFORE UPDATE ON shops FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_shoppers_updated_at BEFORE UPDATE ON shoppers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sub_categories_updated_at BEFORE UPDATE ON sub_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial categories
INSERT INTO categories (name, slug, description, sort_order) VALUES
('Fashion', 'fashion', 'Clothing, accessories, and fashion items', 1),
('Foods', 'foods', 'Sweets, namkeen, snacks, and food items', 2),
('Glassware', 'glassware', 'Decorative and functional glass items', 3),
('Pottery', 'pottery', 'Traditional clay and ceramic items', 4),
('Perfumes', 'perfumes', 'Indian attars, incense, and fragrances', 5),
('Handlooms', 'handlooms', 'Traditional fabrics and textiles', 6);

-- Insert initial sub-categories for Fashion
INSERT INTO sub_categories (name, slug, category_id, sort_order) 
SELECT 
  sub_category.name,
  LOWER(REPLACE(sub_category.name, ' ', '-')),
  cat.id,
  sub_category.sort_order
FROM categories cat
CROSS JOIN (VALUES 
  ('Men''s Shirts', 1),
  ('Men''s T-Shirts', 2),
  ('Men''s Jeans', 3),
  ('Women''s Sarees', 4),
  ('Women''s Kurtis', 5),
  ('Women''s Dresses', 6)
) AS sub_category(name, sort_order)
WHERE cat.slug = 'fashion';

-- Insert initial sub-categories for Foods
INSERT INTO sub_categories (name, slug, category_id, sort_order) 
SELECT 
  sub_category.name,
  LOWER(REPLACE(sub_category.name, ' ', '-')),
  cat.id,
  sub_category.sort_order
FROM categories cat
CROSS JOIN (VALUES 
  ('Sweets', 1),
  ('Namkeen', 2),
  ('Regional Snacks', 3),
  ('Spices & Masalas', 4),
  ('Packaged Foods', 5)
) AS sub_category(name, sort_order)
WHERE cat.slug = 'foods';
