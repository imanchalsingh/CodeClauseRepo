import { NextResponse } from 'next/server'
import { storage } from '../../../../../utils/storage'

export async function GET(request, { params }) {
  const recipe = storage.getRecipe(params.id)
  if (!recipe) {
    return NextResponse.json({ error: 'Recipe not found' }, { status: 404 })
  }
  return NextResponse.json(recipe)
}

export async function PUT(request, { params }) {
  try {
    const recipeData = await request.json()
    const updatedRecipe = storage.saveRecipe({ ...recipeData, id: params.id })
    return NextResponse.json(updatedRecipe)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating recipe' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    storage.deleteRecipe(params.id)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting recipe' },
      { status: 500 }
    )
  }
}