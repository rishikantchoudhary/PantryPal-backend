import { GoogleGenAI, Type } from '@google/genai'
import dotenv from 'dotenv'

dotenv.config()

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

async function generateRecipe(ingredients) {
  try {
    const model = 'gemini-2.5-flash-lite'
    const prompt = `You are an expert recipe recommendation assistant. Suggest three dishes using the following ingredients I have : ${ingredients}. Return 'recipeName' is name of the recipe, 'servings' is number of servings, 'estimatedTime' is estimated time in minutes, 'ingredientsYouHave' is only the ingredients I mentioned with required quantity, 'missingIngredients' is any additional ingredients I might need to make this dish with quantity, 'steps' is steps to make this dish in around 8-10 steps.`

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              recipeName: { type: Type.STRING },
              servings: { type: Type.NUMBER },
              estimatedTime: { type: Type.NUMBER },
              ingredientsYouHave: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              missingIngredients: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              steps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            propertyOrdering: [
              'recipeName',
              'servings',
              'estimatedTime',
              'ingredientsYouHave',
              'missingIngredients',
              'steps',
            ],
          },
        },
      },
    })

    const rawText = response.candidates[0].content.parts[0].text

    return JSON.parse(rawText)
  } catch (error) {
    console.log('Error generating the recipe: ', error)
    throw error
  }
}

export default generateRecipe
