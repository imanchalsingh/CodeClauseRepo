'use client'
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link href="/" className="logo">
            🍳RecipeBook
          </Link>

          <nav className={`nav ${isOpen ? "open" : ""}`}>
            <Link href="/" className="nav-link" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/add-recipe" className="nav-link" onClick={() => setIsOpen(false)}>
              Add Recipe
            </Link>
          </nav>

          <div
            className={`hamburger ${isOpen ? "active" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        :root {
          --primary-color: #f4f7f6;
          --secondary-color: #ffffff;
          --accent-color: #ffb74d;
          --text-color: #333;
          --shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
          --font: 'Nunito';
        }

        .header {
          background: var(--primary-color);
          color: var(--text-color);
          padding: 1rem 0;
          box-shadow: var(--shadow);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font);
        }

        .logo {
          font-size: 1.9rem;
          font-weight: 700;
          text-decoration: none;
          color: var(--text-color);
          background: linear-gradient(90deg, #ffb74d, #ff8a65);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: transform 0.3s ease;
        }

        .logo:hover {
          transform: scale(1.05);
        }

        .nav {
          display: flex;
          gap: 25px;
        }

        .nav-link {
          position: relative;
          color: var(--text-color);
          text-decoration: none;
          font-weight: 500;
          padding: 5px 0;
          transition: all 0.3s ease;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          width: 0%;
          height: 2px;
          bottom: -2px;
          left: 0;
          background: var(--accent-color);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link:hover {
          color: var(--accent-color);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          cursor: pointer;
          gap: 5px;
        }

        .hamburger span {
          width: 26px;
          height: 3px;
          background: var(--text-color);
          border-radius: 2px;
          transition: all 0.4s ease;
        }

        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        @media (max-width: 768px) {
          .nav {
            position: absolute;
            top: 70px;
            right: 0;
            background: var(--secondary-color);
            flex-direction: column;
            width: 200px;
            padding: 1rem;
            border-radius: 8px 0 0 8px;
            box-shadow: var(--shadow);
            transform: translateX(100%);
            transition: transform 0.3s ease;
          }

          .nav.open {
            transform: translateX(0);
          }

          .nav-link {
            padding: 10px 15px;
          }

          .hamburger {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
}
