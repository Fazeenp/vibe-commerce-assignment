# Mock E-Com Cart — Full Stack Assignment

A simple full-stack shopping cart web app built for Vibe Commerce Internship Screening.  
It demonstrates CRUD operations, REST APIs, DB persistence, and responsive UI integration between React and Express + SQLite.

---

## Overview

This project implements a mock e-commerce flow:
- Browse products  
- Add / remove items from cart  
- View total  
- Perform a mock checkout (no real payments)

All backend data is stored using SQLite, and the frontend is powered by React with modern component-based architecture.

---

## Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React (Vite) + Tailwind CSS + Lucide Icons |
| Backend | Node.js + Express |
| Database | SQLite |
| API Type | REST |
| Version Control | Git + GitHub |

---

## Features

### Frontend
- Product grid with image, price, and “Add to Cart” button  
- Dynamic cart badge showing item count  
- Quantity controls for added products  
- Cart page with total calculation  
- Checkout form with user info and order summary  
- Responsive and clean UI

### Backend
- `GET /api/products` → returns mock products list  
- `POST /api/cart` → add product to cart  
- `DELETE /api/cart/:id` → remove specific item  
- `GET /api/cart` → fetch cart contents + total  
- `POST /api/checkout` → generates mock receipt with total + timestamp  

### Database (SQLite)
Two tables:
- products → id, name, price, image  
- cart → id, productId, qty  

---

## Project Structure

```
mock-ecom-cart/
│
├── backend/
│   ├── db/
│   │   └── database.js
│   ├── routes/
│   │   ├── products.js
│   │   ├── cart.js
│   │   └── checkout.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## API Endpoints

### GET /api/products
Returns all mock products.

**Response Example:**
```json
[
  { "id": 1, "name": "Headphones", "price": 1999, "image": "..." },
  { "id": 2, "name": "Wireless Mouse", "price": 999, "image": "..." }
]
```

---

### POST /api/cart
Add item to cart.

**Request:**
```json
{ "productId": 1, "qty": 2 }
```

---

### GET /api/cart
Returns all cart items and total.

**Response:**
```json
{
  "items": [
    { "id": 1, "name": "Headphones", "price": 1999, "qty": 2 }
  ],
  "total": 3998
}
```

---

### DELETE /api/cart/:id
Removes an item from cart.

---

### POST /api/checkout
Mock checkout endpoint.  
Returns total, timestamp, and order confirmation.

**Response:**
```json
{
  "message": "Order confirmed",
  "total": 5597,
  "timestamp": "2025-11-07T09:42:21.341Z"
}
```

---

## Setup Instructions

### Backend
```bash
cd backend
npm install
node server.js
```
Server runs on http://localhost:5000

---

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on http://localhost:5173

---

## Demo Flow

1. Open `/` → View product grid  
2. Click Add to Cart → count increases in navbar  
3. Go to Cart Page → adjust or remove items  
4. Proceed to Checkout → enter name & email  
5. See mock receipt with total and timestamp  

---

## Screenshots

### Products Page 

(<img width="1919" height="877" alt="image" src="https://github.com/user-attachments/assets/194f4c57-09b5-47bd-b336-d4be1d0bd786" />

### Cart Page 

<img width="1916" height="745" alt="image" src="https://github.com/user-attachments/assets/68b54df6-e840-4b79-a356-feb14012e7fb" />

### Checkout Page 
<img width="1912" height="886" alt="image" src="https://github.com/user-attachments/assets/d144d703-538f-49ac-89af-9af912c7748e" />

### Receipt 
<img width="1919" height="864" alt="image" src="https://github.com/user-attachments/assets/55bfd4d4-2792-4973-90f7-530b80c3e3dc" />
 
---

## Demo Video
[Demo (YouTube)](https://youtu.be/wv1FmGLOkBI)


---

## Bonus Implementations
- Persistent SQLite DB  
- Error handling for missing routes / invalid inputs  
- Clean responsive UI  
- Separate API + frontend folders with modular code structure  

---

## Author
**Fazeen P**  
Passionate about full-stack development & AI integration  
fazeenpatel@gmail.com  
[GitHub Profile](https://github.com/Fazeenp)
