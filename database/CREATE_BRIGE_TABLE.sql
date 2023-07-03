CREATE TABLE utilisateur_destination (
    id INT AUTO_INCREMENT NOT NULL,
    destination_id INT NOT NULL,
    utilisateur_id INT NOT NULL,
    cree_le DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modifie_le DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE (destination_id, utilisateur_id),
    FOREIGN KEY (destination_id) REFERENCES destination(id),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id)
);

CREATE TABLE destination_critere (
    id INT AUTO_INCREMENT NOT NULL,
    destination_id INT NOT NULL,
    critere_id INT NOT NULL,
    cree_le DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modifie_le DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE (destination_id, critere_id),
    FOREIGN KEY (critere_id) REFERENCES critere(id),
    FOREIGN KEY (destination_id) REFERENCES destination(id)
);

CREATE TABLE utilisateur_role (
    id INT AUTO_INCREMENT NOT NULL,
    role_id INT NOT NULL,
    utilisateur_id INT NOT NULL,
    cree_le DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modifie_le DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE (role_id, utilisateur_id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id)
);