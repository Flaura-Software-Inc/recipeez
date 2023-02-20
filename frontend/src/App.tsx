import './App.css';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <Link to="/">
        <button>Recipes</button>
      </Link>
      <Link to="/add-recipe">
        <button>Add recipe</button>
      </Link>
      <Outlet />
    </div>
  );
}

export default App;
