# HouseHub Database Schema
-- Member 3  tables: requests, wishlist
-- Member 1  tables: users
-- Member 2  tables: listings, listing_images

DATABASE CREATING 
CREATE DATABASE IF NOT EXISTS househub;
USE househub;

-- ── Member 1  table (  for reference ) ─────────────────────
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role ENUM('owner', 'tenant', 'admin') NOT NULL DEFAULT 'tenant',
  created_at DATETIME DEFAULT NOW()
);

-- ── Member 2  table (for reference ) ─────────────────────
CREATE TABLE IF NOT EXISTS listings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  location VARCHAR(200) NOT NULL,
  price INT NOT NULL,
  room_type ENUM('single room', 'full house', 'mess') NOT NULL,
  bedrooms INT DEFAULT 1,
  amenities TEXT,
  status ENUM('available', 'unavailable') DEFAULT 'available',
  created_at DATETIME DEFAULT NOW(),
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS listing_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT NOT NULL,
  image_url VARCHAR(300) NOT NULL,
  FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);

-- ── Member 3  tables ──────────────────────────────────────────

-- Requests table: Tenant → Owner interest request
CREATE TABLE IF NOT EXISTS requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT NOT NULL,
  tenant_id INT NOT NULL,
  status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
  created_at DATETIME DEFAULT NOW(),
  FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id) REFERENCES users(id) ON DELETE CASCADE,
  -- একই tenant একই listing এ duplicate pending request দিতে পারবে না
  UNIQUE KEY unique_pending (listing_id, tenant_id, status)
);

-- Wishlist table: Tenant এর saved listings
CREATE TABLE IF NOT EXISTS wishlist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tenant_id INT NOT NULL,
  listing_id INT NOT NULL,
  created_at DATETIME DEFAULT NOW(),
  FOREIGN KEY (tenant_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
  -- Duplicate not save
  UNIQUE KEY unique_wishlist (tenant_id, listing_id)
);

-- ── Sample test data ─────────────────────────────────────────────
--  dummy data for testing (optional)

INSERT IGNORE INTO users (name, email, password, phone, role) VALUES
('Rahim Owner', 'owner@test.com', '$2b$10$example_hashed', '01700000001', 'owner'),
('Karim Tenant', 'tenant@test.com', '$2b$10$example_hashed', '01700000002', 'tenant'),
('Admin User', 'admin@test.com', '$2b$10$example_hashed', '01700000003', 'admin');

INSERT IGNORE INTO listings (owner_id, title, description, location, price, room_type, bedrooms, amenities, status) VALUES
(1, 'Nice 2 Room Flat in Mirpur', 'Clean and well ventilated', 'Mirpur, Dhaka', 8000, 'single room', 2, 'wifi,gas', 'available'),
(1, 'Full House in Dhanmondi', 'Spacious house near road', 'Dhanmondi, Dhaka', 25000, 'full house', 4, 'parking,wifi', 'available'),
(1, 'Mess Seat in Mohammadpur', 'Male mess, meals available', 'Mohammadpur, Dhaka', 4500, 'mess', 1, 'wifi', 'available');
