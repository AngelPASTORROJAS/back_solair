/**
 * Classe décrivant le schéma d'une entité
 */
class EntitySchema {
  /**@type {{tableName,columns:{ id: string, titre: string, description: string }}} */
  activite;
  /**@type {{tableName,columns:{ id: string, destination_id: string, activite_id: string }}} */
  activite_destination;
  /**@type {{tableName,columns:{ id: string, nom: string }}} */
  critere;
  /**@type {{tableName,columns:{ id: string, destination_id: string, critere_id: string }}} */
  critere_destination;
  /**@type {{tableName,columns:{id: string, nom: string, image_url: string, ville: string, description: string, score: string, budget: string}}} */
  destination;
  /**@type {{tableName,columns:{ id: string, destination_id: string, utilisateur_id: string }}} */
  destination_utilisateur;
  /**@type {{tableName,columns:{ id: string, pseudo: string, password: string, mail: string}}} */
  utilisateur;
  /**@type {{tableName,columns:{ id: string, mail: string}}} */
  newsletter;
  constructor() {
    this.activite = this.defineEntity("Activite", { 
      id: "id",
      titre: "titre",
      description: "description"
     });
    this.activite_destination = this.defineEntity("ActiviteDestination", {
      id: "id",
      activite_id: "activiteId",
      destination_id: "destinationId"
    });
    this.critere = this.defineEntity("Critere", {
      id: "id",
      nom: "nom"
    });
    this.critere_destination = this.defineEntity("CritereDestination", {
      id: "id",
      critere_id: "critereId",
      destination_id: "destinationId"
    });
    this.destination = this.defineEntity("Destination", {
      id: "id",
      nom: "nom",
      image_url: "urlimage",
      ville: "ville",
      description: "description",
      score: "score",
      budget: "budget"
    });
    this.destination_utilisateur = this.defineEntity("DestinationUtilisateur", {
      id: "id",
      destination_id: "destinationId",
      utilisateur_id: "utilisateurId"
    });
    this.utilisateur = this.defineEntity("Utilisateur", {
      id: "id",
      pseudo: "pseudo",
      password: "password",
      mail: "mail"
    }),
    this.newsletter = this.defineEntity("Newsletter", {
      id: "id",
      mail: "mail"
    });
  }

  /**@private */
  defineEntity(tableName, columns) {
      return { tableName, columns };
  }
}
Object.freeze(EntitySchema.prototype)


const entitySchema = Object.freeze(new EntitySchema());
export { entitySchema };