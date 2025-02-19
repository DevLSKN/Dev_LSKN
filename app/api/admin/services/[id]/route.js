// app/api/admin/services/[id]/route.js
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';

export async function DELETE(request, { params }) {
  try {
    await dbConnect();  // Usar dbConnect en lugar de connectDB
    const { id } = params;

    const service = await Service.findByIdAndUpdate(
      id,
      { 
        $set: { 
          estado: 'cancelado',
          canceledAt: new Date()
        } 
      },
      { new: true }
    );

    if (!service) {
      return new Response(JSON.stringify({ error: 'Servicio no encontrado' }), { 
        status: 404 
      });
    }

    return new Response(JSON.stringify({ success: true, service }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500 
    });
  }
}