// app/api/admin/services/[id]/use/route.js
export async function POST(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const service = await Service.findById(id);
    if (!service) {
      return new Response(JSON.stringify({ error: 'Servicio no encontrado' }), { 
        status: 404 
      });
    }

    // Añadir nuevo uso
    service.usos.push({ fecha: new Date() });
    await service.save();

    // Obtener usuario actualizado
    const user = await User.findOne({ username: service.username }).populate('services');

    return new Response(JSON.stringify({ 
      success: true, 
      service,
      user
    }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500 
    });
  }
}