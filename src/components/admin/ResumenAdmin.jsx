import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { obtenerMetricasDashboard } from '../../services/adminDashboardApi';

// Importaciones necesarias de Chart.js para que react-chartjs-2 funcione correctamente
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Registramos los componentes en Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ResumenAdmin = ({ rol }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dataDashboard, setDataDashboard] = useState(null);

  useEffect(() => {
    const cargarMétricas = async () => {
      try {
        setLoading(true);
        const data = await obtenerMetricasDashboard(rol);
        setDataDashboard(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargarMétricas();
  }, [rol]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-2 text-muted">Cargando estadísticas del centro...</p>
      </div>
    );
  }

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!dataDashboard) return null;

  const { tarjetas, grafico_ingresos } = dataDashboard;

  // CONFIGURACIÓN DEL GRÁFICO DE LÍNEAS (Solo para Administrador)
  const fechasGrafico = grafico_ingresos?.map(g => g.fecha) || [];
  const totalesGrafico = grafico_ingresos?.map(g => g.total) || [];

  const chartData = {
    labels: fechasGrafico,
    datasets: [
      {
        label: 'Ingresos Caja (S/.)',
        data: totalesGrafico,
        fill: true,
        backgroundColor: 'rgba(0, 200, 83, 0.1)',
        borderColor: '#00c853',
        pointBackgroundColor: '#00c853',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#00c853',
        tension: 0.3, // Curvatura de la línea
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#eaeaea' },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div>
      {/* SECCIÓN DE TARJETAS INFORMATIVAS */}
      <Row className="g-4 mb-5">
        <Col md={6} lg={3}>
          <Card className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
            <Card.Body className="p-4">
              <div className="text-muted fw-bold small mb-1">CLIENTES TOTALES</div>
              <h2 className="fw-bold mb-0" style={{ color: '#333' }}>{tarjetas.clientes}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
            <Card.Body className="p-4">
              <div className="text-muted fw-bold small mb-1">MIEMBROS ACTIVOS</div>
              <h2 className="fw-bold mb-0" style={{ color: '#00c853' }}>{tarjetas.activos}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
            <Card.Body className="p-4">
              <div className="text-muted fw-bold small mb-1">
                {rol === '1' ? 'ASISTENCIAS TOTALES' : 'ASISTENCIAS HOY'}
              </div>
              <h2 className="fw-bold mb-0" style={{ color: '#ffa000' }}>
                {rol === '1' ? tarjetas.asistencias : tarjetas.asistencias_hoy}
              </h2>
            </Card.Body>
          </Card>
        </Col>

        {rol === '1' ? (
          <Col md={6} lg={3}>
            <Card className="border-0 shadow-sm" style={{ borderRadius: '12px', backgroundColor: '#1a1a1a', color: '#fff' }}>
              <Card.Body className="p-4">
                <div className="fw-bold small mb-1" style={{ color: '#c6ff00' }}>RECAUDACIÓN MES</div>
                <h2 className="fw-bold mb-0">S/. {parseFloat(tarjetas.pago_mes).toFixed(2)}</h2>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          <Col md={6} lg={3}>
            <Card className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
              <Card.Body className="p-4">
                <div className="text-muted fw-bold small mb-1">RUTINAS CONFIGURADAS</div>
                <h2 className="fw-bold mb-0" style={{ color: '#7b1fa2' }}>{tarjetas.rutinas}</h2>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {/* DETALLES DE MÉTRIQUES COMPLEMENTARIAS PARA EL ADMIN */}
      {rol === '1' && (
        <Row className="g-4">
          <Col lg={8}>
            <Card className="border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
              <h5 className="fw-bold mb-4">📈 Balance de Ingresos Semanales</h5>
              <div style={{ width: '100%', height: '300px' }}>
                <Line data={chartData} options={chartOptions} />
              </div>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="border-0 shadow-sm p-4 h-100" style={{ borderRadius: '15px' }}>
              <h5 className="fw-bold mb-4">⚙️ Resumen del Sistema</h5>
              <div className="d-flex justify-content-between align-items-center mb-3 p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                <span className="fw-semibold text-muted">Personal de Staff</span>
                <span className="badge bg-dark px-3 py-2 fs-6" style={{ borderRadius: '8px' }}>{tarjetas.empleados}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                <span className="fw-semibold text-muted">Planes de Rutina</span>
                <span className="badge bg-secondary px-3 py-2 fs-6" style={{ borderRadius: '8px' }}>{tarjetas.rutinas}</span>
              </div>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ResumenAdmin;