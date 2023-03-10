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
//La fonction create est constitu?? de 5 objets disposant de la fonctionnalit?? useState. Ces objets sont associ??s
//au  template HTML qui est retourn?? par la fonction. En effet, dans le template HTML, on retrouve les m??thodes sets
// des objets usestate permettant de modifier la valeur de la variable. La diff??rence principale par rapport aux
//projets pr??c??dents r??cide dans le fait que un objet [newIngredient, setNewIngredient]  est utilis?? sp??cifiquement
//pour afficher, sur la page HTML en cours, la liste des ingr??dients qui ont pr??c??damment ??t?? ajout?? dans la recette. Par ailleurs,
//la fonction setIngredient est programm?? de mani??re ?? ajouter les donn??es les une ?? la suite des autres, ?? la mani??re
//d'une liste. Au final la variable ingrediants est une liste de string. Apr??s avoir soumis le formulaire et r??cuperer les
//informations puis les remonter comme entr??e de la fonction postData, une demande de POST, ou ??criture sur la bdd JSON, est
// faite ?? travers la fonction postData. La ligne de code const { postData, data } = useFetch('http://localhost:3000/recipes', 'POST')
//permet de r??utiliser la fonction postdata dans la feuille create car la fonction postdata a ??t?? d??fini par la feuille
//de code useFetch.
//La diff??rence majeur avec le projet dojo-blog r??side que dans le projet dojo-blog int??gre le code de post requete JSON
//dans le corps du code create tandis que cette partie de code est externalis?? dans la feuille de code useFetch.
//En effet, dans ce projet, la fonction useFetch est utilis??e pour recevoir des donn??es de JSON et pour envoyer
//des donn??es vers JSON alors que pour le projet dojo-blog la fonction useFetch ne permet que de recevoir des donn??es de JSON.
