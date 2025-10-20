import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes }) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="empty-state">
        <h3>No recipes found</h3>
        <p>Start by adding your first recipe! 🍳</p>
      </div>
    );
  }

  return (
    <div className="recipe-list">
      <div className="grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      <style jsx>{`
        .recipe-list {
          padding: 30px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #666;
          animation: fadeIn 0.6s ease-in-out;
        }

        .empty-state h3 {
          margin-bottom: 10px;
          font-size: 1.8rem;
          color: #ff6347;
          background: linear-gradient(90deg, #ff6347, #ffd700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .empty-state p {
          font-size: 1rem;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .recipe-list {
            padding: 20px 10px;
          }
        }
      `}</style>
    </div>
  );
}
