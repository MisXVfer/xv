import { useState } from 'react'
import FloralDecoration from './FloralDecoration'

const GuestValidation = ({ onValidGuest }) => {
  const [codigo, setCodigo] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isOpening, setIsOpening] = useState(false)
  const [guestInfo, setGuestInfo] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/guests/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codigo: codigo.trim() }),
      })

      const data = await response.json()

      if (data.success) {
        setGuestInfo(data.guest)
        localStorage.setItem('guestData', JSON.stringify(data.guest))
        setIsOpening(true)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Error conectando con el servidor. Por favor intenta de nuevo.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5e6e8] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <FloralDecoration position="top-right" />
        <FloralDecoration position="top-left" />
        <FloralDecoration position="bottom-right" />
        <FloralDecoration position="bottom-left" />
      </div>

      <div className="relative max-w-4xl w-full z-10">
        {isOpening ? (
          <div className="flex items-center justify-center min-h-[600px] px-4">
            <div className="relative w-full max-w-2xl">
              {/* Carta abierta con animación mejorada */}
              <div className={`transform transition-all duration-1000 ${isOpening ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 border-2 sm:border-4 border-[#d1a862] max-w-xl mx-auto">
                  <div className="text-center space-y-4 sm:space-y-6">
                    {/* Decoración superior */}
                    <div className="flex justify-center mb-4 sm:mb-6">
                      <svg className="w-20 sm:w-24 h-8 sm:h-10" viewBox="0 0 100 20" fill="none">
                        <path d="M10 10 L40 10" stroke="#d1a862" strokeWidth="2"/>
                        <circle cx="50" cy="10" r="5" fill="#d1a862"/>
                        <path d="M60 10 L90 10" stroke="#d1a862" strokeWidth="2"/>
                      </svg>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-serif text-[#d1a862] mb-4 sm:mb-6">¡Bienvenido!</h2>
                    
                    {guestInfo && (
                      <>
                        <p className="text-gray-700 text-lg sm:text-xl font-medium mb-4 sm:mb-6">{guestInfo.nombre}</p>
                        
                        <div className="py-4 px-6 sm:py-6 sm:px-8 bg-gradient-to-br from-[#f5e6e8] to-[#f5e6e8]/70 rounded-xl shadow-inner">
                          <p className="text-gray-600 text-sm sm:text-base mb-2 sm:mb-3">Tu invitación es para</p>
                          <p className="text-4xl sm:text-5xl font-bold text-[#d1a862] mb-2">{guestInfo.numeroPersonas}</p>
                          <p className="text-gray-600 text-sm sm:text-base">{guestInfo.numeroPersonas === 1 ? 'persona' : 'personas'}</p>
                        </div>

                        {guestInfo.mesa && (
                          <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">Mesa asignada: <span className="font-semibold">{guestInfo.mesa}</span></p>
                        )}

                        {/* Botón para continuar */}
                        <button
                          onClick={() => onValidGuest(guestInfo)}
                          className="mt-6 sm:mt-8 px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-[#d1a862] to-[#b8954f] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-base sm:text-lg"
                        >
                          Ver mi invitación
                        </button>
                      </>
                    )}

                    {/* Decoración inferior */}
                    <div className="flex justify-center mt-4 sm:mt-6">
                      <svg className="w-16 sm:w-20 h-6 sm:h-8" viewBox="0 0 100 20" fill="none">
                        <path d="M20 10 L80 10" stroke="#d1a862" strokeWidth="1.5"/>
                        <circle cx="50" cy="10" r="3" fill="#d1a862"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[600px] space-y-6 sm:space-y-8 px-4">
            {/* Sobre cerrado - diseño idéntico a la imagen */}
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] h-[240px] sm:h-[300px]">
              {/* Cuerpo principal del sobre - rectangular */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8b7355] to-[#6b5a47] rounded-sm shadow-2xl overflow-hidden">
                {/* Decoración de flores sutiles en el fondo */}
                <div className="absolute top-2 left-2 w-24 sm:w-32 h-24 sm:h-32 opacity-10">
                  <svg viewBox="0 0 100 100" fill="white">
                    <circle cx="20" cy="20" r="15"/>
                    <circle cx="50" cy="30" r="20"/>
                    <circle cx="80" cy="25" r="12"/>
                  </svg>
                </div>
                <div className="absolute top-2 right-2 w-24 sm:w-32 h-24 sm:h-32 opacity-10">
                  <svg viewBox="0 0 100 100" fill="white">
                    <circle cx="20" cy="20" r="15"/>
                    <circle cx="50" cy="30" r="20"/>
                    <circle cx="80" cy="25" r="12"/>
                  </svg>
                </div>
              </div>

              {/* Triángulo superior izquierdo de la tapa */}
              <div className="absolute top-0 left-0 w-0 h-0 border-l-[170px] sm:border-l-[210px] border-l-transparent border-t-[120px] sm:border-t-[150px] border-t-[#a08970]"></div>
              
              {/* Triángulo superior derecho de la tapa */}
              <div className="absolute top-0 right-0 w-0 h-0 border-r-[170px] sm:border-r-[210px] border-r-transparent border-t-[120px] sm:border-t-[150px] border-t-[#8b7355]"></div>

              {/* Sello circular en el centro */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center shadow-xl border-3 sm:border-4 border-white/80">
                  <div className="text-white text-2xl sm:text-3xl font-serif font-bold">F</div>
                </div>
              </div>

              {/* Línea central de la tapa (donde se unen los triángulos) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[120px] sm:h-[150px] bg-[#6b5a47] opacity-50 z-10"></div>
            </div>

            {/* Formulario debajo del sobre */}
            <div className="w-full max-w-md px-4">
              <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-serif text-[#d1a862] mb-2">Ingresa tu código</h2>
                <p className="text-gray-600 text-xs sm:text-sm">para abrir tu invitación</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <input
                  type="text"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                  placeholder="Ej: FER001"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-[#d1a862] rounded-full focus:outline-none focus:ring-2 focus:ring-[#d1a862] transition-all text-gray-700 text-center bg-white shadow-md uppercase font-semibold text-base sm:text-lg tracking-wider"
                  disabled={loading}
                  required
                  maxLength={10}
                />

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-3 sm:p-4 rounded-lg">
                    <p className="text-red-700 text-xs sm:text-sm text-center">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !codigo.trim()}
                  className="w-full bg-gradient-to-r from-[#d1a862] to-[#b8954f] text-white py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base sm:text-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verificando...
                    </span>
                  ) : (
                    'Abrir invitación'
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          0% { 
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          100% { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default GuestValidation
