CREATE TABLE utilisateur (
  id INT AUTO_INCREMENT NOT NULL,
  login VARCHAR(50) NOT NULL UNIQUE,
  mot_de_passe VARCHAR(60) NOT NULL,
  email VARCHAR(256) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE destination (
  id INT AUTO_INCREMENT NOT NULL,
  nom VARCHAR(70) NOT NULL,
  url_image VARCHAR(2048) NOT NULL,
  description VARCHAR(125) NOT NULL,
  titre VARCHAR(100) NOT NULL UNIQUE,
  article VARCHAR(1000) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE critere (
  id INT AUTO_INCREMENT NOT NULL,
  nom VARCHAR(50) NOT NULL UNIQUE,
  description VARCHAR(125) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  nom VARCHAR(50) NOT NULL UNIQUE,
  description VARCHAR(125) NOT NULL,
  PRIMARY KEY (id)
);