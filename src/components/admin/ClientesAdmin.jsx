import React, { useState, useEffect } from "react";
import { Card, Button, Table, Modal, Form, Alert, Row, Col } from "react-bootstrap";
import { obtenerClientesAdmin, registrarClienteAdmin, editarClienteAdmin, eliminarClienteAdmin } from "../../services/adminClientesApi";

const ClientesAdmin = ({rol}) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [listaClientes, setListaClientes] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const esEmpleado = rol === "2";

  // Estado inicial con todos los campos requeridos por el Backend de Fit Logic
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    dni: "",
    password: "",
    edad: "",
    peso: "",
    altura: "",
    id_objetivo: "",
  });

  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  // Cargar clientes desde la base de datos
  const cargarClientes = async () => {
    try {
      const data = await obtenerClientesAdmin();
      setListaClientes(data);
    } catch (error) {
      console.error("No se pudo cargar la lista de clientes:", error);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  // Eliminar un cliente con confirmación previa
  const handleEliminar = async (id_cliente) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar permanentemente a este cliente? Esta acción no se puede deshacer.")) {
      try {
        await eliminarClienteAdmin(id_cliente);
        cargarClientes();
      } catch (error) {
        alert("Error al eliminar cliente: " + error.message);
      }
    }
  };

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
      edad: "",
      peso: "",
      altura: "",
      id_objetivo: "",
    });
    setMostrarModal(true);
  };

  const abrirModalEditar = (cli) => {
    setModoEdicion(true);
    setIdEditando(cli.id_cliente);
    setFormData({
      nombre: cli.nombre,
      correo: cli.correo,
      dni: cli.dni,
      password: "", // Se envía vacío si no se desea cambiar
      edad: cli.edad || "",
      peso: cli.peso || "",
      altura: cli.altura || "",
      id_objetivo: cli.id_objetivo || "",
    });
    setMostrarModal(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje({ tipo: "", texto: "" });

    try {
      let respuesta;
      
      // Parsear los valores numéricos antes de enviarlos al backend
      const datosAEnviar = {
        ...formData,
        edad: formData.edad ? parseInt(formData.edad) : null,
        peso: formData.peso ? parseFloat(formData.peso) : null,
        altura: formData.altura ? parseInt(formData.altura) : null,
        id_objetivo: formData.id_objetivo ? parseInt(formData.id_objetivo) : null,
      };

      if (modoEdicion) {
        respuesta = await editarClienteAdmin(idEditando, datosAEnviar);
      } else {
        respuesta = await registrarClienteAdmin(datosAEnviar);
      }

      setMensaje({
        tipo: "success",
        texto: respuesta.mensaje || "Operación realizada con éxito.",
      });

      cargarClientes();

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
          <h4>Panel de Control de Clientes</h4>
          <Card className="text-center mt-2" style={{ width: "120px", borderRadius: "10px" }}>
            <Card.Body className="p-2">
              <small className="text-muted fw-bold">CLIENTES</small>
              <h4 className="mb-0 fw-bold">{listaClientes.length}</h4>
            </Card.Body>
          </Card>
        </div>

        <Button
          style={{
            backgroundColor: "#28A745",
            border: "none",
            borderRadius: "20px",
            padding: "10px 20px",
          }}
          onClick={abrirModalCrear}
        >
          <i className="bi bi-person-plus"></i> Registrar Cliente
        </Button>
      </div>

      <Card className="shadow-sm border-0" style={{ borderRadius: "15px" }}>
        <Card.Body>
          <Table hover responsive className="align-middle">
            <thead className="text-muted">
              <tr>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>CORREO</th>
                <th>DNI</th>
                <th>EDAD</th>
                <th>PESO / ALTURA</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {listaClientes.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">
                    No hay clientes registrados en el sistema.
                  </td>
                </tr>
              ) : (
                listaClientes.map((cli) => (
                  <tr key={cli.id_cliente}>
                    <td className="text-muted">#{cli.id_cliente}</td>
                    <td className="fw-bold">{cli.nombre}</td>
                    <td>{cli.correo}</td>
                    <td>{cli.dni}</td>
                    <td>{cli.edad ? `${cli.edad} años` : "-"}</td>
                    <td>
                      {cli.peso ? `${cli.peso} kg` : "-"} / {cli.altura ? `${cli.altura} cm` : "-"}
                    </td>
                    <td>
                      <Button variant="outline-success" size="sm" className="me-2 fw-bold" onClick={() => abrirModalEditar(cli)}>
                        ✏️ Editar
                      </Button>
                    {!esEmpleado && (
                      <Button variant="outline-danger" size="sm" className="fw-bold" onClick={() => handleEliminar(cli.id_cliente)}>
                        🗑️ Eliminar
                      </Button>
                    )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* VENTANA EMERGENTE (MODAL) PARA REGISTRO / EDICIÓN */}
      <Modal show={mostrarModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">{modoEdicion ? "Editar Cliente" : "Nuevo Cliente"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {mensaje.texto && (
            <Alert variant={mensaje.tipo}>{mensaje.texto}</Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Nombre Completo:</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Correo Electrónico:</Form.Label>
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
                  <Form.Label className="fw-bold">DNI:</Form.Label>
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
                  <Form.Label className="fw-bold">Edad:</Form.Label>
                  <Form.Control
                    type="number"
                    name="edad"
                    value={formData.edad}
                    onChange={handleChange}
                    required={modoEdicion} // El PUT de tu compañero lo pide obligatorio
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Campos de Antropometría (Peso y Altura) */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Peso (kg):</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.1"
                    name="peso"
                    value={formData.peso}
                    onChange={handleChange}
                    required={modoEdicion}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Altura (cm):</Form.Label>
                  <Form.Control
                    type="number"
                    name="altura"
                    value={formData.altura}
                    onChange={handleChange}
                    required={modoEdicion}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* NUEVO CAMPO: Selector de Objetivo */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Objetivo Físico:</Form.Label>
              <Form.Select
                name="id_objetivo"
                value={formData.id_objetivo}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un objetivo...</option>
                {/* Asegúrate de que los value coincidan con los id_objetivo de tu base de datos */}
                <option value="1">Hipertrofia</option>
                <option value="4">Pérdida de Peso</option>
                <option value="5">Resistencia</option>
                <option value="6">Mantenimiento/Salud</option> 
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Contraseña:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required={!modoEdicion}
                placeholder={modoEdicion ? "Dejar vacío para no cambiar" : ""}
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
                {modoEdicion ? "Guardar Cambios" : "Crear Cliente"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ClientesAdmin;