<h1 align='center'>🫂 be2gether - A Full Stack social media app</h1>

<p align="center">
  <a href="https://be2gether-f4mx.vercel.app/" target="_blank">🌐 Live Demo</a>
</p>

**be2gether** is a modern social media platform where users can connect, share, and engage — built with **Next.js, Clerk & Prisma**, and deployed on **Vercel**.

 ---
 
## 🚀 Features
- 🔐 Authentication with **Clerk** (Sign up, Sign in, Manage sessions)
- 📝 Create and delete posts
- 📸 Image upload using **UploadThing**
- 👤 User profiles with dynamic routes
- ❤️ Follow/unfollow users
- 🔔 Notifications system
- 🌙 Light/Dark mode toggle
- 🎨 Styled with **Tailwind CSS + shadcn/ui**
- 🗄️ Database with **Prisma + PostgreSQL**

---

## 📸 Screenshot

### 🏠 Homepage
![Homepage](./public/be2gether.png)

---

## 📂 Project Structure

```bash
be2gether/
├── prisma/              # Prisma schema & migrations
├── public/              # Static assets
├── src/
│   ├── actions/         # Server actions (posts, users, profiles, notifications)
│   ├── app/             # Next.js App Router pages & API routes
│   ├── components/      # UI & feature components
│   ├── lib/             # Utilities (Prisma, UploadThing, helpers)
│   └── middleware.ts    # Auth & middleware logic
└── package.json
```

---

## 🛠️ Tech Stack

- **Frontend**:  
  ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)  
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  
  ![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=radix-ui&logoColor=white)

- **Auth**:  
  ![Clerk](https://img.shields.io/badge/Clerk-3C366B?style=for-the-badge&logo=clerk&logoColor=white)

- **Database**:  
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)  
  ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

- **File Uploads**:  
  ![UploadThing](https://img.shields.io/badge/UploadThing-FF6B6B?style=for-the-badge&logo=upload&logoColor=white)

- **Deployment**:  
  ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## ⚙️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/ExploreInsight/be2gether.git
cd be2gether
```

### 2. Install dependencies
```bash
npm install or npm i
```
### 3. Set up environment variables
Create a .env file in the root with the following:

```bash
DATABASE_URL=your_postgres_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
UPLOADTHING_TOKEN=your_uploadthing_token

```
### 4. Run Prisma migrations
```bash
npx prisma migrate dev
```

### 5. Start the development server
```bash
npm run dev
```

### 👨‍💻 Author
Chirag
