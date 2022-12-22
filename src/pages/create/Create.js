import { useState, useRef, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useHistory } from 'react-router-dom'

// styles
import './Create.css'

export default function Create() {  
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const ingredientInput = useRef(null)

  const { postData, data } = useFetch('http://localhost:3000/recipes', 'POST')
  const history = useHistory()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    postData({ title, ingredients, method, cookingTime: cookingTime + ' minutes' })
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const ing = newIngredient.trim()

    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }
    setNewIngredient('')
    ingredientInput.current.focus()
  }

  // redirect the user when we get data response
  useEffect(() => {
    if (data) {
      history.push('/')
    }
  }, [data, history])

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>

        <label>
          <span>Recipe title:</span>
          <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
            <input 
              type="text" 
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className="btn">add</button>
          </div>
        </label>
        <p>Current ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>

        <label>
          <span>Recipe Method:</span>
          <textarea 
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input 
            type="number" 
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required 
          />
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  )
}

//Commentaires
//La fonction create est constitué de 5 objets disposant de la fonctionnalité useState. Ces objets sont associés
//au  template HTML qui est retourné par la fonction. En effet, dans le template HTML, on retrouve les méthodes sets
// des objets usestate permettant de modifier la valeur de la variable. La différence principale par rapport aux
//projets précédents récide dans le fait que un objet [newIngredient, setNewIngredient]  est utilisé spécifiquement
//pour afficher, sur la page HTML en cours, la liste des ingrédients qui ont précédamment été ajouté dans la recette. Par ailleurs,
//la fonction setIngredient est programmé de manière à ajouter les données les une à la suite des autres, à la manière
//d'une liste. Au final la variable ingrediants est une liste de string. Après avoir soumis le formulaire et récuperer les
//informations puis les remonter comme entrée de la fonction postData, une demande de POST, ou écriture sur la bdd JSON, est
// faite à travers la fonction postData. La ligne de code const { postData, data } = useFetch('http://localhost:3000/recipes', 'POST')
//permet de réutiliser la fonction postdata dans la feuille create car la fonction postdata a été défini par la feuille
//de code useFetch.
//La différence majeur avec le projet dojo-blog réside que dans le projet dojo-blog intégre le code de post requete JSON
//dans le corps du code create tandis que cette partie de code est externalisé dans la feuille de code useFetch.
//En effet, dans ce projet, la fonction useFetch est utilisée pour recevoir des données de JSON et pour envoyer
//des données vers JSON alors que pour le projet dojo-blog la fonction useFetch ne permet que de recevoir des données de JSON.
