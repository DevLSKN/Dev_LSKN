import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

export async function POST(req) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { serviceId, username, fecha } = body;

    if (!serviceId || !username || !fecha) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    const db = mongoose.connection.db;
    
    // Primero obtenemos el servicio para verificar
    const service = await db.collection('user_service').findOne({
      _id: new ObjectId(serviceId),
      username: username
    });

    if (!service) {
      return NextResponse.json(
        { error: 'Servicio no encontrado' },
        { status: 404 }
      );
    }

    // Verificar si ya existe el campo usos, si no, crearlo
    const usos = service.usos || [];
    
    // Verificar límite de usos
    const maxUsos = service.servicio.includes('10') ? 10 : 
                   service.servicio.includes('5') ? 5 : 1;
                   
    if (usos.length >= maxUsos) {
      return NextResponse.json(
        { error: 'Se ha alcanzado el límite de usos para este servicio' },
        { status: 400 }
      );
    }

    // Agregar el nuevo uso
    const result = await db.collection('user_service').updateOne(
      { _id: new ObjectId(serviceId) },
      { 
        $push: { 
          usos: { fecha: new Date(fecha) }
        }
      }
    );

    if (result.modifiedCount === 0) {
      throw new Error('No se pudo actualizar el servicio');
    }

    // Obtener el servicio actualizado
    const updatedService = await db.collection('user_service').findOne({
      _id: new ObjectId(serviceId)
    });

    return NextResponse.json({
      message: 'Uso registrado correctamente',
      service: {
        ...updatedService,
        _id: updatedService._id.toString(),
        usos: updatedService.usos || []
      }
    });

  } catch (error) {
    console.error('Error al registrar uso del servicio:', error);
    return NextResponse.json(
      { error: 'Error al registrar el uso del servicio' },
      { status: 500 }
    );
  }
}