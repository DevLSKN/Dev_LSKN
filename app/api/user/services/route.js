// app/api/user/services/route.js
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

    return NextResponse.json({ services: formattedServices });
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    return NextResponse.json(
      { error: 'Error al obtener el historial de servicios' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    
    const data = await request.json();
    console.log('Recibido request para guardar servicio:', data);

    const { username, servicio, createdAt } = data;

    if (!username || !servicio) {
      console.error('Datos incompletos:', { username, servicio });
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    const db = mongoose.connection.db;
    const serviceData = {
      username,
      servicio,
      createdAt: new Date(createdAt || Date.now()),
      usos: []
    };

    console.log('Intentando guardar servicio:', serviceData);
    const result = await db.collection('user_service').insertOne(serviceData);
    console.log('Servicio guardado con éxito:', result);

    return NextResponse.json({
      success: true,
      message: 'Servicio guardado correctamente',
      serviceId: result.insertedId.toString()
    });
  } catch (error) {
    console.error('Error detallado al guardar servicio:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return NextResponse.json(
      { error: `Error al guardar el servicio: ${error.message}` },
      { status: 500 }
    );
  }
}