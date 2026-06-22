# Personal Inventory Manager

A web application designed to help users track, manage, and edit their personal item inventories in real-time. Built with a React frontend, Tailwind CSS & DaisyUI styling, and an Express + PostgreSQL backend.

---

## Tech Stack

### Frontend

- React (Vite)
- React Router DOM
- Tailwind CSS
- DaisyUI (modal, cards, themes, buttons, navbar components)

### Backend

- Express.js (REST API)
- PostgreSQL
- JWT authentication

---

## Getting Started

### Installation & Setup

Clone the repository:

```
git clone git@github.com:jdthomas2000/z-assessment.git

cd z-assessment
```

Start the app

```
docker compose up --build
```

The env file should be cloned down as well but if not create an .env file in the root directory

```
DB_USER=postgres
DB_PASSWORD=docker
```

## Frontend Reference

- `http://localhost:5173/`  
  Base route. Displays all inventory items for the logged-in user. Includes navigation to the login page.

- `http://localhost:5173/login`  
  Login page for existing users.
  - Default seeded user:
    - username: **inventory_manager**
    - password: **test123**
  - Includes a link to the registration page for new users.

- `http://localhost:5173/register`  
  Registration page for creating a new account using first name, last name, username, and password.  
  After successful registration, users are redirected to the login page.

---

### Protected Route

- `http://localhost:5173/inventory/#username`  
  Accessible only after authentication. Displays all inventory items associated with the logged-in user.  
  Users can:
  - Add new items
  - Edit existing items
  - Delete items

---

## API Endpoints Reference `http://localhost:8080`

### Authentication

- `POST /api/auth/register`  
  Creates a new user account with `first`, `last`, `username`, and `password`.

- `POST /api/auth/login`  
  Authenticates user credentials and returns a JWT token.

- `GET /users/:user`  
  Retrieves a user profile by username.

---

### Protected Inventory Routes

_(Requires `Authorization: Bearer <token>` header)_

- `GET /inventory/:id`  
  Returns all inventory items for the specified user ID.

- `POST /inventory/:id`  
  Creates a new inventory item tied to a user ID.  
  Body: `itemName`, `description`, `quantity`

- `PATCH /inventory/item/:id`  
  Updates fields of an existing inventory item by item ID.

- `DELETE /inventory/item/:id`  
  Deletes an inventory item by item ID.
