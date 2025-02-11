// app/api/admin/users/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import mongoose from 'mongoose';

export async function GET(req) {
  try {
    await dbConnect();

    // 1. Obtener todos los usuarios (excepto admin)
    const users = await User.find({ role: { $ne: 'admin' } })
      .select('-password')
      .lean();  // Convertir a objetos planos

    // 2. Obtener servicios para todos los usuarios
    const db = mongoose.connection.db;
    const servicesCollection = db.collection('user_service');

    // 3. Obtener todos los servicios de una vez
    const allServices = await servicesCollection.find({}).toArray();

    // 4. Agrupar servicios por username
    const servicesByUsername = allServices.reduce((acc, service) => {
      if (!acc[service.username]) {
        acc[service.username] = [];
      }
      acc[service.username].push(service);
      return acc;
    }, {});

    // 5. Añadir servicios a cada usuario
    const usersWithServices = users.map(user => ({
      ...user,
      services: servicesByUsername[user.username] || []
    }));

    // 6. Ordenar por fecha de creación
    usersWithServices.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    console.log('Usuarios con servicios:', usersWithServices);

    return NextResponse.json({ users: usersWithServices });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}