'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Package, Activity, UserPlus, Download, Edit, X, Plus, Save } from 'lucide-react';
import * as XLSX from 'xlsx';

// Componente StatCard
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <div className="text-gray-400">{icon}</div>
    </div>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

// Componente UserDetailsModal
const UserDetailsModal = ({ user, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(user);
  const [showAddService, setShowAddService] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
// En el componente UserDetailsModal, modificar la sección de servicios
const handleCancelService = async (serviceId) => {
  if (window.confirm('¿Estás seguro de que quieres dar de baja este servicio?')) {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/services/${serviceId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        window.alert('Servicio dado de baja correctamente');
        const updatedUser = await fetch(`/api/admin/users/${user._id}`).then(res => res.json());
        setSelectedUser(updatedUser.user);
        onUpdate();
      } else {
        window.alert(data.error || 'Error al dar de baja el servicio');
      }
    } catch (error) {
      console.error('Error al dar de baja servicio:', error);
      window.alert('Error al dar de baja el servicio');
    } finally {
      setIsLoading(false);
    }
  }
};

// Modificar el renderizado de cada servicio para incluir el botón de baja
{isActive && !service.cancelAtPeriodEnd && (
  <div className="flex gap-2">
    <button
      onClick={() => handleCancelService(service._id)}
      className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
      disabled={isLoading}
    >
      Dar de baja
    </button>
  </div>
)}
  const handleSave = async () => {
  try {
    setIsLoading(true);
    const response = await fetch(`/api/admin/users/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData)
    });

    const data = await response.json();

    if (response.ok && data.success) {
      window.alert('Usuario actualizado correctamente');
      // Actualizar el estado local con los datos actualizados
      onUpdate();  // Para actualizar la lista de usuarios
      // Actualizar el usuario seleccionado con los nuevos datos
      setSelectedUser(data.user);  
      setIsEditing(false);
    } else {
      window.alert(data.error || 'Error al actualizar el usuario');
    }
  } catch (error) {
    console.error('Error al actualizar:', error);
    window.alert('Error al actualizar el usuario');
  } finally {
    setIsLoading(false);
  }
};

  const handleCancelService = async (serviceId) => {
    if (window.confirm('¿Estás seguro de que quieres cancelar este servicio?')) {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/admin/services/${serviceId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const data = await response.json();

        if (response.ok && data.success) {
          window.alert('Servicio cancelado correctamente');
          onUpdate();
        } else {
          window.alert(data.error || 'Error al cancelar el servicio');
        }
      } catch (error) {
        console.error('Error al cancelar servicio:', error);
        window.alert('Error al cancelar el servicio');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getUsosMaximos = (serviceName) => {
    if (!serviceName) return null;
    const nameUpper = serviceName.toUpperCase();
    
    if (nameUpper.includes('BONO (10)') || nameUpper.includes('BONO10') || nameUpper.includes('BONO (10 DAY PASS)')) return 10;
    if (nameUpper.includes('BONO (5)') || nameUpper.includes('BONO5') || nameUpper.includes('BONO (5 DAY PASS)')) return 5;
    if (nameUpper.includes('DAY PASS') || nameUpper === 'DAYPASS') return 1;
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header del Modal */}
        <div className="sticky top-0 bg-white border-b px-4 md:px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-bold">Detalles del Usuario</h2>
          <div className="flex gap-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
                disabled={isLoading}
              >
                <Edit className="w-4 h-4" />
                Editar
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2"
                  disabled={isLoading}
                >
                  <Save className="w-4 h-4" />
                  Guardar
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                  disabled={isLoading}
                >
                  Cancelar
                </button>
              </>
            )}
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600"
              disabled={isLoading}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
		{/* Contenido del Modal - Información Personal */}
        <div className="p-4 md:p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-xl font-semibold mb-4">Información Personal</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {isEditing ? (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Usuario</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded bg-gray-100"
                      value={editedData.username}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full p-2 border rounded"
                      value={editedData.email}
                      onChange={(e) => setEditedData({...editedData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Nombre</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={editedData.nombre}
                      onChange={(e) => setEditedData({...editedData, nombre: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Apellidos</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={editedData.apellidos}
                      onChange={(e) => setEditedData({...editedData, apellidos: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Teléfono</label>
                    <input
                      type="tel"
                      className="w-full p-2 border rounded"
                      value={editedData.telefono}
                      onChange={(e) => setEditedData({...editedData, telefono: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Dirección</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={editedData.direccion}
                      onChange={(e) => setEditedData({...editedData, direccion: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Fecha de Nacimiento</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={editedData.fechaNacimiento || ''}
                      onChange={(e) => setEditedData({...editedData, fechaNacimiento: e.target.value})}
                      placeholder="DD/MM/AAAA"
                    />
                  </div>
                </>
              ) : (
                <>
                  <p><span className="font-medium">Usuario:</span> {user?.username}</p>
                  <p><span className="font-medium">Email:</span> {user?.email}</p>
                  <p><span className="font-medium">Nombre:</span> {user?.nombre}</p>
                  <p><span className="font-medium">Apellidos:</span> {user?.apellidos}</p>
                  <p><span className="font-medium">Teléfono:</span> {user?.telefono}</p>
                  <p><span className="font-medium">Dirección:</span> {user?.direccion}</p>
                  <p><span className="font-medium">Fecha de Nacimiento:</span> {user?.fechaNacimiento || 'No especificada'}</p>
                </>
              )}
            </div>
          </div>

          {/* Sección de Servicios */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Servicios Contratados</h3>
              <button
                onClick={() => setShowAddService(true)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2"
                disabled={isLoading}
              >
                <Plus className="w-4 h-4" />
                Añadir Servicio
              </button>
            </div>

            {/* Lista de Servicios */}
            {Array.isArray(user?.services) && user.services.length > 0 ? (
              <div className="space-y-4">
                {[...user.services]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((service, index) => {
                    const usosMaximos = getUsosMaximos(service.servicio);
                    const usosActuales = service.usos?.length || 0;
                    const isActive = service.estado === 'activo';

                    return (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold">{service.servicio}</h4>
                            <p className="text-sm text-gray-500">
                              Contratado el {formatDate(service.createdAt)}
                            </p>
                            {service.subscriptionId && (
                              <p className="text-sm text-blue-500">
                                Suscripción activa
                              </p>
                            )}
                            {service.estado === 'cancelado' && (
                              <p className="text-sm text-red-500">
                                Servicio cancelado
                              </p>
                            )}
                          </div>
                          <div className="flex items-start gap-2">
                            {usosMaximos && (
                              <span className={`px-3 py-1 rounded-full text-sm ${
                                usosActuales < usosMaximos ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {usosActuales} de {usosMaximos} usos
                              </span>
                            )}
                            {isActive && !service.cancelAtPeriodEnd && (
                              <button
                                onClick={() => handleCancelService(service._id)}
                                className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
                                disabled={isLoading}
                              >
                                Cancelar
                              </button>
                            )}
                          </div>
                        </div>
                        
                        {/* Historial de Usos */}
                        {Array.isArray(service.usos) && service.usos.length > 0 && (
                          <div className="mt-3">
                            <h5 className="font-medium text-sm mb-2">Historial de Usos</h5>
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                              {service.usos.map((uso, idx) => (
                                <div key={idx} className="bg-white p-2 rounded text-sm flex justify-between items-center">
                                  <span>Uso {idx + 1}</span>
                                  <span className="text-gray-500">{formatDate(uso.fecha)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No hay servicios contratados</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal para Añadir Servicio */}
      {showAddService && (
        <AddServiceModal
          userId={user._id}
          onClose={() => setShowAddService(false)}
          onAdd={onUpdate}
        />
      )}
    </div>
  );
};

// Componente AddServiceModal
const AddServiceModal = ({ userId, onClose, onAdd }) => {
  const [newService, setNewService] = useState({
    servicio: '',
    estado: 'activo'
  });
  const [isLoading, setIsLoading] = useState(false);

  // Componente AddServiceModal modificado
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!newService.servicio) {
    window.alert('Por favor, selecciona un servicio');
    return;
  }

  try {
    setIsLoading(true);
    const response = await fetch(`/api/admin/users/${userId}/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        servicio: newService.servicio,
        estado: 'activo',
        createdAt: new Date().toISOString()
      })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      window.alert('Servicio añadido correctamente');
      await onAdd();  // Esperar a que se actualicen los datos
      onClose();
    } else {
      window.alert(data.error || 'Error al añadir el servicio');
    }
  } catch (error) {
    console.error('Error al añadir servicio:', error);
    window.alert('Error al añadir el servicio');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Añadir Servicio</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={isLoading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Servicio</label>
            <select
              className="w-full p-2 border rounded"
              value={newService.servicio}
              onChange={(e) => setNewService({...newService, servicio: e.target.value})}
              required
              disabled={isLoading}
            >
              <option value="">Seleccionar servicio</option>
              <option value="DAY PASS">Day Pass</option>
              <option value="BONO (5 DAY PASS)">Bono 5 Usos</option>
              <option value="BONO (10 DAY PASS)">Bono 10 Usos</option>
              <option value="MENSUALIDAD">Mensualidad</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Añadiendo...</span>
                </>
              ) : (
                <span>Añadir</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
function DashboardPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [verificationAttempted, setVerificationAttempted] = useState(false);
  const [serviceFilter, setServiceFilter] = useState('');
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeServices: 0,
    todayUses: 0,
    newWeekUsers: 0
  });

  // Calcular estadísticas
  const calculateStats = (users) => {
    const now = new Date();
    const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    
    const activeServices = users.reduce((sum, user) => 
      sum + (user.services?.filter(s => s.estado === 'activo').length || 0), 0);

    const todayUses = users.reduce((sum, user) => 
      sum + (user.services?.reduce((uses, service) => 
        uses + (service.usos?.filter(uso => 
          new Date(uso.fecha).toDateString() === now.toDateString()
        ).length || 0), 0) || 0), 0);

    const newWeekUsers = users.filter(user => 
      new Date(user.createdAt) > weekAgo).length;

    setStats({
      totalUsers: users.length,
      activeServices,
      todayUses,
      newWeekUsers
    });
  };

  // Exportar a Excel
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    
    // Datos de usuarios
    const userData = filteredUsers.map(user => ({
      Username: user.username,
      Email: user.email,
      Nombre: user.nombre,
      Apellidos: user.apellidos,
      Teléfono: user.telefono,
      Dirección: user.direccion,
      "Fecha de Nacimiento": user.fechaNacimiento || "No especificada",
      "Total Servicios": user.services?.filter(s => s.estado === 'activo').length || 0,
      "Fecha de Registro": new Date(user.createdAt).toLocaleDateString('es-ES')
    }));

    // Datos de servicios
    const serviceData = [];
    filteredUsers.forEach(user => {
      user.services?.forEach(service => {
        const usos = service.usos || [];
        const usosMaximos = service.servicio.includes('10') ? 10 :
                          service.servicio.includes('5') ? 5 :
                          service.servicio.includes('DAY PASS') ? 1 : null;
                          
        const baseServiceData = {
          Username: user.username,
          'Nombre Completo': `${user.nombre} ${user.apellidos}`,
          Servicio: service.servicio,
          Estado: service.estado,
          'Fecha Contratación': new Date(service.createdAt).toLocaleDateString('es-ES'),
          'Total Usos': usos.length,
          'Usos Restantes': usosMaximos ? usosMaximos - usos.length : 'N/A'
        };

        if (usos.length === 0) {
          serviceData.push({
            ...baseServiceData,
            'Número de Uso': 'N/A',
            'Fecha de Uso': 'Sin usos'
          });
        } else {
          usos.forEach((uso, index) => {
            serviceData.push({
              ...baseServiceData,
              'Número de Uso': index + 1,
              'Fecha de Uso': new Date(uso.fecha).toLocaleString('es-ES')
            });
          });
        }
      });
    });

    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(userData), "Usuarios");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(serviceData), "Servicios y Usos");
    XLSX.writeFile(workbook, `laiesken_datos_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // Formatear fecha
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filtrar usuarios
  useEffect(() => {
    if (Array.isArray(users) && users.length > 0) {
      let filtered = users;
      
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter(user => 
          user?.username?.toLowerCase().includes(searchLower) ||
          user?.email?.toLowerCase().includes(searchLower) ||
          user?.nombre?.toLowerCase().includes(searchLower) ||
          user?.apellidos?.toLowerCase().includes(searchLower) ||
          `${user?.nombre} ${user?.apellidos}`.toLowerCase().includes(searchLower)
        );
      }
      
      if (serviceFilter) {
        const filterLower = serviceFilter.toLowerCase();
        filtered = filtered.filter(user => 
          user.services?.some(service => 
            service.servicio.toLowerCase().includes(filterLower) &&
            service.estado === 'activo'
          )
        );
      }

      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  }, [searchTerm, serviceFilter, users]);

  // Cargar usuarios
  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/users', {
        headers: {
          'x-auth-user': localStorage.getItem('currentUser')
        }
      });

      if (response.ok) {
        const data = await response.json();
        const usersData = Array.isArray(data.users) ? data.users : [];
        setUsers(usersData);
        setFilteredUsers(usersData);
        calculateStats(usersData);
      } else {
        console.error('Error en la respuesta:', response.status);
        setUsers([]);
        setFilteredUsers([]);
        if (response.status === 401) {
          window.location.href = '/';
        }
      }
    } catch (error) {
      console.error('Error loading users:', error);
      setUsers([]);
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Verificar admin y cargar datos iniciales
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const savedUser = localStorage.getItem('currentUser');
        if (!savedUser) {
          window.location.href = '/';
          return;
        }

        const user = JSON.parse(savedUser);
        if (user.role !== 'admin') {
          window.location.href = '/';
          return;
        }

        const response = await fetch('/api/admin/verify', {
          headers: {
            'x-auth-user': savedUser
          }
        });

        if (!response.ok) {
          throw new Error('Verificación fallida');
        }

        setIsAuthorized(true);
        await loadUsers();
      } catch (error) {
        console.error('Error verificando admin:', error);
        window.location.href = '/';
      } finally {
        setVerificationAttempted(true);
      }
    };

    if (!verificationAttempted) {
      checkAdmin();
    }
  }, [verificationAttempted]);

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  };

  // Pantalla de carga
  if (!verificationAttempted || loading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Verificando acceso...</h2>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Usuarios"
            value={stats.totalUsers}
            icon={<User className="w-5 h-5" />}
          />
          <StatCard 
            title="Servicios Activos"
            value={stats.activeServices}
            icon={<Package className="w-5 h-5" />}
          />
          <StatCard 
            title="Usos Hoy"
            value={stats.todayUses}
            icon={<Activity className="w-5 h-5" />}
          />
          <StatCard 
            title="Nuevos Esta Semana"
            value={stats.newWeekUsers}
            icon={<UserPlus className="w-5 h-5" />}
          />
        </div>

        {/* Panel Principal */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          {/* Header y Controles */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Panel de Administración</h1>
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg w-full md:w-auto"
              >
                <option value="">Todos los servicios</option>
                <option value="day pass">Day Pass</option>
                <option value="bono">Bonos</option>
                <option value="mensualidad">Mensualidad</option>
              </select>
              <input
                type="text"
                placeholder="Buscar usuarios..."
                className="px-4 py-2 border rounded-lg w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={exportToExcel}
                  className="flex-1 md:flex-none px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 
                           transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  <span className="hidden md:inline">Exportar</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 md:flex-none px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                           transition-colors"
                >
                  <span className="hidden md:inline">Cerrar Sesión</span>
                  <span className="md:hidden">Salir</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tabla de Usuarios */}
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Cargando usuarios...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Servicios Activos
                    </th>
                    <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.nombre} {user.apellidos}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {user.services?.filter(s => s.estado === 'activo').length || 0} servicios
                          </span>
                          {user.services?.length > 0 && (
                            <span className="text-sm text-gray-500">
                              Último: {formatDate(user.services[user.services.length - 1].createdAt)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                        >
                          Ver Detalles
						  </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalles de Usuario */}
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdate={loadUsers}
        />
      )}
    </div>
  );
}

// Exportar el componente
export default DashboardPage;