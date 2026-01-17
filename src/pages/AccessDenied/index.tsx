import { useNavigate } from "react-router-dom";

const AccessDenied = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2>Acesso restrito</h2>
      <button onClick={() => navigate("/")}>Início</button>
    </>
  );
};

export default AccessDenied;
