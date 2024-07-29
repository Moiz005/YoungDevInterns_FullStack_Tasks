CREATE TABLE admin(
	id SERIAL NOT NULL,
	name text,
	phone text,
	username text unique,
	password text,
	type text,
	primary key(id)
);

CREATE TABLE student(
	id SERIAL NOT NULL,
	name text,
	phone text,
	father_name text,
	username text unique,
	password text,
	previousgrade text,
	courses text[],
	type text,
	primary key(id)
);