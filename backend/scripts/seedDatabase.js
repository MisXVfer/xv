const mongoose = require('mongoose');
require('dotenv').config();
const Guest = require('../models/Guest');

// Lista de invitados - REEMPLAZA CON TUS INVITADOS REALES
const guestsData = [
  { codigo: 'FER001', nombre: 'Familia Urbina', numeroPersonas: 4 },
  { codigo: 'FER002', nombre: 'Magda Lopez', numeroPersonas: 1 },
  { codigo: 'FER003', nombre: 'Yolanda Villalta', numeroPersonas: 1 },
  { codigo: 'FER004', nombre: 'Paty Saravia', numeroPersonas: 1 },
  { codigo: 'FER005', nombre: 'Familia Rodas Saravia', numeroPersonas: 4 },
  { codigo: 'FER006', nombre: 'Familia Alvarado Perez', numeroPersonas: 6 },
  { codigo: 'FER007', nombre: 'Jimena Gatica', numeroPersonas: 1 },
  { codigo: 'FER008', nombre: 'Familia Peralta Cedillo', numeroPersonas: 3 },
  { codigo: 'FER009', nombre: 'Marvin Peralta y Aryery', numeroPersonas: 2 },
  { codigo: 'FER010', nombre: 'Carlos Davila y Familia', numeroPersonas: 3 },
  { codigo: 'FER011', nombre: 'Sergio Davila y Sandra Villata', numeroPersonas: 2 },
  { codigo: 'FER012', nombre: 'Familia Saravia Aguilar', numeroPersonas: 4 },
  { codigo: 'FER013', nombre: 'Melannie Saravia y familia', numeroPersonas: 2 },
  { codigo: 'FER014', nombre: 'Nery Aguilar y Familia', numeroPersonas: 4 },
  { codigo: 'FER015', nombre: 'Gisela Morataya y familia', numeroPersonas: 4 },
  { codigo: 'FER016', nombre: 'Heidy Cabrera y familia', numeroPersonas: 4 },
  { codigo: 'FER017', nombre: 'Asusena Reynoso', numeroPersonas: 1 },
  { codigo: 'FER018', nombre: 'Welfred Mendez', numeroPersonas: 1 },
  { codigo: 'FER019', nombre: 'Albin Rivas y Familia', numeroPersonas: 3 },
  { codigo: 'FER020', nombre: 'Lucrecia Vasquez y Familia', numeroPersonas: 2 },
  { codigo: 'FER021', nombre: 'Elvia Ardon y familia', numeroPersonas: 3 },
  { codigo: 'FER022', nombre: 'Walter Reihard y Esposa', numeroPersonas: 2 },
  { codigo: 'FER023', nombre: 'Gerson Aroche y Familia', numeroPersonas: 4 },
  { codigo: 'FER024', nombre: 'Luis Garcia y Familia', numeroPersonas: 4 },
  { codigo: 'FER025', nombre: 'Doris Ajin', numeroPersonas: 2 },
  { codigo: 'FER026', nombre: 'Griselda Villalta', numeroPersonas: 1 },
  { codigo: 'FER027', nombre: 'Jose Solis y Familia', numeroPersonas: 2 },
  { codigo: 'FER028', nombre: 'Viviana Gonzalez y familia', numeroPersonas: 4 },
  { codigo: 'FER029', nombre: 'Exaldina Arrega', numeroPersonas: 3 },
  { codigo: 'FER030', nombre: 'Claudia Urbina y Familia', numeroPersonas: 5 },
  { codigo: 'FER031', nombre: 'Carlos Saravia y familia', numeroPersonas: 3 },
  { codigo: 'FER032', nombre: 'Erick Saravia', numeroPersonas: 2 },
  { codigo: 'FER033', nombre: 'Carlos Urbina y Familia', numeroPersonas: 4 },
  { codigo: 'FER034', nombre: 'Sergio Rivera y familia', numeroPersonas: 4 },
  { codigo: 'FER035', nombre: 'Fredy Villata', numeroPersonas: 1 },
  { codigo: 'FER036', nombre: 'Carlos Villalta', numeroPersonas: 1 },
  { codigo: 'FER037', nombre: 'Luis Chopen y familia', numeroPersonas: 3 },
  { codigo: 'FER038', nombre: 'Lorena de Gonzales y familia', numeroPersonas: 4 },
  { codigo: 'FER039', nombre: 'Brenda y familia', numeroPersonas: 3 },
  { codigo: 'FER040', nombre: 'Eycer Cabrera', numeroPersonas: 1 },
  { codigo: 'FER041', nombre: 'Boris', numeroPersonas: 1 },
  { codigo: 'FER042', nombre: 'Javier', numeroPersonas: 1 },
  { codigo: 'FER043', nombre: 'Fernanda Quezada', numeroPersonas: 1 },
  { codigo: 'FER044', nombre: 'Ayleen Chopen', numeroPersonas: 1 },
  { codigo: 'FER045', nombre: 'Sara Estrada', numeroPersonas: 1 },
  { codigo: 'FER046', nombre: 'Dulce Peralta', numeroPersonas: 1 },
  { codigo: 'FER047', nombre: 'Marjorie Estrada', numeroPersonas: 1 },
  { codigo: 'FER048', nombre: 'Gustavo Barrientes', numeroPersonas: 1 },
  { codigo: 'FER049', nombre: 'Oscar Chitay', numeroPersonas: 1 },
  { codigo: 'FER050', nombre: 'Jimena Ardon', numeroPersonas: 1 },
  { codigo: 'FER051', nombre: 'Isabela Ardon', numeroPersonas: 1 },
  { codigo: 'FER052', nombre: 'Adi Gonzales', numeroPersonas: 1 },
  { codigo: 'FER053', nombre: 'Jimena Rodríguez', numeroPersonas: 1 },
  { codigo: 'FER054', nombre: 'Faby Batres', numeroPersonas: 1 },
  { codigo: 'FER055', nombre: 'Breanna Cáceres', numeroPersonas: 1 },
  { codigo: 'FER056', nombre: 'Dulce Salazar', numeroPersonas: 1 },
  { codigo: 'FER057', nombre: 'Tyra Valenzuela', numeroPersonas: 1 },
  { codigo: 'FER058', nombre: 'Madyson Coy', numeroPersonas: 1 },
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
