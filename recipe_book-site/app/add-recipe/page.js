'use client'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import RecipeForm from '../../components/RecipeForm'

export default function AddRecipe() {
  const router = useRouter()

  const handleSubmit = async (recipeData) => {
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      })

      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.error('Error adding recipe:', error)
    }
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="page-header">
          <h1>Add New Recipe</h1>
          <p>Share your delicious creation with the world</p>
        </div>
        <RecipeForm onSubmit={handleSubmit} />
      </div>
    </>
  )
}