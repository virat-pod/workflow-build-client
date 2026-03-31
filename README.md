# 🚀 Workflow Builder – Frontend

A modern productivity web app built with **Next.js** that helps users manage tasks, track streaks, earn XP, and stay consistent.

---

## ✨ Features

* 🔐 Authentication (Login / Signup)
* 🏠 Home Page (Landing + Overview)
* 📊 Dashboard (Tasks + Activity + Stats)
* ✅ Task Management (Add / Edit / Complete)
* 🔥 Streak Tracking System
* 🎮 XP & Badge System (Gamification)
* ⚙️ Settings Page (Profile & Preferences)
* ⏱️ Relative Time (e.g., 2h, 1d ago)

---

## 🧱 Pages Structure

| Page         | Description             |
| ------------ | ----------------------- |
| `/`          | Home / Landing page     |
| `/login`     | User login              |
| `/signup`    | User registration       |
| `/dashboard` | Main user dashboard     |
| `/settings`  | User settings & profile |

---

## 🛠️ Tech Stack

* **Next.js 16**
* **React**
* **Tailwind CSS**
* **NextAuth.js** (Authentication)
* **Day.js** (Time formatting)

---

## 📦 Installation

```bash
git clone https://github.com/virat-pod/workflow-builder-client.git
cd workflow-builder-client
npm install
```

---

## ⚙️ Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret
```

---

## 🚀 Running the Project

```bash
npm run dev
```

👉 App will run on:
`http://localhost:3000`

---

## 🔗 API Integration

Frontend connects to backend using:

```js
process.env.NEXT_PUBLIC_SERVER_URL
```

Example:

```js
fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/todo`)
```

---

## 📊 Core Features Explained

### ✅ Task System

* Create, edit, and complete tasks
* Real-time UI updates
* Optimistic updates for smooth UX

---

### 🔥 Streak System

* Tracks consecutive active days
* Breaks if a day is missed

---

### 🎮 XP & Badges

* Earn XP on task completion
* Unlock badges based on XP milestones

---

### ⏱️ Time Tracking

* Uses Day.js for:

```js
dayjs(task.createdAt).fromNow()
```

---

## 📁 Folder Structure

```
/app
  /home
  /dashboard
  /settings
/components
/lib
```

---

## 💡 Future Improvements

* 📅 Calendar streak view (GitHub style)
* 🏆 Leaderboard system
* 🔔 Notifications
* 🌙 Dark mode

---

## 🙌 Author

Built with 💻 by **Virat**

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
