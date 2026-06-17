import "./Login.css";
import Gymnasio from "../assets/Gymnasio.png";

function Login() {
  return (
    <div className="login-page">

      <div className="login-left">
        <h1>FIT LOGIC</h1>

        <input type="text" placeholder="Usuario" />

        <input type="password" placeholder="Contraseña" />

        <button>Ingresar</button>
      </div>

      <div className="login-right">
        <img
            src={Gymnasio}
            alt="Gymnasio"
        />
      </div>

    </div>
  );
}

export default Login;