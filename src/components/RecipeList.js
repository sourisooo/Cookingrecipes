import { Link } from 'react-router-dom'

// styles
import './RecipeList.css'

export default function RecipeList({ recipes }) {

  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>
  }

  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <div key={recipe.id} className="card">
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
        </div>
      ))}
    </div>
  )
}

//Commentaires
//La fonction RecipeList prend pour entrée l'objet recipes et retourne un template HTML contenant des 
//datas spécifiques à l'objets recipes. La méthode implémentée javascript map est utilisée pour accéder
//aux différents attributs de l'objet: id, title, cookingtime, method. Tous ces attributs sont ensuites
//incorporer dans un template HTML. L'objet retourné par cette fonction est utilisé dans la page home.
//L'accès aux différents attributs est rendu possible par le fait que la fonction recipelist est utilisé
//dans la fonction home et que la fonction home dispose d'un accès fetch à la base de donnée JSON.