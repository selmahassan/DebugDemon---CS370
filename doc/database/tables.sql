CREATE TABLE user_table (
  userid SERIAL PRIMARY KEY,
  pass TEXT,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email TEXT UNIQUE, -- Assuming each email should be unique
  phone TEXT,
  bio TEXT,
  verification_token VARCHAR(128) UNIQUE,
  verified BOOLEAN
);

CREATE TABLE password_reset_tokens (
  email TEXT,
  token VARCHAR(128) UNIQUE,
  token_expiry BIGINT,    
  PRIMARY KEY (email, token) -- An email can have more than one expiry token
);

CREATE TABLE product_category(
  category_id VARCHAR PRIMARY KEY,
  category_name VARCHAR
)

INSERT INTO product_category (category_id, category_name) VALUES (1, "School Supplies"), (2, "Furniture"), (3, "Electronics"), (4, "Other"), (5, "Tickets"), (6, "Housing"), (7, "Books")

CREATE TABLE product_listing (
    listing_id SERIAL PRIMARY KEY,
    userid SERIAL,
    FOREIGN KEY (userid) REFERENCES user_table(userid),
    product_name VARCHAR,
    descr TEXT,
    category_id VARCHAR,
    FOREIGN KEY (category_id) REFERENCES product_category(category_id),
    inventory_id INT,
    price FLOAT,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    sold_at TIMESTAMP,
    listing_img VARCHAR,
    pickup VARCHAR,
    condition VARCHAR,
    sold BOOLEAN
)

CREATE TABLE comments_table (
  comment_id SERIAL PRIMARY KEY,
  comment_text TEXT,
  created_at TIMESTAMP,
  listing_id SERIAL,
  FOREIGN KEY (listing_id) REFERENCES product_listing(listing_id),
  user_id SERIAL,
  FOREIGN KEY (user_id) REFERENCES user_table(userid),
  user_name VARCHAR(255) -- References a user's first name
)

-- Drop all tables
DROP TABLE comments_table;
DROP TABLE product_listing;
DROP TABLE product_category;
DROP TABLE password_reset_tokens;
DROP TABLE user_table;