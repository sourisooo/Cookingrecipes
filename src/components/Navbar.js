import { Link } from 'react-router-dom'

// styles
import './Navbar.css'
import Searchbar from './Searchbar'

export default function Navbar() {
  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="brand">
          <h1>Cooking Ninja</h1>
        </Link>
        <Searchbar />
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  )
  }

  //Commentaires
  //Les outils routers links to sont utilisés grace aux routes définis dans app.
  // La navbar intègre un lien vers home sur le titre, un search bar sans lien, et 
  //un intitulé Create Recipe avec un lien vers la page create.