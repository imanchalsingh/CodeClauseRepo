'use client'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Header from '../../../components/Header'
import RecipeForm from '../../../components/RecipeForm'

export default function EditRecipe() {
  const params = useParams()
  const router = useRouter()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchRecipe()
    }
  }, [params.id])

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`/api/recipes/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setRecipe(data)
      } else {
        router.push('/')
      }
    } catch (error) {
      console.error('Error fetching recipe:', error)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (recipeData) => {
    try {
      const response = await fetch(`/api/recipes/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      })

      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.error('Error updating recipe:', error)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="page-header">
          <h1>Edit Recipe</h1>
          <p>Make changes to your recipe</p>
        </div>
        <RecipeForm recipe={recipe} onSubmit={handleSubmit} />
      </div>
    </>
  )
}