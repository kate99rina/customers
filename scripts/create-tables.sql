
CREATE TABLE customers (
    account_number BIGINT PRIMARY KEY,
    surname VARCHAR(50) NOT NULL,
    name VARCHAR(20) NOT NULL,
    patronymic VARCHAR(20),
    birth_date VARCHAR(11),
    inn VARCHAR(12),
    user_full_name VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'Не в работе')
    CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE INDEX idx_user_full_name ON customers (user_full_name);
INSERT INTO customers (account_number, surname, name, patronymic, birth_date, inn, user_full_name, status)
VALUES (12345,'Козлов','Виктор','Сергеевич','1978-03-23','123537836833','Трофимов Сергей Александрович','Не в работе'),
(23456,'Ли','Ян','Ни','1987-12-01','467829479473','Трофимов Сергей Александрович','В работе'),
(34567,'Куликов','Сергей','Анатольевич','2000-07-09','192749632482','Винивитина Ксения Юрьевна','В работе');

CREATE TABLE IF NOT EXISTS users (
    full_name VARCHAR(100) PRIMARY KEY,
    login VARCHAR(50) NOT NULL,
    password VARCHAR(30) NOT NULL)
    CHARACTER SET utf8 COLLATE utf8_general_ci;

ALTER TABLE users
ADD CONSTRAINT foreign_key_user_full_name
FOREIGN KEY (full_name)
REFERENCES customers (user_full_name);

INSERT INTO users (full_name, login, password)
VALUES ('Трофимов Сергей Александрович', 'trofim', 'password'),('Винивитина Ксения Юрьевна','vinivitina','password');
