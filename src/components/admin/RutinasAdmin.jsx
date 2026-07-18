import React, { useState, useEffect } from "react";
import { Card, Button, Table, Modal, Form, Alert, Badge, Row, Col } from "react-bootstrap";
import { obtenerRutinasAdmin, registrarRutinaAdmin, editarRutinaAdmin, eliminarRutinaAdmin } from "../../services/adminRutinasApi";
import { obtenerClientesAdmin } from "../../services/adminClientesApi";

const RutinasAdmin = ({rol}) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [listaRutinas, setListaRutinas] = useState([]);
  const [listaClientes, setListaClientes] = useState([]); // Cargados dinámicamente
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const esEmpleado = rol === "2";

  const [formData, setFormData] = useState({
    id_cliente: "",
    nivel: "Principiante",
    ejercicios: "",
    duracion: "",
    dia_semana: "Lunes",
  });

  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  // Cargar rutinas guardadas en la base de datos
  const cargarRutinas = async () => {
    try {
      const data = await obtenerRutinasAdmin();
      setListaRutinas(data);
    } catch (error) {
      console.error("Error al cargar rutinas:", error);
    }
  };

  // Cargar clientes para el selector dinámico
  const cargarClientesSelector = async () => {
    try {
      const data = await obtenerClientesAdmin();
      setListaClientes(data);
    } catch (error) {
      console.error("Error al cargar clientes para el selector:", error);
    }
  };

  useEffect(() => {
    cargarRutinas();
    cargarClientesSelector();
  }, []);

  const handleClose = () => {
    setMostrarModal(false);
    setMensaje({ tipo: "", texto: "" });
  };

  const abrirModalCrear = () => {
    setModoEdicion(false);
    setIdEditando(null);
    setFormData({
      id_cliente: listaClientes.length > 0 ? listaClientes[0].id_cliente : "",
      nivel: "Principiante",
      ejercicios: "",
      duracion: "",
      dia_semana: "Lunes",
    });
    setMostrarModal(true);
  };

  const abrirModalEditar = (rut) => {
    setModoEdicion(true);
    setIdEditando(rut.id_rutina);
    setFormData({
      id_cliente: rut.id_cliente || "", 
      nivel: rut.nivel || "Principiante",
      ejercicios: rut.ejercicios || "",
      duracion: rut.duracion || "",
      dia_semana: rut.dia_semana || "Lunes",
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
      if (modoEdicion) {
        // En la edición (PUT), el backend solo espera nivel, ejercicios, duracion, dia_semana
        const datosEdicion = {
          nivel: formData.nivel,
          ejercicios: formData.ejercicios,
          duracion: formData.duracion,
          dia_semana: formData.dia_semana,
        };
        respuesta = await editarRutinaAdmin(idEditando, datosEdicion);
      } else {
        // En la creación (POST), enviamos el objeto completo incluyendo id_cliente parseado
        const datosCreacion = {
          ...formData,
          id_cliente: parseInt(formData.id_cliente),
        };
        respuesta = await registrarRutinaAdmin(datosCreacion);
      }

      setMensaje({
        tipo: "success",
        texto: respuesta.mensaje || "Operación completada con éxito.",
      });

      cargarRutinas();

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

  const handleEliminar = async (id_rutina) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta rutina?")) {
      try {
        await eliminarRutinaAdmin(id_rutina);
        cargarRutinas();
      } catch (error) {
        alert("Error al eliminar rutina: " + error.message);
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4>Administración de Rutinas de Clientes</h4>
          <Card className="text-center mt-2" style={{ width: "120px", borderRadius: "10px" }}>
            <Card.Body className="p-2">
              <small className="text-muted fw-bold">ASIGNADAS</small>
              <h4 className="mb-0 fw-bold">{listaRutinas.length}</h4>
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
          <i className="bi bi-file-earmark-plus"></i> Asignar Rutina
        </Button>
      </div>

      <Card className="shadow-sm border-0" style={{ borderRadius: "15px" }}>
        <Card.Body>
          <Table hover responsive className="align-middle">
            <thead className="text-muted">
              <tr>
                <th>ID</th>
                <th>CLIENTE</th>
                <th>PLAN</th>
                <th>DÍA</th>
                <th>NIVEL</th>
                <th>DURACIÓN</th>
                <th>EJERCICIOS</th>
                <th>ASIGNACIÓN</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {listaRutinas.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center text-muted py-4">
                    No hay rutinas asignadas en el sistema.
                  </td>
                </tr>
              ) : (
                listaRutinas.map((rut) => (
                  <tr key={rut.id_rutina}>
                    <td className="text-muted">#{rut.id_rutina}</td>
                    <td className="fw-bold">{rut.cliente_nombre}</td>
                    <td>
                      <span
                        style={{
                          backgroundColor: rut.membresia_tipo?.toUpperCase() === "PREMIUM" ? "#c6ff00" : "#eaeaea",
                          color: "#000",
                          padding: "3px 8px",
                          borderRadius: "10px",
                          fontSize: "11px",
                          fontWeight: "bold",
                        }}
                      >
                        {rut.membresia_tipo?.toUpperCase() || "BÁSICO"}
                      </span>
                    </td>
                    <td>{rut.dia_semana}</td>
                    <td>
                      <Badge bg={rut.nivel === "Avanzado" ? "danger" : rut.nivel === "Intermedio" ? "warning" : "info"}>
                        {rut.nivel}
                      </Badge>
                    </td>
                    <td>{rut.duracion}</td>
                    <td style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {rut.ejercicios}
                    </td>
                    <td>{rut.fecha_asignacion || "-"}</td>
                    <td>
                      <Button variant="outline-success" size="sm" className="me-2 fw-bold" onClick={() => abrirModalEditar(rut)}>
                        ✏️ Editar
                      </Button>
                    {!esEmpleado && (
                      <Button variant="outline-danger" size="sm" className="fw-bold" onClick={() => handleEliminar(rut.id_rutina)}>
                        🗑️ Borrar
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

      {/* MODAL DE CREACIÓN / EDICIÓN */}
      <Modal show={mostrarModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">{modoEdicion ? "Modificar Rutina" : "Nueva Rutina de Entrenamiento"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {mensaje.texto && (
            <Alert variant={mensaje.tipo}>{mensaje.texto}</Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Seleccionar Cliente:</Form.Label>
                  <Form.Select
                    name="id_cliente"
                    value={formData.id_cliente}
                    onChange={handleChange}
                    disabled={modoEdicion}
                    required
                  >
                    {!modoEdicion && listaClientes.length === 0 && (
                      <option value="">Cargando clientes...</option>
                    )}
                    {listaClientes.map((c) => (
                      <option key={c.id_cliente} value={c.id_cliente}>
                        {c.nombre} (DNI: {c.dni})
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Nivel:</Form.Label>
                  <Form.Select
                    name="nivel"
                    value={formData.nivel}
                    onChange={handleChange}
                    required
                  >
                    <option value="Principiante">Principiante</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Día de la semana:</Form.Label>
                  <Form.Select
                    name="dia_semana"
                    value={formData.dia_semana}
                    onChange={handleChange}
                    required
                  >
                    <option value="Lunes">Lunes</option>
                    <option value="Martes">Martes</option>
                    <option value="Miércoles">Miércoles</option>
                    <option value="Jueves">Jueves</option>
                    <option value="Viernes">Viernes</option>
                    <option value="Sábado">Sábado</option>
                    <option value="Domingo">Domingo</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Duración de la sesión (ej. 45 min, 60 min):</Form.Label>
                  <Form.Control
                    type="text"
                    name="duracion"
                    value={formData.duracion}
                    onChange={handleChange}
                    placeholder="ej. 60 min"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Ejercicios (Detalla las series y repeticiones):</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="ejercicios"
                value={formData.ejercicios}
                onChange={handleChange}
                placeholder="ej.&#10;1. Sentadillas 4x12&#10;2. Press de Banca 4x10&#10;3. Peso Muerto 3x8"
                required
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
                {modoEdicion ? "Guardar Cambios" : "Asignar Rutina"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RutinasAdmin;