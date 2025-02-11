// /app/api/services/contratar/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';
import User from '@/models/User';

const normalizeServiceName = (serviceName) => {
  if (!serviceName) return null;
  
  const serviceNameUpper = serviceName.toUpperCase();
  if (serviceNameUpper.includes('BONO10') || serviceNameUpper.includes('BONO (10)')) 
    return 'BONO (10 DAY PASS)';
  if (serviceNameUpper.includes('BONO5') || serviceNameUpper.includes('BONO (5)')) 
    return 'BONO (5 DAY PASS)';
  if (serviceNameUpper.includes('DAYPASS') || serviceNameUpper === 'DAY') 
    return 'DAY PASS';
  
  return serviceName;
};

export async function POST(req) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { username, serviceName } = body;

    console.log('Datos recibidos:', { username, serviceName });

    if (!username || !serviceName) {
      console.log('Faltan datos requeridos');
      return NextResponse.json(
        { error: 'Username y serviceName son requeridos' },
        { status: 400 }
      );
    }

    // Verificar que el usuario existe
    const user = await User.findOne({ username });
    if (!user) {
      console.log('Usuario no encontrado:', username);
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    const db = mongoose.connection.db;
    const normalizedServiceName = normalizeServiceName(serviceName);
    console.log('Nombre de servicio normalizado:', normalizedServiceName);

    // Crear el nuevo servicio
    const newService = {
      username,
      servicio: normalizedServiceName,
      createdAt: new Date(),
      usos: []
    };

    const result = await db.collection('user_service').insertOne(newService);
    console.log('Resultado de inserción:', result);

    if (!result.insertedId) {
      throw new Error('No se pudo insertar el servicio');
    }

    // Obtener el servicio creado
    const createdService = await db.collection('user_service').findOne({
      _id: result.insertedId
    });

    console.log('Servicio creado:', createdService);

    return NextResponse.json({
      message: 'Servicio contratado correctamente',
      service: {
        ...createdService,
        _id: createdService._id.toString()
      }
    });

  } catch (error) {
    console.error('Error detallado al contratar servicio:', error);
    return NextResponse.json(
      { error: error.message || 'Error al contratar el servicio' },
      { status: 500 }
    );
  }
}