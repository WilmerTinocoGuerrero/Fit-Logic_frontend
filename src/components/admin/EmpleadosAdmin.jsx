import React, { useState, useEffect } from "react";
import { Card, Button, Table, Modal, Form, Alert, Row, Col } from "react-bootstrap";
import { registrarEmpleadoAdmin, obtenerEmpleadosAdmin, eliminarEmpleadoAdmin, editarEmpleadoAdmin } from "../../services/adminApi";

const EmpleadosAdmin = () => {
  // Estado para controlar si la ventana flotante (Modal) está abierta o cerrada
  const [mostrarModal, setMostrarModal] = useState(false);

  // LISTA DE EMPLEADOS
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);



  // Estados para el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    dni: "",
    password: "",
    especialidad: "Instructor", // Valor por defecto
  });

  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  
  //-----------ADMIN(EMPLEADOS): Cargar empleados desde el backend
const cargarEmpleados = async () => {
  try {
    const data = await obtenerEmpleadosAdmin();
    setListaEmpleados(data);
  } catch (error) {
    console.error("No se pudo cargar la lista:", error);
  }
};
  
  // ----------- ADMIN(EMPLEADOS): ELIMINAR
const handleEliminar = async (id_empleado) => {
    // Pedimos confirmación para evitar borrados por accidente
    if (window.confirm("¿Estás seguro de que deseas eliminar a este empleado? Esta acción no se puede deshacer.")) {
      try {
        await eliminarEmpleadoAdmin(id_empleado);
        // Si se elimina correctamente, volvemos a cargar la lista
        cargarEmpleados();
      } catch (error) {
        alert("Error al eliminar: " + error.message);
      }
    }
  };


   useEffect(() => {
    cargarEmpleados();
   }, []);


  // Funciones para abrir y cerrar el Modal
  const handleClose = () => {
    setMostrarModal(false);
    setMensaje({ tipo: "", texto: "" });
  };

  const abrirModalCrear = () => {
  setModoEdicion(false);
  setIdEditando(null);

  setFormData({
    nombre: "",
    correo: "",
    dni: "",
    password: "",
    especialidad: "Instructor",
  });

  setMostrarModal(true);
};

const abrirModalEditar = (emp) => {
  setModoEdicion(true);
  setIdEditando(emp.id_empleado);

  setFormData({
    nombre: emp.nombre,
    correo: emp.correo,
    dni: emp.dni,
    password: "", // Vacía por seguridad
    especialidad: emp.rol_empleado,
  });

  setMostrarModal(true);
};

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar formulario al backend
  const handleSubmit = async (e) => {
  e.preventDefault();
  setMensaje({ tipo: "", texto: "" });


// 1. Validamoas que el correo sea exclusivamente de la empresa
    if (!formData.correo.toLowerCase().endsWith('@fitlogic.com')) {
      setMensaje({ 
        tipo: "danger", 
        texto: "Acceso denegado: Solo se permiten correos institucionales (@fitlogic.com)." 
      });
      return; // Detenemos la ejecución aquí, no va al backend
    }

    // 2. Bloquear la letra 'ñ' por si el navegador no lo atrapa
    if (formData.correo.includes('ñ') || formData.correo.includes('Ñ')) {
      setMensaje({ 
        tipo: "danger", 
        texto: "Los correos electrónicos no pueden contener la letra 'ñ'." 
      });
      return;
    }

  try {
    let respuesta;

    if (modoEdicion) {
      // EDITAR
      respuesta = await editarEmpleadoAdmin(idEditando, formData);
    } else {
      // CREAR
      respuesta = await registrarEmpleadoAdmin(formData);
    }

    setMensaje({
      tipo: "success",
      texto: respuesta.mensaje,
    });

    cargarEmpleados();

    setTimeout(() => {
      handleClose();
    }, 2000);

  } catch (error) {
    setMensaje({
      tipo: "danger",
      texto: error.message,
    });
  }
};

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4>Gestión de roles y accesos internos</h4>
          <Card
            className="text-center mt-2"
            style={{ width: "120px", borderRadius: "10px" }}
          >
            <Card.Body className="p-2">
              <small className="text-muted fw-bold">ACTIVOS</small>
              <h4 className="mb-0 fw-bold">{listaEmpleados.length}</h4>
              {/* Esto lo haremos dinámico después */}
            </Card.Body>
          </Card>
        </div>

        {/* Botón Verde de tu prototipo */}
        <Button
          style={{
            backgroundColor: "#28A745",
            border: "none",
            borderRadius: "20px",
            padding: "10px 20px",
          }}
          onClick={abrirModalCrear}
        >
          <i className="bi bi-person-plus"></i> Registrar Trabajador
        </Button>
      </div>

      {/* Tabla estática por ahora (la llenaremos con la BD después) */}
      <Card className="shadow-sm border-0" style={{ borderRadius: "15px" }}>
        <Card.Body>
          <Table hover responsive className="align-middle">
            <thead className="text-muted">
              <tr>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>CORREO INSTITUCIONAL</th>
                <th>ROL</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
                <tbody> 
    {listaEmpleados.length === 0 ? (
    <tr>
      <td colSpan="5" className="text-center text-muted py-4">
        Aún no hay empleados registrados en la tabla.
      </td>
    </tr>
  ) : (
    listaEmpleados.map((emp) => (
      <tr key={emp.id_empleado}>
        <td className="text-muted">#{emp.id_empleado}</td>
        <td className="fw-bold">{emp.nombre}</td>
        <td>{emp.correo}</td>

        <td>
          <span
            style={{
              backgroundColor: "#c6ff00",
              color: "#000",
              padding: "3px 8px",
              borderRadius: "10px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {emp.rol_empleado.toUpperCase()}
          </span>
        </td>

        <td>
          <Button variant="outline-success" size="sm" className="me-2 fw-bold" onClick={() => abrirModalEditar(emp)}
            >
            ✏️ Editar
          </Button>

          <Button 
            variant="outline-danger" 
            size="sm" 
            className="fw-bold"
            onClick={() => handleEliminar(emp.id_empleado)}
          >
            🗑️ Eliminar
          </Button>
        </td>
      </tr>
    ))
  )}
 </tbody>
</Table>
        </Card.Body>
      </Card>

      {/* VENTANA EMERGENTE (MODAL) PARA NUEVO EMPLEADO */}
      <Modal show={mostrarModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">{modoEdicion ? "Editar Empleado" : "Nuevo Empleado"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {mensaje.texto && (
            <Alert variant={mensaje.tipo}>{mensaje.texto}</Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Nombre :</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">
                Correo Institucional :
              </Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">DNI :</Form.Label>
                  <Form.Control
                    type="text"
                    maxLength="8"
                    name="dni"
                    value={formData.dni}
                    onChange={handleChange}
                    required
                    disabled={modoEdicion} 
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Especialidad :</Form.Label>
                  <Form.Select
                    name="especialidad"
                    value={formData.especialidad}
                    onChange={handleChange}
                  >
                    <option value="Instructor">Instructor</option>
                    <option value="Recepción">Recepción</option>
                    <option value="Limpieza">Limpieza</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Contraseña :</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required={!modoEdicion}
              />
            </Form.Group>

            <div className="d-flex justify-content-between mt-4">
              <Button variant="danger" onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                type="submit"
              style={{
                  backgroundColor: "#28A745",
                  border: "none",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              > 
                  {modoEdicion ? "Guardar Cambios" : "Crear Empleado"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EmpleadosAdmin;
