import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../state";
import './styles.css';

const NavBar = () => {
  const { resetState } = useGlobalContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("t");
    resetState();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <Link to={"/"}>Home</Link>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default NavBar;
