<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# 🍳 Chef Claude – AI Recipe Generator (React)

Chef Claude is a **frontend learning project** built with **React** that explores how AI APIs can be integrated into a modern web application.

The app allows users to enter a list of ingredients and generates a complete recipe using an AI model, formatted in clean Markdown for easy rendering in the UI.

This project was created as part of my **React learning journey**, with a focus on understanding:
- API integration  
- Async data handling  
- State management  
- AI-generated content rendering  

---

## 🚀 Features

- Add multiple ingredients dynamically  
- Generate recipes using an AI model  
- Vegetarian-safe logic  
  *(If no non-veg or eggs are mentioned, the recipe stays vegetarian)*  
- Clean Markdown output (no tables)  
- Responsive UI  
- Fully frontend-based (no backend)

---

## 🛠 Tech Stack

- **React** (Vite)
- **JavaScript (ES6+)**
- **Groq AI API**
- **react-markdown**
- **CSS**

---

## 📚 What I Learned

- Integrating AI APIs into a React app  
- Prompt engineering to control AI output  
- Handling async API calls and errors  
- Rendering Markdown safely in React  
- Managing environment variables with Vite  
- Structuring a React project cleanly  

---
<!--
## ⚠️ Notes

- This is a **learning project**, not a production application  
- API keys are stored in `.env` and are **not committed**  
- The project currently runs locally  
- Deployment (Vercel) is planned in the future  

---
-->

## 🔧 Setup & Run Locally

1. **Clone the repository**

```bash
git clone https://github.com/vidhisonani/chef-claude-react.git
cd chef-claude-react
```

2. **Install dependencies**
```bash
npm install
```
3. **Create a .env file**
``` bash
VITE_GROQ_API_KEY=your_api_key_here
```
4. **Start the development server**
```bash
npm run dev
```
>>>>>>> d745b45153f66eeb7763dfa15f826c057cb65cc7
