const express = require('express');
const router = express.Router();
const Guest = require('../models/Guest');

// Validar invitado por código
router.post('/validate', async (req, res) => {
  try {
    const { codigo } = req.body;
    
    if (!codigo || codigo.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: 'Por favor ingresa tu código' 
      });
    }

    // Búsqueda por código (insensible a mayúsculas)
    const guest = await Guest.findOne({ 
      codigo: codigo.trim().toUpperCase()
    });

    if (!guest) {
      return res.status(404).json({ 
        success: false, 
        message: 'Código no válido. Por favor verifica tu código de invitación' 
      });
    }

    res.json({ 
      success: true, 
      guest: {
        id: guest._id,
        codigo: guest.codigo,
        nombre: guest.nombre,
        numeroPersonas: guest.numeroPersonas,
        confirmado: guest.confirmado,
        mesa: guest.mesa
      }
    });

  } catch (error) {
    console.error('Error validando invitado:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error en el servidor' 
    });
  }
});

// Confirmar asistencia
router.post('/confirm', async (req, res) => {
  try {
    const { guestId, confirmado, telefono, email } = req.body;

    const guest = await Guest.findByIdAndUpdate(
      guestId,
      { 
        confirmado,
        fechaConfirmacion: new Date(),
        telefono: telefono || undefined,
        email: email || undefined
      },
      { new: true }
    );

    if (!guest) {
      return res.status(404).json({ 
        success: false, 
        message: 'Invitado no encontrado' 
      });
    }

    res.json({ 
      success: true, 
      message: confirmado ? '¡Gracias por confirmar tu asistencia!' : 'Lamentamos que no puedas asistir',
      guest 
    });

  } catch (error) {
    console.error('Error confirmando asistencia:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error en el servidor' 
    });
  }
});

// Obtener todos los invitados (para administración)
router.get('/all', async (req, res) => {
  try {
    const guests = await Guest.find().sort({ nombre: 1 });
    res.json({ success: true, guests });
  } catch (error) {
    console.error('Error obteniendo invitados:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error en el servidor' 
    });
  }
});

// Crear nuevo invitado
router.post('/create', async (req, res) => {
  try {
    const { codigo, nombre, numeroPersonas, telefono, email, mesa, notas } = req.body;

    const newGuest = new Guest({
      codigo,
      nombre,
      numeroPersonas,
      telefono,
      email,
      mesa,
      notas
    });

    await newGuest.save();

    res.status(201).json({ 
      success: true, 
      message: 'Invitado creado exitosamente',
      guest: newGuest 
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Este código ya existe' 
      });
    }
    console.error('Error creando invitado:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error en el servidor' 
    });
  }
});

module.exports = router;
