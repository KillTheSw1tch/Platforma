import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/registration">Register</Link>
      <Link to="/add-cargo">Add Cargo</Link>
    </nav>
  );
}
