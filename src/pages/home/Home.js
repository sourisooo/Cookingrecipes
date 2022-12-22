import { useFetch } from '../../hooks/useFetch'
import RecipeList from '../../components/RecipeList'

// styles
import './Home.css'

export default function Home() {
  const { data, isPending, error } = useFetch('http://localhost:3000/recipes')

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}

//Commentaires
//La fonction home retourne un template HTML dynamique de donnée incluant data et error. Ces données
//sont récupérés à l'aide de la fonction useFetch qui retourne un objet disposant des attributs
// data, isPending, error, postData qui sont ensuites incorporés dans le template HTML.
//La fonction home fait appel à la fonction recipeList. C'est cette dernière fonction qui va exploiter
//et organiser l'affichage des données. 
