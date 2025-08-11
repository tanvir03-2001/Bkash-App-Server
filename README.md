# 💼 Digital Wallet API

## Project Overview

A secure, modular, and role-based backend API for a digital wallet system (like bKash or Nagad), where users, agents, and admins can perform various financial operations.

---

## Key Features

- **WT-based login system** – with three roles: admin, user, agent
- **Secure Password Hashing** (bcrypt)
- **Automatic wallet creation** upon registration (starting balance: ৳50)
- **Transaction tracking** – all transactions are saved in the database
- **Role-based authorization** – specific APIs accessible only by designated roles

---

## User Features

- Add Money (Top-up)
- Withdraw
- Send Money (to other users)
- View own transaction history

---

## Agent Features

- Add money to any user’s wallet (Cash-In)
- Withdraw money from any user’s wallet (Cash-Out)

---

## Admin Features

- View all users, agents, wallets, and transactions$0
- Block/Unblock user wallets$0
- Approve or suspend agents$0

---

## Transaction Types

- `add_money`
- `withdraw`
- `send_money`
- `cash_in`
- `cash_out`

---

## Project Structure

```
src/
└── app/
├── config/
├── errorHelpers/
├── helper/
├── interfaces/
├── middlewares/
├── modules/
├── router/
├── utils/
├── app.ts
└── server.ts
.env
.gitignore
eslint.config.mjs
package-lock.json
package.json
tsconfig.json
vercel.json
```

---

## Technology Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
  bcrypt Password Hashing

## Additional Ideas (Optional)

- Transaction fee system
- Agent commissions
- Daily/Monthly limits
  Notification system
