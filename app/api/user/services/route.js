// /app/api/user/services/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET(req) {
  try {
    await dbConnect();
    
    const username = req.nextUrl.searchParams.get('username');
    console.log('Buscando servicios para usuario:', username);

    if (!username) {
      return NextResponse.json(
        { error: 'Username es requerido' },
        { status: 400 }
      );
    }

    const db = mongoose.connection.db;
    const services = await db.collection('user_service')
      .find({ username: username })
      .sort({ createdAt: -1 })
      .toArray();

    // Log para debug
    console.log('Servicios encontrados:', JSON.stringify(services, null, 2));

    const formattedServices = services.map(service => ({
      _id: service._id.toString(),
      servicio: service.servicio,
      createdAt: service.createdAt instanceof Date 
        ? service.createdAt.toISOString() 
        : new Date(service.createdAt).toISOString(),
      usos: Array.isArray(service.usos) ? service.usos.map(uso => ({
        fecha: uso.fecha instanceof Date 
          ? uso.fecha.toISOString() 
          : new Date(uso.fecha).toISOString()
      })) : []
    }));

    console.log('Servicios formateados:', JSON.stringify(formattedServices, null, 2));
    
    return NextResponse.json({ services: formattedServices });

  } catch (error) {
    console.error('Error al obtener servicios:', error);
    return NextResponse.json(
      { error: 'Error al obtener el historial de servicios' },
      { status: 500 }
    );
  }
}