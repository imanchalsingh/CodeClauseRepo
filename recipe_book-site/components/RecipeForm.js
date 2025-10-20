'use client'
import { useState } from 'react'

export default function RecipeForm({ recipe = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    title: recipe.title || '',
    description: recipe.description || '',
    image: recipe.image || '',
    ingredients: recipe.ingredients || [''],
    instructions: recipe.instructions || '',
    cookTime: recipe.cookTime || '',
    servings: recipe.servings || '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients]
    newIngredients[index] = value
    setFormData(prev => ({ ...prev, ingredients: newIngredients }))
  }

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }))
  }

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, ingredients: newIngredients }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const filteredIngredients = formData.ingredients.filter(ing => ing.trim() !== '')
    onSubmit({ ...formData, ingredients: filteredIngredients })
  }

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <h2 className="form-title">{recipe.id ? 'Update Recipe' : 'Add New Recipe'}</h2>

      <div className="form-group">
        <label className="form-label">Recipe Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="form-input"
          placeholder="e.g., Spaghetti Carbonara"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="form-textarea"
          placeholder="A brief description of your recipe..."
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Image URL</label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          className="form-input"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Ingredients</label>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-item">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              className="form-input ingredient-input"
              placeholder={`Ingredient ${index + 1}`}
            />
            <button type="button" onClick={() => removeIngredient(index)} className="remove-btn">✕</button>
          </div>
        ))}
        <button type="button" onClick={addIngredient} className="add-btn">+ Add Ingredient</button>
      </div>

      <div className="form-group">
        <label className="form-label">Instructions</label>
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleInputChange}
          className="form-textarea"
          placeholder="Step by step instructions..."
          rows={6}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Cook Time</label>
          <input
            type="text"
            name="cookTime"
            value={formData.cookTime}
            onChange={handleInputChange}
            className="form-input"
            placeholder="e.g., 30 minutes"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Servings</label>
          <input
            type="number"
            name="servings"
            value={formData.servings}
            onChange={handleInputChange}
            className="form-input"
            min="1"
            required
          />
        </div>
      </div>

      <button type="submit" className="btn-primary">
        {recipe.id ? 'Update Recipe' : 'Add Recipe'}
      </button>

      <style jsx>{`
        :root {
          --primary-color: #fce4ec;
          --secondary-color: #f8bbd0;
          --accent-color: #ff8a65;
          --text-color: #333;
          --shadow: 0 10px 25px rgba(0,0,0,0.08);
          --border-radius: 15px;
          --font: 'Poppins', sans-serif;
        }

        .recipe-form {
          max-width: 700px;
          margin: 40px auto;
          background: var(--primary-color);
          padding: 35px;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow);
          font-family: var(--font);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .recipe-form:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.12);
        }

        .form-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--accent-color);
          text-align: center;
          margin-bottom: 25px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 18px;
        }

        .form-label {
          font-weight: 600;
          color: var(--accent-color);
        }

        .form-input, .form-textarea {
          padding: 12px 14px;
          border: 1px solid #e1bee7;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: var(--accent-color);
          box-shadow: 0 0 10px rgba(255,138,101,0.3);
        }

        .ingredient-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .ingredient-input {
          flex: 1;
        }

        .remove-btn {
          background: var(--accent-color);
          border: none;
          color: white;
          border-radius: 10px;
          padding: 0 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .remove-btn:hover {
          transform: scale(1.2);
          background: #ff7043;
        }

        .add-btn {
          background: var(--accent-color);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 6px 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .add-btn:hover {
          background: #ff7043;
          transform: translateY(-2px);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .btn-primary {
          width: 100%;
          background: linear-gradient(90deg, var(--accent-color), var(--secondary-color));
          padding: 14px 0;
          border: none;
          border-radius: 20px;
          font-weight: 600;
          color: white;
          cursor: pointer;
          font-size: 1rem;
          margin-top: 10px;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.12);
        }

        @media (max-width: 768px) {
          .recipe-form {
            padding: 25px;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </form>
  )
}
