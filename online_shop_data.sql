drop database if exists online_shop_data;
create database online_shop_data;
use online_shop_data;

create table products (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) not null,
    product_description VARCHAR(255) not null,
    image_url VARCHAR(255) not null,
    price INTEGER not null,
    stock INTEGER,
);

create table order_details(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    order_id INTEGER,
    FOREIGN KEY(order_id) REFERENCES orders(id),
    product_id INTEGER not null,
    FOREIGN KEY(product_id) REFERENCES products(id),
    price FLOAT not null,
    quantity INTEGER not null
);

create table orders(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    customers_id INTEGER,
    FOREIGN KEY(customers_id),
    ammount INTEGER not null,
    shipping_address VARCHAR(255) not null,
    order_address VARCHAR(255) not null,
    order_email VARCHAR(255) not null,
    order_date DATE not null,
    order_status VARCHAR(20) not null,
);

create table customers(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) not null,
    'password' VARCHAR(80) not null,
    full_name VARCHAR(255) not null,
    billing_address VARCHAR(255) not null,
    default_shipping_address VARCHAR(255) not null,
    country VARCHAR(255) not null,
    phone VARCHAR(20) not null,
);