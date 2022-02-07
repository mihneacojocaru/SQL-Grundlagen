-- //+++ Products

-- Get all products 

select * from products;

--Add new Product

insert into products( product_name, product_description, image_url, price, stock)
values ('Sweatshirt', 'Lorem ipsum dolor sit amet, consectetur adipisicing.','http://image.com', 35, 130);

--Update Product 

update products set product_name='Slippers' where id = 5;

--Delete Product

delete from products where id = 6;

-- //+++ Orders

--Get all orders

select * from orders;


--Add new Order + Update

insert into orders(customer_id, amount, shipping_address, order_address, order_email, order_date, order_status)
values (1003,1,'n/a','n/a','n/a',now(),'waiting');

update orders
set shipping_address = (
    select default_shipping_address from customers
    where customers.id = 1003
    )
where orders.id = 204;

update orders
set order_address = (
    select billing_address from customers
    where customers.id = 1003
    )
where orders.id = 204;

update orders
set order_email = (
    select email from customers
    where customers.id = 1003
    )
where orders.id = 204;

--Delete order

delete from orders where id = 205;

-- //+++ Order Details

--Add new Order Details

insert into order_details (order_id, product_id, price, quantity)
VALUES (201,4,35,1);

--update order details

update order_details set quantity = 5 where id = 502;
update order_details set price = quantity * (select products.price from products where id=order_details.product_id) where id = 502;

--Delete order details

delete from order_details where id = 503;

-- //+++ Customers

--Get all customers 

select * from customers;

--Add new Customer

insert into customers(email, password, full_name, billing_address, default_shipping_address, country, phone)
values (
        'john.wheats@example.com','parola1234','John Wheats',
        'Seventh Str. 777','Eight Str. 788','Australia','+0728563728332'
       );

--Update Customer 

update customers set full_name = 'New Name' where id = 1005;

--Delete Customer

delete from customers where id = 1005;


-- //TODO cea mai scumpa comanda a unui user.
select * from order_details order by price desc limit 1;





