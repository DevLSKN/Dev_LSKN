// app/api/admin/users/[id]/route.js
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function PUT(request, { params }) {
  try {
    await dbConnect();  // Usar dbConnect en lugar de connectDB
    const { id } = params;
    const updateData = await request.json();
    
    // Asegurarnos de no actualizar campos sensibles
    const { password, role, username, ...safeUpdateData } = updateData;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: safeUpdateData },
      { new: true }
    ).populate('services');

    if (!updatedUser) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { 
        status: 404 
      });
    }

    return new Response(JSON.stringify({ success: true, user: updatedUser }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500 
    });
  }
}