drop database if exists book_store;
create database book_store;
use book_store;

create table books(
  id int primary key auto_increment,
  book_title varchar(50) not null,
  author varchar(50) not null,
  date date not null,
  isbn_no varchar(11) not null
);

