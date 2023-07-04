INSERT INTO critere(nom, description) VALUES 
('Mer', 'Filtre de destination'),
('Montagne', 'Filtre de destination'),
('Campagne', 'Filtre de destination'),
('Plage', 'Filtre de destination'),
('Culture', 'Filtre de destination'),
('Art', 'Filtre de destination'),
('Nature', 'Filtre de destination'),
('Sports', 'Filtre de destination'),
('Gastronomie', 'Filtre de destination'),
('Aventure', 'Filtre de destination'),
('Découverte', 'Filtre de destination'),
('Détente', 'Filtre de destination'),
('Croisière', 'Filtre de destination'),
('Escapade maritime', 'Filtre de destination'),
('camping', 'Filtre de destination'),
('Hiver', 'Filtre de destination'),
('Printemps', 'Filtre de destination'),
('Été', 'Filtre de destination'),
('Automone', 'Filtre de destination'),
('Week-end', 'Filtre de destination'),
('semaine', 'Filtre de destination'),
('semaines', 'Filtre de destination'),
('Populaires et touristiques', 'Filtre de destination'),
('Moins connus et plus authentiques', 'Filtre de destination'),
('Amérique', 'Filtre de destination'),
('Europe', 'Filtre de destination'),
('Asie', 'Filtre de destination'),
('Antartique', 'Filtre de destination'),
('Afrique', 'Filtre de destination'),
('Océnie', 'Filtre de destination'),
('Économique', 'Filtre de destination'),
('Milieu de gamme', 'Filtre de destination'),
('Luxe', 'Filtre de destination'),
('Solo', 'Filtre de destination'),
('En couple', 'Filtre de destination'),
('Famille', 'Filtre de destination'),
('Groupe', 'Filtre de destination');


INSERT INTO destination (nom, url_image, description, titre, article) VALUES
('Paris', 'https://cdn-imgix.headout.com/microbrands-content-image/image/2a511b6d64afffb52bf672f151b59426-Paris%20Attarction%20Tickets.jpg', 'Vue de la tour Eiffel à Paris', 'Découvrez la ville de l\'amour', 'Paris, la ville de l\'amour, de la gastronomie et de l\'art, est une destination de choix pour les voyageurs du monde entier. Venez découvrir ses charmantes rues pavées, ses musées de renommée mondiale, et bien sûr, sa célèbre tour Eiffel.'),
('Marseille', 'https://media.routard.com/image/32/8/marseille-port.1558328.jpg', 'Vue du Vieux-Port à Marseille', 'Découvrez la ville phocéenne', 'Marseille, la ville phocéenne, est une destination incontournable pour les amateurs de soleil, de mer et de culture. Visitez le Vieux-Port, goûtez à la délicieuse cuisine provençale, et découvrez les calanques environnantes.'),
('Bordeaux', 'https://cdn.generationvoyage.fr/2021/08/place-bourse-bordeaux.jpg', 'Vue de la place de la Bourse à Bordeaux', 'Découvrez la ville du vin', 'Bordeaux, la ville du vin, est une destination de choix pour les amateurs de vin et de gastronomie. Visitez ses célèbres châteaux viticoles, dégustez ses vins fins, et promenez-vous dans ses charmantes rues pavées.'),
('Lyon', 'https://content.r9cdn.net/rimg/dimg/6e/be/35edddf3-city-32643-1777295ff50.jpg?width=1366&height=768&xhint=1996&yhint=2225&crop=true', 'Vue de la basilique Notre-Dame de Fourvière à Lyon', 'Découvrez la ville des lumières', 'Lyon, la ville des lumières, est une destination riche en histoire et en culture. Visitez sa célèbre basilique Notre-Dame de Fourvière, goûtez à la délicieuse cuisine lyonnaise, et promenez-vous le long de la Saône.'),
('Nice', 'https://cdn.generationvoyage.fr/2020/05/vue-de-nice.jpg', 'Vue de la Promenade des Anglais à Nice', 'Découvrez la ville ensoleillée', 'Nice, la ville ensoleillée, est une destination de choix pour les amateurs de plage, de soleil et de culture. Découvrez sa célèbre Promenade des Anglais, visitez ses musées et galeries d\'art, et goûtez à sa délicieuse cuisine méditerranéenne.'),
('Strasbourg', 'https://a.cdn-hotels.com/gdcs/production59/d1337/3794b7dc-0609-4883-9ad2-51368c2e2c21.jpg?impolicy=fcrop&w=800&h=533&q=medium', 'Vue de la cathédrale de Strasbourg', 'Découvrez la ville européenne', 'Strasbourg, la ville européenne, est une destination de choix pour les amateurs de culture et d\'histoire. Visitez sa célèbre cathédrale, promenez-vous dans son charmant quartier de la Petite France, et goûtez à sa délicieuse cuisine alsacienne.'),
('Annecy', 'https://a.cdn-hotels.com/gdcs/production163/d1212/f77ef382-1881-4a5d-b068-eea2cdc3ab27.jpg', 'Vue du lac d\'Annecy', 'Découvrez la ville lacustre', 'Annecy, la ville lacustre, est une destination de choix pour les amoureux de la nature et de la montagne. Découvrez son célèbre lac, visitez son château médiéval, et promenez-vous dans sa charmante vieille ville.');


INSERT INTO utilisateur (login, mot_de_passe, email) VALUES 
('john_doe', 'password123', 'john.doe@example.com'),
('jane_doe', 'password456', 'jane.doe@example.com'),
('bob_smith', 'password789', 'bob.smith@example.com'),
('alice_jones', 'passwordabc', 'alice.jones@example.com'),
('sam_smith', 'passworddef', 'sam.smith@example.com'),
('jimmy', 'password123', 'jimmy@example.com'),
('jessica', 'password456', 'jessica@example.com'),
('david', 'password789', 'david@example.com'),
('samantha', 'passwordabc', 'samantha@example.com'),
('peter', 'passworddef', 'peter@example.com');

INSERT INTO role (nom, description) VALUES 
('admin', "Rôle d'administrateur avec tous les privilèges."),
('éditeur', "Rôle d'éditeur avec des privilèges limités."),
('utilisateur', "Rôle d'utilisateur standard sans privilèges particuliers."),
('invité', "Rôle d'invité avec un accès limité."),
('modérateur', 'Rôle de modérateur avec des privilèges de modération.');

INSERT INTO utilisateur_role (role_id, utilisateur_id) 
VALUES (1, 1), (2, 1), (3, 2), (3, 3), (4, 4);
