create table blogs (
  id serial primary key, 
  author text, url text not null, 
  title text, 
  likes integer default 0
);

insert into blogs(author, url) values ('rath hy', 'rath-hy.com');
insert into blogs(author, url, title, likes) values ('rath hy', 'india.net', 'why i love naan', 60);
