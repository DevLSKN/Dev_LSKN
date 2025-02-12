// components/ui/ContactForm.js
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar mensaje');
      }

      setStatus({ loading: false, error: null, success: true });
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
      
      // Mostrar mensaje de éxito
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      setStatus({ loading: false, error: error.message, success: false });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">Nombre</label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
            className="w-full p-3 rounded bg-black bg-opacity-50 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-white mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full p-3 rounded bg-black bg-opacity-50 text-white"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-white mb-2">Teléfono (opcional)</label>
        <input
          type="tel"
          value={formData.telefono}
          onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
          className="w-full p-3 rounded bg-black bg-opacity-50 text-white"
        />
      </div>
      <div>
        <label className="block text-white mb-2">Mensaje</label>
        <textarea
          value={formData.mensaje}
          onChange={(e) => setFormData(prev => ({ ...prev, mensaje: e.target.value }))}
          className="w-full p-3 rounded bg-black bg-opacity-50 text-white h-32"
          required
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          disabled={status.loading}
          className={`px-8 py-3 rounded ${
            status.loading 
              ? 'bg-gray-500'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition-colors`}
        >
          {status.loading ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
      </div>
      
      {status.error && (
        <div className="text-red-500 text-center mt-4">
          {status.error}
        </div>
      )}
      
      {status.success && (
        <div className="text-green-500 text-center mt-4">
          Mensaje enviado correctamente. Nos pondremos en contacto pronto.
        </div>
      )}
    </form>
  );
};

export default ContactForm;