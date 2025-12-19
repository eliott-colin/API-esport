# 📌 Avancement du projet eSport

## 🧩 API / Backend

* [x] Définir les endpoints
* [ ] Implémenter **tous** les endpoints (en cours)
* [ ] Lier l’ensemble des routes aux controllers
* [ ] Mettre en place les validations
* [ ] Gérer les erreurs et les status codes HTTP
* [x] Mettre en place le serveur backend (Node.js + Express)
* [x] Configuration de l’environnement (`.env` + dotenv)
* [x] Mise en place du reverse proxy (Nginx → Node.js)

---

## 🗄️ Base de données

* [x] Installer et configurer MariaDB sur le VPS
* [x] Créer les bases de données (`esport_db` et `esport_db_test`)
* [x] Créer les utilisateurs et gérer les droits
* [x] Connecter la base de données au backend
* [x] Mettre en place les sauvegardes automatiques (cron)
* [ ] Finaliser et tester l’ensemble des opérations CRUD

---

## 🌐 Infrastructure / VPS

* [x] Organisation des dossiers du projet (`/srv/esport`)
* [x] Configuration Nginx (port 80)
* [x] Architecture Reverse Proxy (Nginx → Node.js → MariaDB)
* [x] Gestion des ports et des services
* [x] Débogage des erreurs (502 Bad Gateway, ports, services)

---

## 🎨 Frontend (non réalisé)

* [ ] Initialiser le projet frontend
* [ ] Mettre en place la structure des pages
* [ ] Créer les composants principaux
* [ ] Connecter le frontend à l’API
* [ ] Gérer les états (loading / erreurs)
* [ ] Finaliser l’UI / UX

---

## 🔄 État global du projet

* ✅ Backend **fonctionnel mais incomplet** (endpoints en cours)
* ✅ Base de données **opérationnelle** et connectée
* ❌ Frontend **non commencé**

**Avancement estimé : ~60 % (hors frontend)**

---

📅 **Dernière mise à jour : 17/12/2025**

📝 *Remarque : le projet est techniquement opérationnel côté infrastructure et backend. Les prochaines étapes prioritaires sont la finalisation des endpoints, la validation des règles métier et les tests CRUD complets avant toute intégration frontend.*
