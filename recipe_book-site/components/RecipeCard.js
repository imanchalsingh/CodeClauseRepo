import Link from "next/link";

export default function RecipeCard({ recipe }) {
  return (
    <div className="card">
      <img src={recipe.image} alt={recipe.title} className="card-img" />
      <div className="card-body">
        <h3 className="card-title">{recipe.title}</h3>
        <p className="card-description">{recipe.description}</p>
        <Link href={`/recipes/${recipe.id}`} className="card-btn">
          View Recipe
        </Link>
      </div>

      <style jsx global>{`
        .card {
          background: var(--secondary-color);
          border-radius: 15px;
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: transform 0.3s ease;
        }

        .card:hover {
          transform: translateY(-10px);
        }

        .card-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-bottom: 2px solid var(--primary-color);
        }

        .card-body {
          padding: 1rem;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .card-description {
          font-size: 1rem;
          margin-bottom: 1rem;
        }

        .card-btn {
          background: var(--accent-color);
          color: var(--secondary-color);
          padding: 0.6rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 30px;
          text-decoration: none;
          transition: background 0.3s ease;
        }

        .card-btn:hover {
          background: #ff7043;
        }
      `}</style>
    </div>
  );
}
