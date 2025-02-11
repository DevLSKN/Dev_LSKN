export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Aquí deberías verificar el token o la sesión del admin
    // Por ahora, un ejemplo simple:
    const user = req.session?.user; // o como manejes la sesión
    
    if (!user || user.role !== 'admin') {
      return res.status(401).json({ error: 'No autorizado' });
    }

    return res.status(200).json({ message: 'Autorizado' });
  } catch (error) {
    console.error('Error en verificación de admin:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}