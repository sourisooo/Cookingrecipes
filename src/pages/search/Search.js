import { useFetch } from '../../hooks/useFetch'
import { useLocation } from 'react-router-dom'
import RecipeList from '../../components/RecipeList'

// styles
import './Search.css'

export default function Search() {
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const query = queryParams.get('q')

  const url = 'http://localhost:3000/recipes?q=' + query
  const { error, isPending, data } = useFetch(url)

  return (
    <div>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}

//Commentaires
//Meme principe que la feuille de code Home. La fonction Search déclare un objet et l'associe à l'objet crée par
//la fonction useFetch. Cette feuille de code permet d'afficher le template HTML associé à la recherche effectuée
//dans la searchBar. En effet, la fonction searchBar renvoye techniquement verts l'url search?q= puis l'affichage
//des résultats est rendu possible par deux constantes utilisants les méthodes uselocation et UrlsearchParams.
//Finalement ce sont ces deux constantes qui vont pouvoir préciser l'url surlequel la demande de fetch va etre
//réaliser.