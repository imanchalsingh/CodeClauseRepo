import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <h1 className="title">Discover Your Next Favorite Recipe</h1>
        <p className="subtitle">Browse through a variety of recipes and find your perfect match.</p>
        <Link href="/recipes" className="cta-btn">
          Explore Recipes
        </Link>
      </div>

      <style jsx global>{`
        .hero {
          background: linear-gradient(135deg, #ffb74d, #ff8a65);
          color: var(--secondary-color);
          padding: 4rem 0;
          text-align: center;
          border-radius: 0 0 50% 50%;
          box-shadow: var(--shadow);
        }

        .title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .subtitle {
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }

        .cta-btn {
          background: var(--secondary-color);
          color: var(--text-color);
          padding: 0.8rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 30px;
          text-decoration: none;
          transition: background 0.3s ease;
        }

        .cta-btn:hover {
          background: var(--accent-color);
        }
      `}</style>
    </section>
  );
}
