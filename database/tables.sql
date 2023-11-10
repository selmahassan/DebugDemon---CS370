CREATE TABLE user_table (
  userid SERIAL PRIMARY KEY,
  pass text,
  first_name varchar(255),
  last_name varchar(255),
  email text UNIQUE, -- Assuming each email should be unique
  phone text,
  profile_img BYTEA
);


INSERT INTO user_table (pass, first_name, last_name, email, phone) VALUES ('selma', 'selma', 'hassan', 'selma@emory.edu', '4044512184');
INSERT INTO user_table (pass, first_name, last_name, email, phone) VALUES ('ryan', 'ryan', 'zhao', 'ryan@emory.edu', '4044512184');
CREATE TABLE user_payment (
    id int PRIMARY KEY,
    userid SERIAL,
    FOREIGN KEY (userid) REFERENCES user_table(userid),
    payment_type varchar(255),
    payment_provider varchar(255),
    account_no int,
    expiry date
)

CREATE TABLE product_category(
  category_id varchar PRIMARY KEY,
  category_name varchar
)

INSERT INTO product_category (category_id, category_name) VALUES (1, "School Supplies"), (2, "Furniture"), (3, "Electronics"), (4, "Other"), (5, "Tickets"), (6, "Housing"), (7, "Books")

CREATE TABLE product_listing (
    listing_id SERIAL PRIMARY KEY,
    userid SERIAL,
    FOREIGN KEY (userid) REFERENCES user_table(userid),
    product_name varchar,
    descr text,
    category_id varchar,
    FOREIGN KEY (category_id) REFERENCES product_category(category_id),
    inventory_id int,
    price float,
    created_at timestamp,
    modified_at timestamp,
    sold_at timestamp,
    listing_img BYTEA
)
INSERT INTO product_listing (userid, product_name, descr, category_id, inventory_id, price) VALUES (1, 'Laptop', 'New macbook 2023', 3, 1, 1050);


CREATE TABLE transaction_details (
  transaction_id int PRIMARY KEY,
  sale_amount float,
  payment_id int,
  FOREIGN KEY (payment_id) REFERENCES user_payment(ID)
)

CREATE TABLE order_details(
  order_id int,
  userid SERIAL,
  FOREIGN KEY (userid) REFERENCES user_table(userid),
  listing_id int,
  FOREIGN KEY (listing_id) REFERENCES product_listing(listing_id),
  transaction_id int,
  FOREIGN KEY (transaction_id) REFERENCES transaction_details(transaction_id),
  order_status varchar,
  created_at timestamp
)

CREATE TABLE messages (
  message_id int,
  userid SERIAL,
  FOREIGN KEY (userid) REFERENCES user_table(userid),
  listing_id int,
  FOREIGN KEY (listing_id) REFERENCES product_listing(listing_id),
  text_msg text
)


DROP TABLE messages;
DROP TABLE order_details;
DROP TABLE transaction_details;
DROP TABLE product_listing;
DROP TABLE product_category;
DROP TABLE user_payment;
DROP TABLE user_table;