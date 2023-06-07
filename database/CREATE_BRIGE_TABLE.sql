CREATE TABLE CritereDestination (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    critereId INT UNSIGNED NOT NULL,
    destinationId INT UNSIGNED NOT NULL,
    FOREIGN KEY (critereId) REFERENCES Critere(id),
    FOREIGN KEY (destinationId) REFERENCES Destination(id)
);

CREATE TABLE DestinationUtilisateur (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    destinationId INT UNSIGNED NOT NULL,
    utilisateurId INT UNSIGNED NOT NULL,
    FOREIGN KEY (destinationId) REFERENCES Destination(id),
    FOREIGN KEY (utilisateurId) REFERENCES Utilisateur(id)
);

CREATE TABLE ActiviteDestination (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    activiteId INT UNSIGNED NOT NULL,
    destinationId INT UNSIGNED NOT NULL,
    FOREIGN KEY (activiteId) REFERENCES Activite(id),
    FOREIGN KEY (destinationId) REFERENCES Destination(id)
);