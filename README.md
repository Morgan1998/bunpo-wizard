# Bunpo Wizard

This readme is incomplete :D

## Single Page PERN App

This app is a decoupled PERN stack app with a `React` frontend and a separate `Express` REST Api.

### Frontend

- React

### Backend

- Node.js
- Express
- PostgreSQL
- Prisma 6
- TypeScript
- Zod
- Docker (PostgreSQL container used for local development; full backend containerization in progress)
- Stateless sessions via cookies with a signed JSON Web Token (JWT) payload. Cookies are secured using `HttpOnly`, `Secure`, and `SameSite` attributes.
- Password hashing via Bcrypt

## Codebase Structure

- Namespace Imports for Validators, Controllers, and Services
- Routes are ordered based on CRUD operations. Public routes go above the `router.use(authenticate)` middleware, and private routes go below it.
