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
    name_departement VARCHAR(30) NOT null,
    name_dekan  VARCHAR(30) NOT null
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


CREATE TABLE fees(
    id_fees VARCHAR(10) PRIMARY KEY,
    id_student VARCHAR(10) NOT NULL REFERENCES student(id_student),
    id_departement VARCHAR(10) NOT null REFERENCES departement(id_departement),  
    pay_fees int not null 
);
drop table fees
drop table course
drop table lecturer
drop table student
drop table departement