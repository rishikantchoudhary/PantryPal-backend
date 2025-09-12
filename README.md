# 🍳 PantryPal Backend

PantryPal is a recipe recommendation backend that helps users find recipes based on the ingredients they already have.  
It integrates with **Google Gemini (Flash 2.5 Lite)** to generate structured recipe suggestions.

---

## 🚀 Features

- Accepts a list of ingredients from the frontend.
- Uses **Gemini AI** to generate structured recipe data:
  - `recipeName` → Name of the dish
  - `servings` → Number of servings
  - `estimatedTime` → Estimated cooking time
  - `ingredientsYouHave` → List of matched ingredients with quantities
  - `missingIngredients` → List of additional ingredients needed
  - `steps` → Step-by-step instructions
- Clean project structure:
  - `server.js` → Handles routes and API requests
  - `aiClient.js` → Handles AI calls (Gemini integration)

---

## 📂 Project Structure

PantryPal-Backend/
│── node_modules/
│── server.js
│── aiClient.js
│── .env
│── package.json
│── package-lock.json

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/PantryPal-Backend.git
cd PantryPal-Backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a .env file in the root folder:

```bash
GEMINI_API_KEY=your_api_key_here
PORT=5000
```

### 4️⃣ Run the Server

```bash
npm run dev
```

## 📡 API Endpoint

`POST /api/recipes`

Generate recipes based on available ingredients.

### Request Body:

```bash
{
"ingredients": ["tomato", "cheese", "bread"]
}
```

### Response:

```bash
[
{
"recipeName": "Tomato Cheese Sandwich",
"servings": "2",
"estimatedTime": "15 minutes",
"ingredientsYouHave": ["2 slices of bread", "1 tomato", "cheese"],
"missingIngredients": ["butter", "oregano"],
"steps": [
"Slice the tomato.",
"Grate the cheese.",
"Butter the bread slices.",
"Place tomato and cheese inside.",
"Grill until golden brown."
]
}
]
```

## 🛠 Tech Stack

Node.js + Express → Backend framework

Google Gemini (Flash 2.5 Lite) → AI recipe generation

dotenv → Manage environment variables
