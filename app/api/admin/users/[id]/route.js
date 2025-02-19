// app/api/admin/users/[id]/route.js
import dbConnect from '@/lib/mongodb';  // Asegúrate de que esta ruta es correcta
import User from '@/models/User';

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const updateData = await request.json();
    
    // Usar findById primero para validar que el usuario existe
    const user = await User.findById(id);
    if (!user) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Actualizar solo los campos permitidos
    const { password, role, username, ...safeUpdateData } = updateData;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: safeUpdateData },
      { 
        new: true,
        runValidators: true
      }
    ).populate('services');

    return new Response(JSON.stringify({ 
      success: true, 
      user: updatedUser 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Error al actualizar usuario'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}