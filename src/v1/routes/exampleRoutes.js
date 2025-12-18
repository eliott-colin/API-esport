// EXEMPLE : Comment ajouter une nouvelle route avec documentation Swagger

const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/authMiddleware");

// ============================================
// EXEMPLE 1 : Route GET simple sans auth
// ============================================
router.get(
    "/example/simple",
    (req, res) => {
        res.json({ message: "Hello World" });
    },
    /*
      #swagger.tags = ['Examples']
      #swagger.summary = 'Exemple de route simple'
      #swagger.description = 'Retourne un simple message de bienvenue'
      #swagger.responses[200] = {
        description: 'Message retourné avec succès',
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string', example: 'Hello World' }
              }
            }
          }
        }
      }
    */
);

// ============================================
// EXEMPLE 2 : Route POST avec body et auth
// ============================================
router.post(
    "/example/create",
    verifyToken,
    (req, res) => {
        const { name, description } = req.body;
        res.status(201).json({
            id: 1,
            name,
            description,
            createdAt: new Date()
        });
    },
    /*
      #swagger.tags = ['Examples']
      #swagger.summary = 'Créer un nouvel élément'
      #swagger.description = 'Crée un nouvel élément avec nom et description (nécessite authentification)'
      #swagger.security = [{ "bearerAuth": [] }]
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: 'object',
              required: ['name'],
              properties: {
                name: {
                  type: 'string',
                  example: 'Mon élément',
                  description: 'Nom de l\'élément'
                },
                description: {
                  type: 'string',
                  example: 'Description de l\'élément',
                  description: 'Description optionnelle'
                }
              }
            }
          }
        }
      }
      #swagger.responses[201] = {
        description: 'Élément créé avec succès',
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'integer', example: 1 },
                name: { type: 'string', example: 'Mon élément' },
                description: { type: 'string', example: 'Description de l\'élément' },
                createdAt: { type: 'string', format: 'date-time' }
              }
            }
          }
        }
      }
      #swagger.responses[401] = {
        description: 'Non authentifié'
      }
    */
);

// ============================================
// EXEMPLE 3 : Route GET avec paramètres d'URL
// ============================================
router.get(
    "/example/:id",
    (req, res) => {
        const { id } = req.params;
        res.json({
            id: parseInt(id),
            name: "Exemple",
            description: "Description exemple"
        });
    },
    /*
      #swagger.tags = ['Examples']
      #swagger.summary = 'Récupérer un élément par ID'
      #swagger.description = 'Retourne les détails d\'un élément spécifique'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de l\'élément à récupérer',
        required: true,
        schema: { type: 'integer', example: 1 }
      }
      #swagger.responses[200] = {
        description: 'Élément trouvé',
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'integer', example: 1 },
                name: { type: 'string', example: 'Exemple' },
                description: { type: 'string', example: 'Description exemple' }
              }
            }
          }
        }
      }
      #swagger.responses[404] = {
        description: 'Élément non trouvé'
      }
    */
);

// ============================================
// EXEMPLE 4 : Route GET avec query params
// ============================================
router.get(
    "/example",
    (req, res) => {
        const { page = 1, limit = 10, search } = req.query;
        res.json({
            data: [],
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: 0
            }
        });
    },
    /*
      #swagger.tags = ['Examples']
      #swagger.summary = 'Liste paginée d\'éléments'
      #swagger.description = 'Retourne une liste paginée d\'éléments avec recherche optionnelle'
      #swagger.parameters['page'] = {
        in: 'query',
        description: 'Numéro de page',
        required: false,
        schema: { type: 'integer', default: 1, example: 1 }
      }
      #swagger.parameters['limit'] = {
        in: 'query',
        description: 'Nombre d\'éléments par page',
        required: false,
        schema: { type: 'integer', default: 10, example: 10 }
      }
      #swagger.parameters['search'] = {
        in: 'query',
        description: 'Terme de recherche',
        required: false,
        schema: { type: 'string', example: 'recherche' }
      }
      #swagger.responses[200] = {
        description: 'Liste retournée avec succès',
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: {
                data: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      name: { type: 'string' }
                    }
                  }
                },
                pagination: {
                  type: 'object',
                  properties: {
                    page: { type: 'integer', example: 1 },
                    limit: { type: 'integer', example: 10 },
                    total: { type: 'integer', example: 0 }
                  }
                }
              }
            }
          }
        }
      }
    */
);

// ============================================
// EXEMPLE 5 : Route DELETE
// ============================================
router.delete(
    "/example/:id",
    verifyToken,
    (req, res) => {
        const { id } = req.params;
        res.json({
            message: `Élément ${id} supprimé avec succès`
        });
    },
    /*
      #swagger.tags = ['Examples']
      #swagger.summary = 'Supprimer un élément'
      #swagger.description = 'Supprime définitivement un élément (nécessite authentification)'
      #swagger.security = [{ "bearerAuth": [] }]
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de l\'élément à supprimer',
        required: true,
        schema: { type: 'integer', example: 1 }
      }
      #swagger.responses[200] = {
        description: 'Élément supprimé avec succès',
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string', example: 'Élément 1 supprimé avec succès' }
              }
            }
          }
        }
      }
      #swagger.responses[401] = {
        description: 'Non authentifié'
      }
      #swagger.responses[404] = {
        description: 'Élément non trouvé'
      }
    */
);

module.exports = router;

