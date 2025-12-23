# 🛒 Shopping Cart API

A simple **Shopping Cart REST API** built with **Node.js, TypeScript, Express, and MongoDB**, following **Clean Architecture principles**, **Test-Driven Development (TDD)**, and the **Repository Pattern**.

This project was designed as a technical exercise to demonstrate **domain-driven design**, **separation of concerns**, and a **professional commit history** using **Conventional Commits**.

---

## 🚀 Features

- Create a shopping cart
- Add items to a cart
- Merge quantities when adding the same product
- Update item quantity
- Remove items from the cart
- Clear the cart
- Domain-level validations
- MongoDB persistence via repository pattern
- RESTful API with proper HTTP status codes

---

## 🧠 Architecture Overview

```
Controller  →  Service (Domain Logic)  →  Repository  →  MongoDB
```

### Key design principles

- Domain logic is isolated from infrastructure
- Persistence is abstracted behind a repository interface
- Controllers contain no business logic
- Domain errors are explicit and mapped to HTTP responses
- Tests do not depend on MongoDB

---

## 🧪 Testing Strategy

- Core domain logic developed using **Test-Driven Development (TDD)**
- Tests use **fake repositories** instead of real databases
- Domain tests remain fast, deterministic, and isolated

Run tests:

```bash
npm test
```

---

## 🛠️ Tech Stack

- Node.js
- TypeScript
- Express
- MongoDB
- Mongoose
- Jest
- ts-jest

---

## ⚙️ Setup & Run

### 1️⃣ Install dependencies

```bash
npm install
```

---

### 2️⃣ Start MongoDB

Make sure MongoDB is running locally:

```bash
mongod
```

---

### 3️⃣ Run the server

```bash
npm run dev
```

Server will start at:

```
http://localhost:3000
```

---

### 4️⃣ Health check

```http
GET /health
```

Response:

```json
{ "status": "ok" }
```

---

## 📌 API Endpoints

### ➕ Create Cart

```http
POST /carts
```

Response:

```json
{
  "id": "64fa...",
  "items": [],
  "totalItems": 0
}
```

---

### 📄 Get Cart

```http
GET /carts/:id
```

---

### ➕ Add Item to Cart

```http
POST /carts/:id/items
```

Body:

```json
{
  "productId": "product-1",
  "quantity": 2
}
```

---

### ❌ Remove Item

```http
DELETE /carts/:id/items/:productId
```

---

### 🧹 Clear Cart

```http
DELETE /carts/:id/items
```

---

## 🚨 Error Handling

| Scenario | HTTP Status | Message |
|--------|-------------|---------|
| Invalid quantity | 400 | Quantity must be greater than zero |
| Item not found | 404 | Item not found in cart |
| Cart not found | 404 | Cart not found |
| Unexpected error | 500 | Internal server error |

---

## 🧾 Commit Convention

This project follows **Conventional Commits**:

```
feat(cart): add item to cart
test(cart): define add item behavior
refactor(cart): extract domain logic
feat(api): add cart controller
```

---

## 🎯 Why this design?

- TDD ensures correct domain behavior before infrastructure
- Repository pattern decouples persistence from business logic
- Clear separation between domain, infrastructure, and API layers
- Scalable and maintainable structure

---

## 👤 Author

Developed as a technical exercise for backend interviews.

---

## ✅ Possible Improvements

- API integration tests using `supertest`
- Global error-handling middleware
- OpenAPI / Swagger documentation
- Docker support

---
