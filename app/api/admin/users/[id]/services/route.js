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
        status: 404 
      });
    }

    const newService = new Service({
      userId: id,
      servicio: serviceData.servicio,
      estado: 'activo',
    });

    await newService.save();

    // Actualizar el usuario con el nuevo servicio
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $push: { services: newService._id } },
      { new: true }
    ).populate('services');

    return new Response(JSON.stringify({ 
      success: true, 
      service: newService,
      user: updatedUser
    }), { 
      status: 201 
    });
  } catch (error) {
    console.error('Error al crear servicio:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Error al crear el servicio' 
    }), { 
      status: 500 
    });
  }
}