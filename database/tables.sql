CREATE TABLE user_table (
  userid text PRIMARY KEY,
  pass text,
  first_name varchar(255),
  last_name varchar(255),
  email text,
  phone text,
  profile_img BYTEA,
);

INSERT INTO user_table (userid, pass, first_name, last_name, email, phone) VALUES ('sahass5', 'hi', 'selma', 'hassan', 'selma@gmail.com', '4044512184');

CREATE TABLE user_payment (
    id int PRIMARY KEY,
    userid text,
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

CREATE TABLE product_listing (
    listing_id int PRIMARY KEY,
    userid text,
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

CREATE TABLE transaction_details (
  transaction_id int PRIMARY KEY,
  sale_amount float,
  payment_id int,
  FOREIGN KEY (payment_id) REFERENCES user_payment(ID)
)

CREATE TABLE order_details(
  order_id int,
  userid text,
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
  userid text,
  FOREIGN KEY (userid) REFERENCES user_table(userid),
  listing_id int,
  FOREIGN KEY (listing_id) REFERENCES product_listing(listing_id),
  text_msg text
)