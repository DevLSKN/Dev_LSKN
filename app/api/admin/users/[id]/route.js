// app/api/admin/users/[id]/route.js
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const updateData = await request.json();
    
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