# Database

Swoopermarket uses Vercel Postgres, a serverless SQL database designed to integrate with Vercel Functions and the frontend framework, to manage profiles, user-generated content, and other data. Swoopermarket also uses Vercel Blob to store and serve user-uploaded image files through a global network using unique and unguessable URLs.

## Vercel Postgres Database

Our database contains the following tables:
'CREATE TABLE user_table (
  userid SERIAL PRIMARY KEY,
  pass TEXT,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email TEXT UNIQUE,
  phone TEXT,
  bio TEXT,
  verification_token VARCHAR(128) UNIQUE,
  verified BOOLEAN
);'
This table contains user profile information, including a userid (auto-generated using the SERIAL database object generator), password, first and last name, a unique email address, phone number, profile bio, verification token, and a boolean indicating whether or not the user is verified.

'CREATE TABLE password_reset_tokens (
  email TEXT,
  token VARCHAR(128) UNIQUE,
  token_expiry BIGINT,    
  PRIMARY KEY (email, token)
);'
This table contains information on password reset tokens, which allow users to recover their account if they forget their password. It contains the user's email address that the token will be sent to, the token itself, and token_expiry, which indicates when the token expires. Both email and token are a primary key for this table, indicating that a user can have multiple expiry tokens.

'CREATE TABLE product_category(
  category_id VARCHAR PRIMARY KEY,
  category_name VARCHAR
)'
This table contains the product category names, as well as their identification numbers to be referenced in the code. Examples of categories include school supplies, electronics, furniture, and others.

'CREATE TABLE product_listing (
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
)'
This table contains product listing information. It includes an auto-generated listing_id number, the userid from the user_table, product name, description, category_id from the 
product_category table, inventory identification number, price, timestamps for creation, modification, and selling, a URL for the listing image stored in the Vercel Blob, pickup location,
condition, and a boolean indicating whether or not the item has been sold.

'CREATE TABLE comments_table (
  comment_id SERIAL PRIMARY KEY,
  comment_text TEXT,
  created_at TIMESTAMP,
  listing_id SERIAL,
  FOREIGN KEY (listing_id) REFERENCES product_listing(listing_id),
  user_id SERIAL,
  FOREIGN KEY (user_id) REFERENCES user_table(userid),
  user_name VARCHAR(255)
)'
Last is the table for comments. This table contains an auto-generated comment id number, the text of the comment itself, creation timestamp, listing_id from the product_listing table,
user_id from the user_table, and user_name which references the user's first name.

## Vercel Blob Store

The blob storage holds user-uploaded listing image files as blobs. For each blob, it generates a unique and unguessable URL with which that file can be accessed. By keeping track of this 
URL in the product_listing table, we can refer to it to display all listings in the home page, as well as in each single listing page. 
