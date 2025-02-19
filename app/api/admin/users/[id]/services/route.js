// app/api/admin/users/[id]/services/route.js
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Service from '@/models/Service';

export async function POST(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const serviceData = await request.json();

    // Verificar si el usuario existe
    const user = await User.findById(id);
    if (!user) {
      return new Response(JSON.stringify({ 
        error: 'Usuario no encontrado' 
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Crear el nuevo servicio
    const newService = new Service({
      username: user.username,  // Asegurarnos de incluir el username
      servicio: serviceData.servicio,
      estado: 'activo',
      createdAt: new Date(),
      usos: []
    });

    // Guardar el servicio
    await newService.save();

    // Actualizar la referencia en el usuario
    await User.findByIdAndUpdate(
      id,
      { $push: { services: newService._id } }
    );

    // Obtener el usuario actualizado con los servicios
    const updatedUser = await User.findById(id).populate('services');

    return new Response(JSON.stringify({
      success: true,
      service: newService,
      user: updatedUser
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error al crear servicio:', error);
    return new Response(JSON.stringify({
      error: error.message || 'Error al crear el servicio'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}