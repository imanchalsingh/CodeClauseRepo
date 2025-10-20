import { NextResponse } from 'next/server'
import { storage } from '../../../utils/storage'

export async function GET() {
  const recipes = storage.getRecipes()
  return NextResponse.json(recipes)
}

export async function POST(request) {
  try {
    const recipeData = await request.json()
    const newRecipe = storage.saveRecipe(recipeData)
    return NextResponse.json(newRecipe, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating recipe' },
      { status: 500 }
    )
  }
}