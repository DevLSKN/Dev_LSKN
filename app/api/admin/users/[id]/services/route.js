// app/api/admin/users/[id]/services/route.js
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Service from '@/models/Service';

export async function POST(request, { params }) {
  try {
    await dbConnect();  // Usar dbConnect en lugar de connectDB
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
      createdAt: new Date(),
      usos: []
    });

    await newService.save();

    // Actualizar el usuario con el nuevo servicio
    await User.findByIdAndUpdate(
      id,
      { $push: { services: newService._id } }
    );

    return new Response(JSON.stringify({ 
      success: true, 
      service: newService 
    }), { 
      status: 201 
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500 
    });
  }
}