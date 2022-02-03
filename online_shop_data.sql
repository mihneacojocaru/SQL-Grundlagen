drop database if exists online_shop_data;
create database online_shop_data;
use online_shop_data;

create table products (
    id INTEGER AUTO_INCREMENT PRIMARY KEY not null,
    product_name VARCHAR(255) not null,
    product_description VARCHAR(255) not null,
    image_url VARCHAR(255),
    price DECIMAL(5,2) not null,
    stock INTEGER
);

create table order_details(
    id INT primary key AUTO_INCREMENT,
    order_id int,
    product_id int,
    price decimal(6,2),
    quantity int
);

create table orders(
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id int,
    amount int,
    shipping_address varchar(255) not null,
    order_address varchar(255) not null,
    order_email varchar(50) not null,
    order_date datetime not null,
    order_status varchar(25)
);

create table customers(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) not null,
    password VARCHAR(20) not null,
    full_name VARCHAR(255) not null,
    billing_address VARCHAR(255) not null,
    default_shipping_address VARCHAR(255) not null,
    country VARCHAR(255) not null,
    phone VARCHAR(20) not null
);

-- Set order_id & product_id as foreign keys

alter table order_details
add foreign key (order_id)
references orders(id)
on delete cascade;

alter table order_details
add foreign key (product_id)
references products(id)
on delete set null;

-- Set customer_id as foreign key

alter table orders
add foreign key (customer_id)
references customers(id)
on delete set null;

--Add Products 

insert into products( product_name, product_description, image_url, price, stock)
values ('Sweatshirt', 'Lorem ipsum dolor sit amet, consectetur adipisicing.','http://image.com', 35, 130);

--Add Customers

insert into customers(email, password, full_name, billing_address, default_shipping_address, country, phone)
values (
        'cloey.parsons@example.com','parola1234','Cloy Parsons',
        'Third Str. 123','Fourth Str. 321','USA','+03321654670'
       );


insert into orders(shipping_address, order_address, order_email, order_date)
select billing_address,default_shipping_address,email,now()
from customers
where id=1001;

update orders set customer_id = (
                                select customers.id
                                from customers
                                where customers.id=1000
                                )
where id = 200;

update orders set amount = 5 where orders.id = 201;

update orders set order_status = 'delivered' where id = 201;

update orders set order_address = (
    select billing_address from customers
    where customers.id = 1000
    ) where orders.id = 200;

update orders set order_email = (
    select email from customers
    where customers.id = 1000
    ) where orders.id = 200;

--add new order 
insert into orders(customer_id, amount, shipping_address, order_address, order_email, order_date, order_status)
values (1000,2,'n/a','n/a','n/a',now(),'waiting');

update orders
set shipping_address = (
    select default_shipping_address from customers
    where customers.id = 1000
    )
where orders.id = 202;

update orders
set order_address = (
    select billing_address from customers
    where customers.id = 1000
    )
where orders.id = 202;

update orders
set order_email = (
    select email from customers
    where customers.id = 1000
    )
where orders.id = 202;

----Create testable
CREATE TABLE TestTable (FirstName VARCHAR(100), LastName VARCHAR(100))
----INSERT INTO TestTable using SELECT
INSERT INTO TestTable (FirstName, LastName)
SELECT FirstName, LastName
FROM Person.Contact
WHERE EmailPromotion = 2
----Verify that Data in TestTable
SELECT FirstName, LastName
FROM TestTable
----Clean Up Database
DROP TABLE TestTable
GO

GO
----Create a new table and insert into table using SELECT INSERT
SELECT FirstName, LastName
INTO TestTable
FROM Person.Contact
WHERE EmailPromotion = 2
----Verify that Data in TestTable
SELECT FirstName, LastName
FROM TestTable
----Clean Up Database
DROP TABLE TestTable
GO