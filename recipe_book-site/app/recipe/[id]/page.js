'use client'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Header from '../../../components/Header'
import Link from 'next/link'

export default function RecipeDetail() {
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

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this recipe?')) {
      try {
        const response = await fetch(`/api/recipes/${params.id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          router.push('/')
        }
      } catch (error) {
        console.error('Error deleting recipe:', error)
      }
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="container">
          <div className="loading">Loading recipe...</div>
        </div>
      </>
    )
  }

  if (!recipe) {
    return (
      <>
        <Header />
        <div className="container">
          <div className="error">Recipe not found</div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="recipe-detail">
          {/* Recipe detail content remains the same as previous */}
          <div className="recipe-header">
            <div className="recipe-image-large">
              {recipe.image ? (
                <img src={recipe.image} alt={recipe.title} />
              ) : (
                <div className="no-image-large">🍳</div>
              )}
            </div>
            <div className="recipe-info">
              <h1>{recipe.title}</h1>
              <p className="recipe-description">{recipe.description}</p>
              <div className="recipe-meta-large">
                <div className="meta-item">
                  <span className="meta-label">Cook Time</span>
                  <span className="meta-value">{recipe.cookTime}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Servings</span>
                  <span className="meta-value">{recipe.servings}</span>
                </div>
              </div>
              <div className="recipe-actions-large">
                <Link href={`/edit-recipe/${recipe.id}`} className="btn btn-secondary">
                  Edit Recipe
                </Link>
                <button onClick={handleDelete} className="btn btn-danger">
                  Delete Recipe
                </button>
              </div>
            </div>
          </div>

          <div className="recipe-content-detail">
            <div className="ingredients-section">
              <h2>Ingredients</h2>
              <ul className="ingredients-list">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="instructions-section">
              <h2>Instructions</h2>
              <div className="instructions-content">
                {recipe.instructions.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}