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