# 🧭 Calorie Compass

Calorie Compass is a full-stack calorie tracking application built with Next.js, Prisma, PostgreSQL, and Clerk authentication.

Users can securely create an account, track meals, monitor daily calorie intake, set personalized calorie goals, and visualize progress through an interactive dashboard.

---

## ✨ Features

### Authentication

* Secure user authentication with Clerk
* Sign up and sign in with Google or Email
* Protected dashboard routes
* User profile management

### Meal Tracking

* Create meals
* Edit meals
* Delete meals with confirmation dialog
* Categorize meals (Breakfast, Lunch, Dinner, Snack)

### Dashboard

* Daily calorie tracking
* Protein, carbohydrate, and fat summaries
* Personalized calorie goals
* Progress bar showing goal completion
* Dynamic mascot/progress image system
* Recent meal history

### Settings

* Custom daily calorie goal
* Goal progress recalculation

### Database

* PostgreSQL database hosted on Neon
* Prisma ORM for type-safe database access

---

## 🛠️ Tech Stack

| Technology        | Purpose                    |
| ----------------- | -------------------------- |
| Next.js 16        | Full-stack React framework |
| TypeScript        | Type safety                |
| Tailwind CSS      | Styling                    |
| Shadcn UI         | UI components              |
| Prisma            | ORM                        |
| PostgreSQL (Neon) | Database                   |
| Clerk             | Authentication             |
| Lucide React      | Icons                      |
| Vercel            | Deployment                 |

---

## 📸 Screenshots

### Dashboard

* Daily calorie progress
* Nutrition summary cards
* Recent meals list
* User settings

### Meal Management

* Add Meal Modal
* Edit Meal Screen
* Delete Confirmation Dialog

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/harrywardy-cmd/calorie-compass.git
cd calorie-compass
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
DATABASE_URL="your-neon-database-url"
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### 4. Setup the database

```bash
npx prisma db push
```

Generate Prisma Client:

```bash
npx prisma generate
```

### 5. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── dashboard/
│   ├── meals/
│   ├── settings/
│   ├── sign-in/
│   └── sign-up/
│
├── components/
│
├── generated/
│   └── prisma/
│
├── lib/
│   └── prisma.ts
│
└── prisma/
    └── schema.prisma
```

---

## 🔮 Planned Features

* Daily calorie history
* Weekly trends and charts
* Monthly analytics
* AI meal analysis from photos
* Macro nutrient goals
* Weight tracking
* Streak system
* Achievement badges
* Mobile-friendly PWA support

---

## 📚 What I Learned

This project helped me gain practical experience with:

* Next.js App Router
* Server Actions
* Authentication with Clerk
* Prisma ORM
* PostgreSQL databases
* Full CRUD operations
* Protected routes
* Responsive UI design
* TypeScript in production applications

---

## 🌐 Deployment

The application is deployed using Vercel.

To deploy your own version:

```bash
vercel
```

or connect your GitHub repository directly through the Vercel dashboard.

---

## 👨‍💻 Author

Harry Ward

GitHub:
https://github.com/harrywardy-cmd
