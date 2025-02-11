// /app/services/apiServices.js

const apiServices = {
  async fetchUserServices(username) {
    if (!username) {
      throw new Error('Username es requerido');
    }

    try {
      const response = await fetch(`/api/user/services?username=${username}`);
      const responseData = await response.text();
      
      console.log('Raw API Response:', responseData);
      console.log('Response Status:', response.status);

      let data;
      try {
        data = JSON.parse(responseData);
        console.log('Parsed API Response:', data);
      } catch (e) {
        console.error('Error parsing JSON:', e);
        throw new Error('Respuesta del servidor no es JSON válido');
      }

      if (!response.ok) {
        throw new Error(data.error || `Error del servidor: ${response.status}`);
      }

      return data;
    } catch (e) {
      console.error('Error completo en fetchUserServices:', e);
      throw e;
    }
  },

  async contractService(username, serviceName) {
    if (!username || !serviceName) {
      throw new Error('Username y serviceName son requeridos');
    }

    try {
      const response = await fetch('/api/services/contratar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          serviceName
        }),
      });

      const responseData = await response.text();
      console.log('Contract Service Response:', {
        status: response.status,
        statusText: response.statusText,
        body: responseData
      });

      const data = JSON.parse(responseData);
      
      // Verificar explícitamente el éxito
      if (response.ok && data.message === "Servicio contratado correctamente") {
        return {
          success: true,
          data: data
        };
      } else {
        return {
          success: false,
          error: data.error || 'Error al contratar el servicio'
        };
      }
    } catch (e) {
      console.error('Error en contractService:', e);
      return {
        success: false,
        error: e.message || 'Error inesperado al contratar el servicio'
      };
    }
  },

  async useService(serviceId, username) {
    if (!serviceId || !username) {
      throw new Error('ServiceId y username son requeridos');
    }

    try {
      const response = await fetch('/api/services/use', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId,
          username,
          fecha: new Date().toISOString()
        }),
      });

      const responseData = await response.text();
      console.log('Use Service Response:', {
        status: response.status,
        statusText: response.statusText,
        body: responseData
      });

      const data = JSON.parse(responseData);
      if (!response.ok) {
        throw new Error(data.error || `Error al usar servicio: ${response.status}`);
      }
      return data;
    } catch (e) {
      console.error('Error en useService:', e);
      throw e;
    }
  }
};

export default apiServices;