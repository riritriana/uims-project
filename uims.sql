CREATE TABLE myadmin (
    id SERIAL PRIMARY KEY,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(100) NOT NULL
);

drop table myadmin;
-- admin@gmail.com, 2004

CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     email VARCHAR(500) NOT NULL,
    password VARCHAR(500) NOT NULL
);


CREATE TABLE departement(
    id_departement VARCHAR(10) PRIMARY KEY,
    name_departement VARCHAR(30) NOT NULL
);


CREATE TABLE student(
    id_student VARCHAR(10) PRIMARY KEY,
    name_student VARCHAR(30) NOT NULL,
    nim VARCHAR(20) NOT NULL,
    id_departement VARCHAR(10) REFERENCES departement(id_departement)
);


CREATE TABLE lecturer(
    id_lecturer VARCHAR(10) PRIMARY KEY,
    name_lecturer VARCHAR(30) NOT NULL,
    id_departement VARCHAR(10) NOT NULL REFERENCES departement(id_departement)
);


CREATE TABLE course(
    id_course VARCHAR(10) PRIMARY KEY,
    name_course VARCHAR(30) NOT NULL,
    id_lecturer VARCHAR(10) NOT NULL REFERENCES lecturer(id_lecturer)
);


CREATE TABLE learning(
    id_learning VARCHAR(10) PRIMARY KEY,
    name_class VARCHAR(20) NOT null,
    id_student VARCHAR(10) NOT NULL REFERENCES student(id_student),
    id_departement VARCHAR(10) NOT null REFERENCES departement(id_departement),
    id_lecturer VARCHAR(10) NOT null REFERENCES lecturer(id_lecturer),
    id_course VARCHAR(10) NOT null REFERENCES course(id_course)
   
);

