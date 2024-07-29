CREATE TABLE Messages(
	id serial not null,
	name text,
	email text,
	phone text,
	subject text,
	message text,
	primary key(id)
);