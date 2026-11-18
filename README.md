# Backend Tutorial Project

A beginner-friendly REST API built with Node.js, Express, and MongoDB Atlas (via Mongoose).

## Requirements
- Node.js LTS and npm
- Git
- MongoDB Atlas account
- Postman (or another API client)

## Setup on Windows (PowerShell)
1. Extract this project and open the folder in VS Code.
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Copy `.env.example` to `.env` and replace `MONGODB_URI` with your own MongoDB Atlas connection string. Keep `.env` private; it is ignored by Git.
4. Start the development server:
   ```powershell
   npm run dev
   ```
5. Visit `http://localhost:5000/` to check the server.

## API endpoints
Base URL: `http://localhost:5000`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/users` | List users |
| POST | `/api/users` | Create a user |
| GET | `/api/users/:id` | Get one user |
| PUT | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |

### Example POST body
```json
{
  "name": "Alex Example",
  "email": "alex@example.com",
  "age": 20
}
```

### Example PUT body
```json
{
  "name": "Alex Updated",
  "age": 21
}
```

## GitHub
Create a new **public** repository on GitHub (do not initialize it with a README if you already have this project locally), then run:
```powershell
git init
git add .
git commit -m "Initial backend CRUD API"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```
Replace the remote URL with your own repository URL. Never commit `.env` or share database credentials.

## Notes
- This starter includes CRUD APIs and basic validation/error handling.
- It does not include user authentication; add it only if your assignment/tutorial specifically requires it.
