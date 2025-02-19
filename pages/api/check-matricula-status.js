// pages/api/check-matricula-status.js
import { connectDB } from '../../utils/db';
import Service from '../../models/Service';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Usuario no especificado' });
  }

  try {
    await connectDB();
    
    // Buscar si el usuario tiene un servicio de matrícula
    const matricula = await Service.findOne({
      username: userId,
      servicio: 'MATRICULA',
      estado: 'activo'
    });

    return res.status(200).json({ 
      hasMatricula: !!matricula,
      createdAt: matricula?.createdAt
    });
  } catch (error) {
    console.error('Error al verificar matrícula:', error);
    return res.status(500).json({ error: 'Error al verificar el estado de la matrícula' });
  }
}