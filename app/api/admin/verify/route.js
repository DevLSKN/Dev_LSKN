// app/api/admin/verify/route.js
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('x-auth-user');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const userData = JSON.parse(authHeader);
    if (!userData || userData.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'No autorizado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await dbConnect();
    const user = await User.findOne({ username: userData.username, role: 'admin' });

    if (!user) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en verificación:', error);
    return new Response(JSON.stringify({ error: 'Error en verificación' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}