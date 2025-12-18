# 🚀 Guide Rapide - Swagger Auto-généré

## Démarrage

```bash
# Génère le Swagger et lance l'app
npm run dev

# Accédez à la documentation
# http://localhost:3000/docs
```

## Ajouter une nouvelle route

### 1. Écrivez votre route normalement
```javascript
router.post("/ma-route", middleware, controller.fonction);
```

### 2. Ajoutez les métadonnées Swagger en commentaire
```javascript
router.post("/ma-route", middleware, controller.fonction,
  /* 
    #swagger.tags = ['MonTag']
    #swagger.summary = 'Description courte'
    #swagger.security = [{ "bearerAuth": [] }]  // Si auth JWT requise
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { 
            type: 'object',
            properties: {
              champ: { type: 'string', example: 'valeur' }
            }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: 'Succès'
    }
  */
);
```

### 3. Régénérez le Swagger
```bash
npm run swagger
```

## Exemples complets

Consultez `src/v1/routes/exampleRoutes.js` pour 5 exemples détaillés :
- Route GET simple
- Route POST avec body et authentification
- Route GET avec paramètres d'URL
- Route GET avec query params et pagination
- Route DELETE

## Configuration

Modifiez `src/swagger.js` pour :
- Changer les infos de l'API
- Ajouter des schémas réutilisables
- Ajouter des tags
- Configurer les serveurs

## Métadonnées principales

```javascript
#swagger.tags = ['Tag']                          // Catégorie
#swagger.summary = 'Résumé court'                // Titre
#swagger.description = 'Description détaillée'   // Description
#swagger.security = [{ "bearerAuth": [] }]       // Auth JWT
#swagger.parameters['nom'] = { ... }             // Paramètres URL/query
#swagger.requestBody = { ... }                   // Body de requête
#swagger.responses[200] = { ... }                // Réponses
```

## 📚 Documentation complète

Voir `src/SWAGGER_README.md` pour plus de détails.

