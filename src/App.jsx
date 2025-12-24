import { useState, useEffect } from 'react'
import InvitationPage from './components/InvitationPage'
import GuestValidation from './components/GuestValidation'
import FloralDecoration from './components/FloralDecoration'

function App() {
  const [isValidated, setIsValidated] = useState(false)
  const [guestData, setGuestData] = useState(null)
  const [showInvitation, setShowInvitation] = useState(false)
  const [musicEnabled, setMusicEnabled] = useState(null)

  // Verificar si ya hay un invitado validado en localStorage
  useEffect(() => {
    const savedGuest = localStorage.getItem('guestData')
    if (savedGuest) {
      const guest = JSON.parse(savedGuest)
      setGuestData(guest)
      setIsValidated(true)
    }
  }, [])

  // Coloca aquí el ID del video de YouTube (la parte después de v= en la URL)
  // Por ejemplo: https://www.youtube.com/watch?v=XXXXXXXXXXX
  const YOUTUBE_VIDEO_ID = 'qQkJe0zzf9w' // Reemplaza esto con tu ID de video

  const handleValidGuest = (guest) => {
    setGuestData(guest)
    setIsValidated(true)
  }

  const handleMusicChoice = (enabled) => {
    setMusicEnabled(enabled)
    setShowInvitation(true)
  }

  // Si no está validado, mostrar pantalla de validación
  if (!isValidated) {
    return <GuestValidation onValidGuest={handleValidGuest} />
  }

  // Si está validado pero no ha elegido música, mostrar pantalla de bienvenida
  if (showInvitation) {
    return <InvitationPage musicEnabled={musicEnabled} guestData={guestData} />
  }

  return (
    <div className="min-h-screen bg-[#f5e6e8] flex items-center justify-center p-4 relative overflow-hidden">
      
      <div className="relative max-w-4xl w-full z-10">
        {/* Cuadrado/marco contenedor */}
        <div className="bg-[#f5e6e8] rounded-3xl p-8 md:p-12 relative">
          {/* Decoraciones florales en las 4 esquinas del cuadrado */}
          <FloralDecoration position="top-right" />
          <FloralDecoration position="top-left" />
          <FloralDecoration position="bottom-right" />
          <FloralDecoration position="bottom-left" />
          
          {/* Contenido principal */}
          <div className="text-center py-8 px-4 relative z-10">
          {/* Mensaje personalizado de bienvenida */}
          {guestData && (
            <div className="mb-6 bg-white/50 rounded-xl p-4 backdrop-blur-sm">
              <p className="font-sans text-gray-700 text-base md:text-lg">
                ¡Hola <span className="font-semibold text-rose-500">{guestData.nombre}</span>!
              </p>
              <p className="font-sans text-gray-600 text-sm mt-1">
                Tu invitación es para <span className="font-semibold text-purple-600">{guestData.numeroPersonas}</span> {guestData.numeroPersonas === 1 ? 'persona' : 'personas'}
              </p>
            </div>
          )}
          
          {/* Título superior */}
          <p className="font-sans text-gray-600 text-sm md:text-base mb-2 tracking-wide">
            Bienvenidos a la invitación de
          </p>
          <div className="flex justify-center mb-4">
            <div className="border-t border-rose-300 w-32"></div>
          </div>

          {/* XV */}
          <h2 className="font-sans text-rose-300 text-4xl md:text-5xl font-light mb-2 tracking-widest">
            XV
          </h2>

          {/* Nombre */}
          <h1 className="text-gold-650 text-6xl md:text-8xl font-serif font-bold mb-2">
            Fernanda
          </h1>

          {/* Subtítulo */}
          <p className="font-sans text-rose-300 text-lg md:text-xl tracking-wider mb-6">
            MIS 15 AÑOS
          </p>

          {/* Decoración */}
          <div className="flex justify-center items-center mb-10">
            <svg className="w-24 h-6" viewBox="0 0 100 20" fill="none">
              <path d="M10 10 L40 10" stroke="#e9b3b9" strokeWidth="1"/>
              <path d="M50 5 L50 15" stroke="#e9b3b9" strokeWidth="1"/>
              <path d="M60 10 L90 10" stroke="#e9b3b9" strokeWidth="1"/>
              <circle cx="50" cy="10" r="3" fill="#e9b3b9"/>
            </svg>
          </div>

          {/* Mensaje de música */}
          <p className="font-sans text-gray-700 text-base md:text-lg mb-6 font-light">
            La música de fondo es parte de la experiencia
          </p>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => handleMusicChoice(true)}
              className="font-sans px-8 py-3 bg-palette-2 hover:bg-palette-5 text-gray-700 rounded-full 
                       transition-all duration-300 shadow-md hover:shadow-lg font-medium
                       min-w-[200px]"
            >
              Ingresar con música
            </button>
            <button
              onClick={() => handleMusicChoice(false)}
              className="font-sans px-8 py-3 bg-palette-3 hover:bg-palette-2 text-gray-700 rounded-full 
                       transition-all duration-300 shadow-md hover:shadow-lg font-medium
                       min-w-[200px]"
            >
              Ingresar sin música
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default App
