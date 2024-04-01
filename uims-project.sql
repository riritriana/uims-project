CREATE TABLE myadmin (
    id SERIAL  PRIMARY KEY,
    email VARCHAR(30) NOT NULL,
    password VARCHAR NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(20) NOT NULL
);

CREATE TABLE jurusan (
    id_jurusan VARCHAR(10) PRIMARY KEY,
    nama_jurusan VARCHAR(30) NOT NULL
);

CREATE TABLE mahasiswa (
    id_mhs VARCHAR(10) PRIMARY KEY,
    nama_mhs VARCHAR(30) NOT NULL,
    nim VARCHAR(20) NOT NULL,
    id_jurusan VARCHAR(10) REFERENCES jurusan(id_jurusan)
);

CREATE TABLE dosen (
    id_dosen VARCHAR(10) PRIMARY KEY,
    nama_dosen VARCHAR(30) NOT NULL,
    id_jurusan VARCHAR(10) NOT NULL REFERENCES jurusan(id_jurusan)
);

CREATE TABLE matakuliah (
    id_matkul VARCHAR(10) PRIMARY KEY,
    nama_matkul VARCHAR(30) NOT NULL,
    id_dosen VARCHAR(10) NOT NULL REFERENCES dosen(id_dosen)
);

CREATE TABLE learning(
    id_learning VARCHAR(10) PRIMARY KEY,
    id_mhs VARCHAR(10) NOT NULL REFERENCES mahasiswa(id_mhs),
    id_jurusan VARCHAR(10) NOT null REFERENCES jurusan(id_jurusan),
    id_dosen VARCHAR(10) NOT null REFERENCES dosen(id_dosen),
    id_matkul VARCHAR(10) NOT null REFERENCES matakuliah(id_matkul),
    kelas VARCHAR(20) NOT NULL
);
