// app/api/admin/users/[userId]/services/route.js
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import Service from '@/models/Service';

export async function POST(request, { params }) {
  try {
    const { userId } = params;
    const serviceData = await request.json();
    
    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { 
        status: 404 
      });
    }

    const newService = new Service({
      userId,
      servicio: serviceData.servicio,
      estado: 'activo',
      createdAt: new Date(),
      usos: []
    });

    await newService.save();

    // Actualizar el usuario con el nuevo servicio
    await User.findByIdAndUpdate(
      userId,
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