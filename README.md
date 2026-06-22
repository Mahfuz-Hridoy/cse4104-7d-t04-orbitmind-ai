# OrbitMind AI  
### CSE4104-7D-T04 — AI-Based Software Development Project  
### Northern University of Business & Technology Khulna

##  Project Description
OrbitMind AI is an intelligent productivity and learning companion designed to help students and professionals manage tasks, track study/work progress, get personalized recommendations, and interact with an AI-powered chatbot.

This project is being developed as part of the CSE4104 (AI-Based Software Development) course under the supervision of Md. Riaz Mahmud, Assistant Professor, NUBTK.  
The Week-1 & Week-2 submissions define the foundation and structure for the full-semester project.

---

## Project Title
**OrbitMind AI — Intelligent Study & Productivity Assistant**

---

## Problem Statement
Students often struggle to organize tasks, maintain study discipline, and get personalized guidance during academic workloads. While there are many productivity tools available, they fail to provide:

- Personalized study/work recommendations  
- AI-based conversational support  
- Task planning aligned with user habits  
- Intelligent reminders  
- Context-aware suggestions  

OrbitMind AI aims to bridge this gap by integrating AI to offer meaningful, adaptive, and personalized assistance.

---

## Objectives
- Build a smart productivity assistant tailored for students  
- Integrate an AI chatbot for academic and productivity-related support  
- Generate personalized study schedules and reminders  
- Provide a clean, dashboard-driven interface  
- Track tasks, habits, and performance patterns  
- Improve user productivity through AI-enhanced insights  

---

## Proposed Features
### Core Functionalities
- **User Authentication**
- **AI Chatbot **
- **Dashboard for productivity tracking**
- **Task & Habit Manager**
- **AI-generated recommendations**
- **Daily/weekly study planner**
- **Notifications & reminders**

### Non-functional Features
- Clean UI/UX  
- Secure data handling  
- Fast and responsive interface  
- Modular backend architecture  

---

## Technology Stack
### **Frontend**
(Selecting simple stack now; may upgrade later)
- HTML  
- CSS  
- JavaScript  

### **Backend**
- Node.js
- Express.js 
-  MongoDB / PostgreSQL

### **AI Integration**
- OpenAI API / Gemini API / Grok API
 
### **Version Control**
- Git & GitHub  

### **Deployment Target**
-Render / Railway / Vercel 

---

## GitHub Repository Link
**[https://github.com/Mahfuz-Hridoy/cse4104-7d-t04-orbitmind-ai.git](https://github.com/Mahfuz-Hridoy/cse4104-7d-t04-orbitmind-ai.git)**

---


##  Project Structure
```text
/orbitmind-ai/
  /frontend/                # Client-Side files
    index.html              # Marketing Landing Page
    login.html              # Login Card
    register.html           # Registration form
    dashboard.html          # Student Dashboard
    tasks.html              # Task planner board
    studyplan.html          # Study plan generator
    summarizer.html         # Note Summarizer
    chatbot.html            # AI Coach chat
    /css/
      style.css             # Shared CSS (Variables, Theme colors, print styles)
    /js/
      api.js                # Shared API calls, authorization injection, themes, UI builders
      auth.js               # Registration & Login submissions
      dashboard.js          # Dashboard renderers & workload charts
      tasks.js              # CRUD task managers
      studyplan.js          # study planner & PDF generators
      summarizer.js         # Text summarization editor
      notifications.js      # Bell notifications toggle & poller
  /backend/                 # Express API Server
    /config/
      db.js                 # MongoDB connection config
    /controllers/           # Request/response controllers (MVC)
    /models/                # Mongoose Schema definitions (MVC)
    /routes/                # REST Routing tables (MVC)
    /middlewares/
      authMiddleware.js     # JWT Authorization guard
    /services/
      geminiService.js      # Gemini API wrappers & fallback simulations
    /utils/
      prompts.js            # Structured AI Prompt Templates
    server.js               # Express Server Entrypoint
    .env                    # Environment variables (DB credentials, API Keys)
    package.json            # Node.js dependencies
  README.md                 # Project Documentation
```

## Installation & Local Setup

### Prerequisites
* [Node.js](https://nodejs.org/) installed locally (version 18+ recommended)
* [MongoDB](https://www.mongodb.com/) (either running locally or a free MongoDB Atlas cluster)

### Step 1: Set up the Backend
1. Open your terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install all required Node packages:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory and populate it:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/orbitmind
   JWT_SECRET=your_secret_jwt_signkey_change_me
   GEMINI_API_KEY=your_google_gemini_api_key
   ```
   *Note: If `GEMINI_API_KEY` is left blank, OrbitMind AI will run in **AI Mock Simulation mode**, generating preset structures so you can run the app offline immediately without configuration.*

### Step 2: Running the Server
Start the Express server using nodemon for development:
```bash
npm run dev
```
The server will boot and display:
```text
MongoDB Connected: localhost
Server running on port 5000
```

### Step 3: Access the Frontend
Open your web browser and go to:
```text
http://localhost:5000/
```
The backend automatically hosts the static files inside the `frontend` folder, meaning you do not need to run a separate dev server for the client side.

---

## 🎨 UI/UX Theme Configuration

OrbitMind AI adopts a student-friendly coffee-inspired look:
* **Light Theme Mode**: Coffee Brown text (`#2C1E14`), Warm Amber highlights (`#E5A93B`), Soft Warm Cream backgrounds (`#FAF6F0`).
* **Dark Theme Mode**: Espresso Black backgrounds (`#120D0A`), Amber highlights (`#FFD275`), Warm White texts (`#F5EFEB`).
* **Micro-Animations**: Uses keyframe transformations for chat bubble appearances, form validation shakes, loading spinners, and graph bar adjustments.

---

## Team Information
| Field | Details |
|-------|---------|
| **Team Name** | CSE4104-7D-T04 |
| **Section** | 7D |
| **Project Title** | OrbitMind AI |
| **Team Leader** | Md. Imroz Newaz (ID: 11220321052) |
| **Member List** | Md. Imroz Newaz (ID: 11220321052) - Team Leader & Database Manager <br> Md. Mahfuzur Rahman Hridoy (ID: 11230121186) AI Integration Lead <br> Fatema Parvin Kanta (ID: 11230121192) - Backend Developer <br> Zeniya Naznin (ID: 11230121138) - Frontend Developer |
| **GitHub Repository** | [https://github.com/Mahfuz-Hridoy/cse4104-7d-t04-orbitmind-ai](https://github.com/Mahfuz-Hridoy/cse4104-7d-t04-orbitmind-ai.git) |

---