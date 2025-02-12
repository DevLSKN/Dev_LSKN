// services/emailService.js
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const emailService = {
  async sendContactForm(data) {
    try {
      const msg = {
        to: 'dev.laiesken@gmail.com', // Email donde recibirás los mensajes
        from: 'laieskentesting@gmail.com', // Email verificado en SendGrid
        subject: `Nuevo mensaje de contacto de ${data.nombre}`,
        template_id: 'd-f98dcf71867f42368179828f9ccf3554',
        dynamic_template_data: {
          nombre: data.nombre,
          email: data.email,
          mensaje: data.mensaje,
          telefono: data.telefono
        }
      };

      await sgMail.send(msg);
      return { success: true };
    } catch (error) {
      console.error('Error sending contact email:', error);
      throw error;
    }
  },

  async sendPasswordReset(email, resetToken) {
    try {
      const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;
      
      const msg = {
        to: email,
        from: 'laieskentesting@gmail.com',
        subject: 'Recuperación de contraseña',
        template_id: 'd-67d25b432a8145c89f1feef3223ec801',
        dynamic_template_data: {
          resetUrl: resetUrl
        }
      };

      await sgMail.send(msg);
      return { success: true };
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }
};

export default emailService;