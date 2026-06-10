import React, { useEffect, useState } from "react";

export const TableView = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipesHeader, setRecipesHeader] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then((res) => {
        if (!res.ok) {
          setError("something went wrong");
        }
        return res.json();
      })
      .then((res) => {
        setRecipes(res);
        setRecipesHeader(Object.keys(res.recipes[0]));
      })
      .catch(() => {
        setError("something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error && !loading) {
    <p>{error}</p>;
  }

  if (recipes.length === 0) {
    return <p>Empty state</p>;
  }

  console.log({ recipes });
  //   const tableHeader = Object.keys(recipes[0] || []);
  console.log({ recipesHeader });

  const recipesTable = recipes.recipes.map((rec) => {
    return (
      <tr>
        <td>{rec.name}</td>
        <td>{rec.difficulty}</td>
        <td>{rec.rating}</td>
      </tr>
    );
  });

  return (
    <>
      <h1>Recipes</h1>
      <div>{recipesTable}</div>
      <table className="custom-table">
        <thead>
          <tr>
            {recipesHeader.map((item) => {
              return <th>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>{recipesTable}</tbody>
      </table>
    </>
  );
};
