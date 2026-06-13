import API from "../services/api";


function Home() {

  const probarConexion = async () => {
    try {

      const respuesta = await API.post(
        "/solicitar_rutina",
        {
          nombre: "Jose",
          edad: "25",
          peso: "80",
          altura: "178",
          nivel: "principiante"
        }
      );

      console.log(respuesta.data);

      alert("Conexión exitosa");
    
      
        } catch(error) {
          
          console.error(error);
          alert("Error al conectar con el backend");
        }
      };

      return (
        <div>
          <h2>Solicitar Rutina</h2>

          <button onClick={probarConexion}>Probar Conexión Flask</button>
        </div>
      );
}

export default Home;