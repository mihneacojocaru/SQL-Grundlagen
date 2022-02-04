drop database if exists sql_relations;
create database sql_relations;
use sql_relations;


create table users (
    id int primary key auto_increment not null,
    name varchar(30) not null,
    birthday date not null ,
    email varchar(255) not null
);

create table posts(
    id int primary key auto_increment not null,
    posted_at datetime not null,
    text varchar(255) not null,
    user_id int
);

alter table posts add foreign key(user_id) references users(id) on delete set null;

insert into users (name, birthday, email) values ('Tom Smith', '1960/05/23', 'tom.smith@wmail.com')

insert into posts(posted_at, text, user_id) values (now(),'Hallo Freunde! Schön, dass ihr da seid!',null);

update posts set user_id = (
    select id from users where id = 104
    )
where id = 10;

-- +++ How many posts does each user have

select name, count(users.id) as posts_number from users
left outer join posts
on users.id = posts.user_id
group by name;
