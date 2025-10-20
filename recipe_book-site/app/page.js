"use client";
import Header from "../components/Header";
import Hero from "../components/Hero";
import RecipeList from "../components/RecipeList";

export default function Home() {
  // Dummy data
  const recipes = [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description:
        "Classic Italian pasta dish with eggs, cheese, pancetta, and pepper.",
      image: "https://www.culinaryhill.com/wp-content/uploads/2021/12/Spaghetti-Carbonara-Culinary-Hill-1200x800-1.jpg",
    },
    {
      id: 2,
      title: "Chicken Tikka Masala",
      description:
        "Flavorful Indian curry made with marinated chicken in a spiced tomato sauce.",
      image: "https://realfood.tesco.com/media/images/1400x919-Chicken-tikka-masala-43fcdbd8-eb86-4b55-951d-adda29067afa-0-1400x919.jpg",
    },
    {
      id: 3,
      title: "Vegetable Stir Fry",
      description:
        "Quick and healthy dish with mixed vegetables stir-fried in a savory sauce.",
      image: "https://recipe30.com/wp-content/uploads/2021/08/Asian-stirfried-vegetables.jpg",
    },
  ];

  return (
    <>
      <Header />
      <Hero />
      <div className="container">
        <RecipeList recipes={recipes} />
      </div>
    </>
  );
}
