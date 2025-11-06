# API Sécurisée - Bibliothèque

Projet de TP pour la création d'une API Express sécurisée (JWT, bcrypt, CORS, Rate limiting).

## Thème

L'API gère une collection de livres et d'auteurs pour une bibliothèque.

## Installation

1.  Clonez le dépôt.
2.  [cite_start]Créez un fichier `.env` à la racine, basé sur `.env.example`.
3.  Remplissez `MONGO_URI` et `JWT_SECRET`.
4.  [cite_start]Assurez-vous qu'une instance MongoDB est en cours d'exécution à l'URI spécifiée.
5.  Installez les dépendances :
    ```bash
    npm install
    ```
6.  Démarrez le serveur :
    ```bash
    node src/server.js
    ```

## Schémas (Mongoose) 

* [cite_start]**User**: `email`, `password` (hash), `role` ('user' | 'admin') 
* **Author**: `name`, `bio`
* [cite_start]**Book**: `title`, `author` (Ref: Author), `isbn`, `publishedDate` 

## Endpoints 

(Voir `postman_collection.json` pour les détails)

* `GET /api/status` : Santé de l'API.
* `POST /api/auth/register` : Créer un compte.
* `POST /api/auth/login` : Obtenir un token JWT.
* `GET /api/books` : Liste des livres (paginée, filtrée).
* `GET /api/books/:id` : Détail d'un livre.
* `POST /api/books` : (Auth: User+) Créer un livre.
* `PUT /api/books/:id` : (Auth: Admin) Mettre à jour un livre.
* `DELETE /api/books/:id` : (Auth: Admin) Supprimer un livre.
* `GET /api/authors` : Liste des auteurs.
* `GET /api/authors/:id` : Détail d'un auteur.
* `POST /api/authors` : (Auth: Admin) Créer un auteur.
* `PUT /api/authors/:id` : (Auth: Admin) Mettre à jour un auteur.
* `DELETE /api/authors/:id` : (Auth: Admin) Supprimer un auteur.