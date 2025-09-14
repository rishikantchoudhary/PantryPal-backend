import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import generateRecipe from './aiClient.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
)
app.use(express.json()) // allows JSON in request body

// To generate recipes dynamically from gemini api
app.post('/recipes', async (req, res) => {
  try {
    const { ingredients } = req.body

    const recipe = await generateRecipe(ingredients)

    res.json({
      message: 'Recipes generated successfully',
      recipe,
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate recipe' })
  }
})

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})
