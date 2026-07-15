import React, { useState, useEffect } from "react";
import { Card, Button, Table, Modal, Form, Alert, Badge } from "react-bootstrap";
import { obtenerMembresiasAdmin, editarMembresiaAdmin } from "../../services/adminMembresiasApi";

const MembresiasAdmin = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [listaMembresias, setListaMembresias] = useState([]);
  const [idEditando, setIdEditando] = useState(null);

  // Campos mapeados con el backend de Fit Logic
  const [formData, setFormData] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    estado: "Activo",
    tipo: "PREMIUM",
  });

  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  // Cargar membresías registradas en Neon
  const cargarMembresias = async () => {
    try {
      const data = await obtenerMembresiasAdmin();
      setListaMembresias(data);
    } catch (error) {
      console.error("No se pudo cargar la lista de membresías:", error);
    }
  };

  useEffect(() => {
    cargarMembresias();
  }, []);

  const handleClose = () => {
    setMostrarModal(false);
    setMensaje({ tipo: "", texto: "" });
  };

  const abrirModalEditar = (mem) => {
    setIdEditando(mem.id_membresia);
    setFormData({
      fecha_inicio: mem.fecha_inicio || "",
      fecha_fin: mem.fecha_fin || "",
      estado: mem.estado || "Activo",
      tipo: mem.tipo || "PREMIUM",
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
      const respuesta = await editarMembresiaAdmin(idEditando, formData);
      setMensaje({
        tipo: "success",
        texto: respuesta.mensaje || "Membresía actualizada con éxito.",
      });

      cargarMembresias();

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

  // Helper de Bootstrap Badges para cambiar dinámicamente de color según el estado
  const obtenerBadgeEstado = (estado) => {
    switch (estado?.toLowerCase()) {
      case "activo":
        return "success";
      case "vencido":
      case "expirado":
        return "danger";
      case "pendiente":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4>Control de Planes y Suscripciones</h4>
          <Card className="text-center mt-2" style={{ width: "120px", borderRadius: "10px" }}>
            <Card.Body className="p-2">
              <small className="text-muted fw-bold">SUSCRITOS</small>
              <h4 className="mb-0 fw-bold">{listaMembresias.length}</h4>
            </Card.Body>
          </Card>
        </div>
      </div>

      <Card className="shadow-sm border-0" style={{ borderRadius: "15px" }}>
        <Card.Body>
          <Table hover responsive className="align-middle">
            <thead className="text-muted">
              <tr>
                <th>ID MEMBRESÍA</th>
                <th>CLIENTE</th>
                <th>PLAN</th>
                <th>FECHA INICIO</th>
                <th>FECHA FIN</th>
                <th>ESTADO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {listaMembresias.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">
                    No hay registros de membresías en el sistema.
                  </td>
                </tr>
              ) : (
                listaMembresias.map((mem) => (
                  <tr key={mem.id_membresia}>
                    <td className="text-muted">#{mem.id_membresia}</td>
                    <td className="fw-bold">{mem.cliente_nombre || "Sin nombre asignado"}</td>
                    <td>
                      <span
                        style={{
                          backgroundColor: mem.tipo?.toUpperCase() === "PREMIUM" ? "#c6ff00" : "#eaeaea",
                          color: "#000",
                          padding: "4px 10px",
                          borderRadius: "10px",
                          fontSize: "11px",
                          fontWeight: "bold",
                        }}
                      >
                        {mem.tipo?.toUpperCase()}
                      </span>
                    </td>
                    <td>{mem.fecha_inicio}</td>
                    <td>{mem.fecha_fin}</td>
                    <td>
                      <Badge bg={obtenerBadgeEstado(mem.estado)}>
                        {mem.estado?.toUpperCase()}
                      </Badge>
                    </td>
                    <td>
                      <Button variant="outline-success" size="sm" className="fw-bold" onClick={() => abrirModalEditar(mem)}>
                        ⚙️ Actualizar Plan
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* MODAL PARA ACTUALIZAR MEMBRESÍA */}
      <Modal show={mostrarModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Actualizar Membresía</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {mensaje.texto && (
            <Alert variant={mensaje.tipo}>{mensaje.texto}</Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Tipo de Suscripción:</Form.Label>
              <Form.Select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
              >
                <option value="BASICO">BÁSICO</option>
                <option value="ESTÁNDAR">ESTÁNDAR</option>
                <option value="PREMIUM">PREMIUM</option>
                <option value="VIP">VIP</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Estado:</Form.Label>
              <Form.Select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
              >
                <option value="Activo">Activo</option>
                <option value="Vencido">Vencido</option>
                <option value="Pendiente">Pendiente</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Fecha de Inicio:</Form.Label>
              <Form.Control
                type="date"
                name="fecha_inicio"
                value={formData.fecha_inicio}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Fecha de Vencimiento:</Form.Label>
              <Form.Control
                type="date"
                name="fecha_fin"
                value={formData.fecha_fin}
                onChange={handleChange}
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
                Guardar Cambios
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MembresiasAdmin;