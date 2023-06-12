# Informations

## On a pas utiliser le package sqlstring pour sécurisée les injection sql
```
Si vous utilisez des requêtes préparées pour échapper les valeurs de paramètre, vous n'avez pas besoin d'utiliser la bibliothèque sqlstring.
Les marqueurs de paramètre ? remplacent les valeurs de paramètre directes et sont automatiquement échappés par la bibliothèque mysql2. Si vous utilisez la bibliothèque sqlstring, vous pouvez utiliser la méthode escape pour échapper les valeurs de paramètre, mais vous devez vous assurer d'échapper toutes les valeurs de paramètre correctement.
```