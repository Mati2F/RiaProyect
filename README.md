# Currency Converter - Internship Challenge 2026

## Brief Description

A simple international currency converter that allows users to convert money between different currencies, visualize rates, and understand whether it is a good moment to send money internationally.

The project is built using:

- **Next.js (App Router)**
- **React & TypeScript**
- **TailwindCSS**  
- **Frankfurter API**

It is deployed on **Vercel**.

---

## Setup Instructions

Clone the repository:

```bash
git clone https://github.com/Mati2F/RiaProyect
cd currency-dashboard
```

Install dependencies:
```
npm install 
```

Run development server:
```
npm run dev
```

Open project in browser:
```
http://localhost:3000
```

## Innovation Feature

### Feature: **Best & Worst Exchange Rate**

It analyzes the last 30 days of exchange rate fluctuations between the selected currencies and displays the best and worst ones.

### ¿Why was it chosen?
It is frequent for remittance app users to compare the exchange rate against previous days before completing a transfer.

### ¿How does it improve UX (user experience)?
- Gives users clear context about whether today is a good moment to convert.
- Prevents users from making poor decisions during low exchange rate moments.
- Adds real value without cluttering the interface.

---

## How AI was used in this project
It was mainly focused on improving UI ideas, delivering css templates and code for better design, assisting with debugging mistakes related to the values inserted in the amount field and providing overall good NextJS practices.

## Assumptions made
- The 30-day historical range is not user-selectable to keep the UI clean.
- Input validation is handled client-side only.

## Improvements with more time
- A small line graph showing the 30-day trend visually.
- Rate alert system (notify user when rate becomes favorable).
- Favorites list for frequently used currency routes.
- Server-side caching of API responses to improve performance.
