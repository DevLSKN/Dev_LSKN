import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const user = await User.findById(id);
    if (!user) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener usuario' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const updateData = await request.json();

    // Verificar si el usuario existe
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Evitar actualizar campos sensibles
    const { password, role, username, ...safeUpdateData } = updateData;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: safeUpdateData },
      { new: true, runValidators: true }
    );

    return new Response(JSON.stringify({ success: true, user: updatedUser }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return new Response(JSON.stringify({ error: 'Error al actualizar usuario' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
