const mongoose = require('mongoose');
require('dotenv').config();
const Guest = require('../models/Guest');

// Lista de invitados - REEMPLAZA CON TUS INVITADOS REALES
const guestsData = [
  { codigo: 'FER001', nombre: 'Juan Pérez', numeroPersonas: 2, mesa: 'A1', telefono: '12345678' },
  { codigo: 'FER002', nombre: 'María García', numeroPersonas: 4, mesa: 'A2', telefono: '87654321' },
  { codigo: 'FER003', nombre: 'Carlos Rodríguez', numeroPersonas: 3, mesa: 'A3' },
  { codigo: 'FER004', nombre: 'Ana López', numeroPersonas: 2, mesa: 'B1' },
  { codigo: 'FER005', nombre: 'Pedro Martínez', numeroPersonas: 5, mesa: 'B2' },
  { codigo: 'FER006', nombre: 'Laura Hernández', numeroPersonas: 3, mesa: 'B3' },
  { codigo: 'FER007', nombre: 'Diego Ramírez', numeroPersonas: 2, mesa: 'C1' },
  { codigo: 'FER008', nombre: 'Sofia Torres', numeroPersonas: 4, mesa: 'C2' },
  { codigo: 'FER009', nombre: 'Roberto Flores', numeroPersonas: 2, mesa: 'C3' },
  { codigo: 'FER010', nombre: 'Carmen Vega', numeroPersonas: 3, mesa: 'D1' },
  // Agrega más invitados aquí con códigos únicos...
];

async function seedDatabase() {
  try {
    console.log('🔄 Conectando a MongoDB Atlas...');
    
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Conectado a MongoDB Atlas');

    // Limpiar la base de datos (opcional - comenta estas líneas si no quieres borrar datos existentes)
    await Guest.deleteMany({});
    console.log('🗑️  Base de datos limpiada');

    // Insertar invitados
    const result = await Guest.insertMany(guestsData);
    console.log(`\n✅ ${result.length} invitados agregados exitosamente\n`);

    // Mostrar todos los invitados agregados
    console.log('📋 Lista de invitados agregados:');
    console.log('═'.repeat(80));
    result.forEach((guest, index) => {
      console.log(`${index + 1}. [${guest.codigo}] ${guest.nombre.padEnd(30)} | ${guest.numeroPersonas} ${guest.numeroPersonas === 1 ? 'persona' : 'personas'} | Mesa: ${guest.mesa || 'N/A'}`);
    });
    console.log('═'.repeat(80));

    await mongoose.connection.close();
    console.log('\n✅ Proceso completado. Base de datos lista para usar.');
    console.log('💡 Ahora puedes iniciar el servidor con: npm run dev\n');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.message.includes('MONGODB_URI')) {
      console.log('\n⚠️  Asegúrate de configurar tu MONGODB_URI en el archivo .env');
      console.log('   Ejemplo: MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/invitation_db\n');
    }
    process.exit(1);
  }
}

seedDatabase();
