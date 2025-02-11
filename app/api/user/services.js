import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    // Consulta a la base de datos
    const { rows } = await sql`
      SELECT servicio, fecha, estado
      FROM user_service
      WHERE username = ${username}
      ORDER BY fecha DESC
    `;

    // Transformar los datos para que coincidan con la estructura esperada por el frontend
    const services = rows.map(row => ({
      serviceName: row.servicio,
      purchaseDate: row.fecha,
      status: row.estado || 'activo'
    }));

    return res.status(200).json({ services });
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    return res.status(500).json({ error: 'Error al obtener los servicios' });
  }
}