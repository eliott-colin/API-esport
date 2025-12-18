# Documentation Swagger Auto-générée

## 🚀 Comment ça marche

Ce projet utilise **swagger-autogen** pour générer automatiquement la documentation Swagger à partir de vos routes Express.

### Génération automatique

La documentation Swagger se génère automatiquement lorsque vous lancez l'application :

```bash
npm run dev
```

Ou manuellement avec :

```bash
npm run swagger
```

## 📝 Comment ajouter/modifier des routes

### 1. Créer votre route normalement

```javascript
router.post("/ma-route", 
  middleware1,
  middleware2,
  controller.maFonction
);
```

### 2. Ajouter les métadonnées Swagger

Ajoutez un commentaire après la définition de la route avec les métadonnées :

```javascript
router.post("/ma-route", 
  middleware1,
  middleware2,
  controller.maFonction,
  /* 
    #swagger.tags = ['Mon Tag']
    #swagger.summary = 'Description courte'
    #swagger.description = 'Description détaillée de ce que fait la route'
    #swagger.security = [{ "bearerAuth": [] }]  // Si authentification requise
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: '#/components/schemas/MonSchema' }
        }
      }
    }
    #swagger.responses[200] = {
      description: 'Succès',
      content: {
        "application/json": {
          schema: { $ref: '#/components/schemas/MonSchemaReponse' }
        }
      }
    }
  */
);
```

### 3. Ajouter vos schémas personnalisés

Modifiez le fichier `src/swagger.js` dans la section `components.schemas` pour ajouter vos modèles de données :

```javascript
components: {
  schemas: {
    MonNouveauSchema: {
      type: 'object',
      properties: {
        champ1: { type: 'string', example: 'exemple' },
        champ2: { type: 'integer', example: 123 },
      },
    },
  },
}
```

## 🔍 Accéder à la documentation

Une fois l'application lancée, accédez à la documentation Swagger UI :

```
http://localhost:3000/docs
```

## 📋 Métadonnées disponibles

### Tags
```javascript
#swagger.tags = ['Authentication', 'Users']
```

### Sécurité (JWT)
```javascript
#swagger.security = [{ "bearerAuth": [] }]
```

### Body de requête
```javascript
#swagger.requestBody = {
  required: true,
  content: {
    "application/json": {
      schema: { $ref: '#/components/schemas/NomDuSchema' }
    }
  }
}
```

### Réponses
```javascript
#swagger.responses[200] = {
  description: 'Description de la réponse',
  content: {
    "application/json": {
      schema: { $ref: '#/components/schemas/NomDuSchema' }
    }
  }
}
```

### Paramètres de requête
```javascript
#swagger.parameters['paramName'] = {
  in: 'query',
  description: 'Description du paramètre',
  required: true,
  schema: { type: 'string' }
}
```

## ⚙️ Configuration

Le fichier `src/swagger.js` contient toute la configuration :
- Informations de l'API (titre, description, version)
- URL du serveur
- Schémas de données
- Configuration de sécurité
- Tags disponibles

## 🔄 Workflow

1. Modifiez vos routes dans `src/v1/routes/`
2. Ajoutez les métadonnées Swagger en commentaires
3. Lancez `npm run swagger` pour régénérer
4. Le fichier `src/v1/swagger.json` est mis à jour automatiquement
5. Consultez la documentation sur `/docs`

## ✨ Avantages

- ✅ Pas besoin de maintenir manuellement un fichier swagger.json
- ✅ Documentation toujours synchronisée avec le code
- ✅ Métadonnées structurées (pas de pollution du code)
- ✅ Support complet de OpenAPI 3.0
- ✅ Interface Swagger UI intégrée

