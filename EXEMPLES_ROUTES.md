# 📘 Exemples de Routes Swagger Simplifiées

## 🎯 Templates prêts à l'emploi

Copiez-collez ces exemples pour créer vos routes rapidement.

---

## 📥 GET - Route publique simple

```javascript
router.get("/items", itemsController.getAll
  /* #swagger.tags = ['Items']
     #swagger.summary = 'Liste tous les items' */
);
```

**Résultat Swagger :**
- ✅ Tag : Items
- ✅ Méthode : GET
- ✅ Réponses : 200, 500

---

## 📥 GET - Route protégée (JWT)

```javascript
router.get("/profile", verifyToken, usersController.getProfile
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Récupérer le profil utilisateur'
     #swagger.security = [{ "bearerAuth": [] }] */
);
```

**Résultat Swagger :**
- ✅ Tag : Users
- ✅ Méthode : GET
- ✅ Authentification : Bearer Token
- ✅ Header : Authorization détecté automatiquement
- ✅ Réponses : 200, 401, 500

---

## 📤 POST - Création avec validation

```javascript
const { createItemSchema } = require("./validators");

router.post("/items", validator.body(createItemSchema), itemsController.create
  /* #swagger.tags = ['Items']
     #swagger.summary = 'Créer un nouvel item' */
);
```

**Résultat Swagger :**
- ✅ Tag : Items
- ✅ Méthode : POST
- ✅ Body : Détecté automatiquement depuis le schema Joi
- ✅ Réponses : 201, 400, 500

---

## 📤 POST - Création protégée

```javascript
router.post("/items", verifyToken, validator.body(createItemSchema), itemsController.create
  /* #swagger.tags = ['Items']
     #swagger.summary = 'Créer un item (authentifié)'
     #swagger.security = [{ "bearerAuth": [] }] */
);
```

**Résultat Swagger :**
- ✅ Tag : Items
- ✅ Authentification : Bearer Token
- ✅ Body : Auto-détecté
- ✅ Réponses : 201, 400, 401, 500

---

## 🔄 PATCH - Mise à jour

```javascript
router.patch("/items/:id", verifyToken, validator.body(updateItemSchema), itemsController.update
  /* #swagger.tags = ['Items']
     #swagger.summary = 'Mettre à jour un item'
     #swagger.security = [{ "bearerAuth": [] }] */
);
```

**Résultat Swagger :**
- ✅ Tag : Items
- ✅ Paramètre : :id détecté automatiquement dans l'URL
- ✅ Authentification : Bearer Token
- ✅ Body : Auto-détecté
- ✅ Réponses : 200, 400, 401, 404, 500

---

## 🗑️ DELETE - Suppression

```javascript
router.delete("/items/:id", verifyToken, itemsController.delete
  /* #swagger.tags = ['Items']
     #swagger.summary = 'Supprimer un item'
     #swagger.security = [{ "bearerAuth": [] }] */
);
```

**Résultat Swagger :**
- ✅ Tag : Items
- ✅ Paramètre : :id détecté automatiquement
- ✅ Authentification : Bearer Token
- ✅ Réponses : 200, 401, 404, 500

---

## 📥 GET - Avec query parameters

```javascript
router.get("/items/search", itemsController.search
  /* #swagger.tags = ['Items']
     #swagger.summary = 'Rechercher des items' */
);
```

**Si votre controller utilise `req.query.name`, Swagger détecte automatiquement :**
- ✅ Query param : ?name=...

---

## 📤 POST - Upload de fichier

```javascript
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/upload", verifyToken, upload.single("file"), uploadController.upload
  /* #swagger.tags = ['Upload']
     #swagger.summary = 'Upload un fichier'
     #swagger.security = [{ "bearerAuth": [] }] */
);
```

**Résultat Swagger :**
- ✅ Tag : Upload
- ✅ Authentification : Bearer Token
- ✅ Multipart/form-data détecté

---

## 🏷️ Ajouter un nouveau tag

Dans `src/swagger.js`, ajoutez simplement :

```javascript
tags: [
  { name: 'Authentication' },
  { name: 'Users' },
  { name: 'Items' },        // ← Nouveau tag
  { name: 'Upload' },       // ← Nouveau tag
],
```

---

## 📋 Checklist pour une nouvelle route

1. ✅ Écrire la route avec 2-3 lignes de commentaires
2. ✅ Ajouter le tag dans `swagger.js` si nouveau
3. ✅ Régénérer : `npm run swagger`
4. ✅ Redémarrer : `npm run dev`
5. ✅ Vérifier sur `http://localhost:3000/docs`

---

## 💡 Astuces

### Grouper plusieurs routes similaires

```javascript
// Toutes ces routes auront le même tag
router.get("/items", itemsController.getAll
  /* #swagger.tags = ['Items']
     #swagger.summary = 'Liste tous les items' */
);

router.get("/items/:id", itemsController.getOne
  /* #swagger.tags = ['Items']
     #swagger.summary = 'Récupérer un item par ID' */
);

router.post("/items", validator.body(createItemSchema), itemsController.create
  /* #swagger.tags = ['Items']
     #swagger.summary = 'Créer un item' */
);

router.delete("/items/:id", verifyToken, itemsController.delete
  /* #swagger.tags = ['Items']
     #swagger.summary = 'Supprimer un item'
     #swagger.security = [{ "bearerAuth": [] }] */
);
```

### Route sans tag (pas recommandé)

```javascript
router.get("/health", (req, res) => res.json({ status: "ok" }));
```

Cette route apparaîtra dans Swagger mais sans catégorie.

---

## 🚀 Prêt à coder !

Vous avez maintenant tous les templates nécessaires pour créer vos routes Swagger ultra-rapidement !

