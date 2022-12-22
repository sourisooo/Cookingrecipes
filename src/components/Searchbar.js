import { useState } from 'react'
import { useHistory } from 'react-router-dom'

// styles
import './Searchbar.css'

export default function Searchbar() {
  const [term, setTerm] = useState('')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()

    history.push(`/search?q=${term}`)
  }

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input 
          id="search" 
          type="text" 
          onChange={(e) => setTerm(e.target.value)} 
          required 
        />
      </form>
    </div>
  )
}

//Commentaires
//La fonction searchbar est définie par deux éléments. Le premier est un objet disposant de useState, cet objet
//va recevoir les informations issus du formulaire HTML représentant le champ de recherche de recette. La variable
//history va permettre de réorienter l'internaute, sur l'url de recherche, à l'issu de l'exécution de la recherche en 
//incorporant dans sa requete la variable utilisant usestate cité comme premier élément. La variable term est modifiée
// à travers la fonction setterm, elle meme incorporée dans le formulaire HTML.