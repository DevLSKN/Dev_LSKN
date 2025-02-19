// app/api/admin/users/[id]/services/route.js
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Service from '@/models/Service';

export async function POST(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const serviceData = await request.json();

    const user = await User.findById(id);
    if (!user) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Crear el nuevo servicio
    const newService = new Service({
      username: user.username,
      servicio: serviceData.servicio,
      estado: 'activo',
      createdAt: new Date(),
      usos: []
    });

    await newService.save();

    // Añadir el servicio al usuario
    user.services.push(newService._id);
    await user.save();

    // Obtener el usuario actualizado con servicios
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
    console.error('Error al añadir servicio:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}