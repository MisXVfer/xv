import { useState, useEffect, useRef } from 'react'

const InvitationPage = ({ musicEnabled, guestData }) => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [modalOpen, setModalOpen] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showMapModal, setShowMapModal] = useState(false)
  const [mapLocation, setMapLocation] = useState(null) // 'fiesta' o 'misa'
  const audioRef = useRef(null)
  const basePath = import.meta.env.BASE_URL

  // Links de navegación para Fiesta
  const FIESTA_GOOGLE_MAPS = 'https://maps.app.goo.gl/7itQwNXLR2pbwS5T7'
  const FIESTA_WAZE = 'https://waze.com/ul/h9fxd567ye'
  
  // Links de navegación para Misa (Iglesia)
  const MISA_GOOGLE_MAPS = 'https://maps.app.goo.gl/cTMhPQUP2pQk7gUy7'
  const MISA_WAZE = 'https://waze.com/ul/h9fxd56dky'

  const openMapModal = (location) => {
    setMapLocation(location)
    setShowMapModal(true)
  }

  // Cargar música cuando musicEnabled es true
  useEffect(() => {
    if (musicEnabled && !audioRef.current) {
      audioRef.current = new Audio(`${basePath}music/cancion1.mp3`)
      audioRef.current.loop = true
      audioRef.current.volume = 0.5
      
      // Intentar reproducir inmediatamente
      const playAudio = () => {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(error => {
          console.log('Esperando interacción del usuario para reproducir música')
          // Si falla, intentar reproducir con el primer click
          document.addEventListener('click', () => {
            audioRef.current.play().then(() => {
              setIsPlaying(true)
            }).catch(e => console.log('Error:', e))
          }, { once: true })
        })
      }
      
      playAudio()
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [musicEnabled])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(e => console.log('Error:', e))
      }
    }
  }

  useEffect(() => {
    const eventDate = new Date('2026-01-31T19:00:00').getTime()
    
    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = eventDate - now
      
      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }
    
    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const handleAddToCalendar = () => {
    const event = {
      title: 'XV Años - Fernanda',
      description: 'Celebración de los XV años de Angie Fernanda Urbina Saravia. Misa: 16:00 hrs en Iglesia Belén. Fiesta: 17:00 hrs en Eventos La Casa del Lago.',
      location: 'Eventos La Casa del Lago, Amatitlán, Guatemala',
      startDate: '2026-01-31T16:00:00',
      endDate: '2026-02-01T00:00:00'
    }

    const formatDate = (dateString) => {
      return dateString.replace(/[-:]/g, '').replace('.000', '')
    }

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Invitación 15 años//ES',
      'BEGIN:VEVENT',
      `DTSTART:${formatDate(event.startDate)}`,
      `DTEND:${formatDate(event.endDate)}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n')

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'fernanda-15anos.ics'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-[#f5e6e8]">
      {/* Botón flotante de música */}
      {musicEnabled && (
        <button
          onClick={toggleMusic}
          className="fixed top-4 right-4 z-50 w-14 h-14 bg-gold-600 hover:bg-gold-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
      )}

      {/* Sección de bienvenida/hero */}
      <div 
        className="min-h-screen flex items-center justify-center px-4 py-12 relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${basePath}images/fondo.webp)` }}
      >
        {/* Overlay suave para mejorar legibilidad */}
        <div className="absolute inset-0 bg-white/40"></div>

        {/* Decoración floral superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-72 lg:w-80 z-10 rotate-180">
          <img src={`${basePath}images/Flor1.webp`} alt="Flor decorativa" className="w-full h-auto" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-20 px-4">
          {/* Fecha en la parte superior */}
          <div className="mb-6 md:mb-8">
            <div className="inline-block">
              <div className="flex items-center gap-2 md:gap-4">
                <div className="h-px bg-gold-600 w-12 md:w-20"></div>
                <p className="font-serif text-gray-700 text-lg md:text-2xl lg:text-3xl italic">
                  31.01.2026
                </p>
                <div className="h-px bg-gold-600 w-12 md:w-20"></div>
              </div>
            </div>
          </div>

          {/* Nombre principal */}
          <h1 className="text-[#d1a862] text-6xl sm:text-7xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-normal mb-3 md:mb-4">
            Fernanda
          </h1>

          {/* Subtítulo */}
          <p className="font-serif text-palette-2 text-2xl md:text-2xl lg:text-3xl italic mb-8 md:mb-12">
            Mis 15 años
          </p>

          {/* Mensaje con comillas */}
          <div className="max-w-2xl mx-auto mb-6 md:mb-8">
            <div className="relative">
              <span className="text-gold-600 text-3xl md:text-4xl lg:text-5xl font-serif absolute -top-2 md:-top-4 -left-4 md:-left-8">"</span>
              <p className="font-serif text-gray-700 text-lg md:text-xl lg:text-2xl italic px-6 md:px-8 leading-relaxed">
                Te espero para compartir la alegría de esa noche que será para mí mágica, inolvidable y única.
              </p>
              <span className="text-gold-600 text-3xl md:text-4xl lg:text-5xl font-serif absolute -bottom-4 md:-bottom-8 -right-4 md:-right-8">"</span>
            </div>
          </div>

          {/* Flecha animada hacia abajo */}
          <div className="flex justify-center mt-16">
            <svg 
              className="w-12 h-12 md:w-14 md:h-14 text-gold-600 animate-bounce" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Resto de las secciones con divisor flotante */}
      <div className="relative px-4 pb-12">
        {/* Divisor SVG flotante superpuesto */}
        <div className="absolute -top-16 sm:-top-24 md:-top-44 lg:-top-52 left-0 w-full z-10 pointer-events-none">
          <img 
            src={`${basePath}images/curvas01.svg`} 
            alt="Divisor" 
            className="w-full h-auto"
          />
        </div>
        
        {/* Espaciador para el contenido después del SVG */}
        <div className="h-24 md:h-40 lg:h-48"></div>
        
        <div className="max-w-4xl mx-auto">
          {/* Texto introductorio */}
          <div className="text-center mb-12 px-6 max-w-3xl mx-auto space-y-8">
            {/* Mensaje de agradecimiento con diseño mejorado */}
            <div className="relative">
              {/* Decoración superior */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#d1a862] to-transparent"></div>
              </div>
              
              <div className="bg-gradient-to-br from-[#faf5f0] to-white rounded-2xl shadow-lg p-8 md:p-10 border border-[#d1a862]/20">
                <div className="space-y-5 text-gray-700">
                  <p className="text-lg md:text-xl font-serif leading-relaxed">
                    Hoy hace <span className="font-semibold text-[#d1a862]">Quince Años</span> mis padres daban gracias a Dios por mi.
                  </p>
                  
                  <p className="text-base md:text-lg leading-relaxed italic text-gray-600">
                    Hoy doy gracias a Dios por ellos, por cuidarme, tenerme paciencia y aconsejarme.
                  </p>
                  
                  <div className="flex justify-center my-4">
                    <div className="w-12 h-0.5 bg-[#d1a862]/30"></div>
                  </div>
                  
                  <p className="text-base md:text-lg leading-relaxed">
                    Doy gracias también a toda mi <span className="text-[#d1a862] font-medium">familia</span> por hacer más especial este día.
                  </p>
                  
                  <p className="text-base md:text-lg leading-relaxed">
                    A todos mis <span className="text-[#d1a862] font-medium">amigos</span> por enseñarme el valor de una verdadera amistad.
                  </p>
                  
                  <div className="pt-4 mt-6 border-t border-[#d1a862]/20">
                    <p className="text-lg md:text-xl font-serif text-[#d1a862] font-semibold">
                      Gracias por acompañarme<br/>que Dios los bendiga 
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decoración inferior */}
              <div className="flex justify-center mt-6">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#d1a862] to-transparent"></div>
              </div>
            </div>
            
            <p className="text-gray-700 text-lg md:text-xl font-serif italic leading-relaxed">
              Una noche de ensueño para celebrar el más hermoso despertar.
            </p>
            
            <div className="space-y-2">
              <p className="text-gray-800 text-xl md:text-2xl font-serif">
                Fernando Urbina
              </p>
              <p className="text-gold-600 text-2xl md:text-3xl font-serif">
                &
              </p>
              <p className="text-gray-800 text-xl md:text-2xl font-serif">
                Marielos Saravia
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-gray-700 text-base md:text-lg">
                Se complacen en invitarles a celebrar
              </p>
              <p className="text-gray-700 text-base md:text-lg">
                Los XV años de
              </p>
              <p className="text-gold-600 text-2xl md:text-3xl font-serif font-semibold mt-2">
                Angie Fernanda Urbina Saravia
              </p>
            </div>
          </div>

          {/* Cuenta regresiva */}
          <div className="relative text-center mb-8">
            <img src={`${basePath}images/contador.png`} alt="Contador" className="w-full max-w-3xl md:max-w-2xl h-auto mx-auto" />
            
            {/* Cuenta regresiva en formato horizontal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md md:max-w-sm px-4">
              {/* Título "Falta" */}
              <div className="text-center mb-3 md:mb-4">
                <h3 className="text-3xl md:text-3xl lg:text-4xl font-serif italic text-gold-600">Falta</h3>
              </div>
              
              <div className="flex justify-center items-start gap-3 md:gap-4 lg:gap-5 font-serif">
                {/* Días */}
                <div className="flex flex-col items-center">
                  <div className="text-2xl md:text-4xl lg:text-5xl font-serif font-normal mb-1 text-gray-800">{countdown.days}</div>
                  <div className="text-sm md:text-sm uppercase tracking-wider text-gold-600">días</div>
                </div>
                
                <div className="text-2xl md:text-2xl lg:text-3xl font-bold text-gray-800">|</div>
                
                {/* Horas */}
                <div className="flex flex-col items-center">
                  <div className="text-2xl md:text-4xl lg:text-5xl font-serif font-normal mb-1 text-gray-800">{countdown.hours}</div>
                  <div className="text-sm md:text-sm uppercase tracking-wider text-gold-600">hs</div>
                </div>
                
                <div className="text-2xl md:text-2xl lg:text-3xl font-bold text-gray-800">|</div>
                
                {/* Minutos */}
                <div className="flex flex-col items-center">
                  <div className="text-2xl md:text-4xl lg:text-5xl font-serif font-normal mb-1 text-gray-800">{countdown.minutes}</div>
                  <div className="text-sm md:text-sm uppercase tracking-wider text-gold-600">min</div>
                </div>
                
                <div className="text-2xl md:text-2xl lg:text-3xl font-bold text-gray-800">|</div>
                
                {/* Segundos */}
                <div className="flex flex-col items-center">
                  <div className="text-2xl md:text-4xl lg:text-5xl font-serif font-normal mb-1 text-gray-800">{countdown.seconds}</div>
                  <div className="text-sm md:text-sm uppercase tracking-wider text-gold-600">seg</div>
                </div>
              </div>
              
              {/* Corazón animado */}
              <div className="flex justify-center mt-4 md:mt-4">
                <svg 
                  className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-gold-600 animate-pulse"
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Imagen decorativa de líneas */}
        <div className="w-screen md:w-full">
          <img src={`${basePath}images/lineas01.svg`} alt="Líneas decorativas" className="w-full h-auto" />
        </div>

        {/* Sección Misa */}
        <div className="py-16 md:py-20 px-6 relative">
          <div className="max-w-4xl mx-auto">
            {/* Círculo decorativo con imagen - Posición superior */}
            <div className="flex justify-center -mt-8 md:-mt-20 mb-12">
              <div className="relative">
                <div className="w-28 h-28 md:w-40 md:h-40 bg-gradient-to-br from-[#B8936E] to-[#A07D5C] rounded-full shadow-2xl flex items-center justify-center animate-pulse">
                  <div className="w-24 h-24 md:w-36 md:h-36 bg-white rounded-full flex items-center justify-center">
                    <img 
                      src={`${basePath}images/iglesia.svg`} 
                      alt="Decoración misa" 
                      className="w-12 h-12 md:w-20 md:h-20 animate-shake-slow" 
                      style={{ filter: 'brightness(0) saturate(100%) invert(60%) sepia(20%) saturate(700%) hue-rotate(10deg) brightness(90%) contrast(85%)' }}
                    />
                  </div>
                </div>
                {/* Destellos decorativos */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold-600 rounded-full opacity-60 animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gold-600 rounded-full opacity-60 animate-ping" style={{animationDelay: '0.5s'}}></div>
              </div>
            </div>

            {/* Título con ornamentos */}
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-600 to-gold-600"></div>
                <div className="relative">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-[#B8936E] relative z-10">
                    Misa
                  </h2>
                  <div className="absolute inset-0 blur-sm bg-[#B8936E] opacity-20"></div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold-600 to-gold-600"></div>
              </div>
            </div>

            {/* Contenedor principal con diseño alternado */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Sección Día - Con fondo */}
              <div className="bg-gradient-to-r from-[#f5e6e8] to-white p-8 md:p-10 border-b-2 border-[#B8936E]/20">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  {/* Icono */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-[#B8936E] rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform">
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Contenido */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-serif text-gray-800 mb-3 flex items-center justify-center md:justify-start gap-2">
                      Fecha & Hora
                      <svg className="w-5 h-5 text-gold-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    </h3>
                    <div className="space-y-1 mb-4">
                      <p className="text-lg md:text-xl text-gray-600">Sábado, 31 de Enero</p>
                      <p className="text-2xl md:text-3xl font-serif text-[#B8936E] font-semibold">16:00 hrs</p>
                    </div>
                    <button 
                      onClick={handleAddToCalendar}
                      className="bg-[#B8936E] text-white px-8 py-3 rounded-full text-base md:text-lg hover:bg-[#A07D5C] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2 font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                      </svg>
                      Guardar en Calendario
                    </button>
                  </div>
                </div>
              </div>

              {/* Sección Dirección - Sin fondo */}
              <div className="bg-white p-8 md:p-10">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  {/* Icono */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#B8936E] to-[#A07D5C] rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform">
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Contenido */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-serif text-gray-800 mb-3 flex items-center justify-center md:justify-start gap-2">
                      Ubicación
                      <svg className="w-5 h-5 text-gold-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                    </h3>
                    <p className="text-lg md:text-xl text-gray-600 mb-4 leading-relaxed">
                      Iglesia Belén<br/>
                      <span className="text-gray-500">Guatemala</span>
                    </p>
                    <button 
                      onClick={() => openMapModal('misa')}
                      className="bg-gradient-to-r from-[#B8936E] to-[#A07D5C] text-white px-8 py-3 rounded-full text-base md:text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg inline-flex items-center gap-2 font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                      </svg>
                      Ver Ubicación
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Decoración inferior */}
            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gold-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gold-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-gold-600 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección Fiesta */}
        <div className="py-16 md:py-20 px-6 relative">
          <div className="max-w-4xl mx-auto">
            {/* Círculo decorativo con imagen - Posición superior */}
            <div className="flex justify-center -mt-8 md:-mt-20 mb-12">
              <div className="relative">
                <div className="w-28 h-28 md:w-40 md:h-40 bg-gradient-to-br from-[#B8936E] to-[#A07D5C] rounded-full shadow-2xl flex items-center justify-center animate-pulse">
                  <div className="w-24 h-24 md:w-36 md:h-36 bg-white rounded-full flex items-center justify-center">
                    <img 
                      src={`${basePath}images/Fiesta.svg`} 
                      alt="Decoración fiesta" 
                      className="w-12 h-12 md:w-20 md:h-20 animate-shake-slow" 
                      style={{ filter: 'brightness(0) saturate(100%) invert(60%) sepia(20%) saturate(700%) hue-rotate(10deg) brightness(90%) contrast(85%)' }}
                    />
                  </div>
                </div>
                {/* Destellos decorativos */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold-600 rounded-full opacity-60 animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gold-600 rounded-full opacity-60 animate-ping" style={{animationDelay: '0.5s'}}></div>
              </div>
            </div>

            {/* Título con ornamentos */}
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-600 to-gold-600"></div>
                <div className="relative">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-[#B8936E] relative z-10">
                    Fiesta
                  </h2>
                  <div className="absolute inset-0 blur-sm bg-[#B8936E] opacity-20"></div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold-600 to-gold-600"></div>
              </div>
            </div>

            {/* Contenedor principal con diseño alternado */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Sección Día - Con fondo */}
              <div className="bg-gradient-to-r from-[#f5e6e8] to-white p-8 md:p-10 border-b-2 border-[#B8936E]/20">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  {/* Icono */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-[#B8936E] rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform">
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Contenido */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-serif text-gray-800 mb-3 flex items-center justify-center md:justify-start gap-2">
                      Fecha & Hora
                      <svg className="w-5 h-5 text-gold-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    </h3>
                    <div className="space-y-1 mb-4">
                      <p className="text-lg md:text-xl text-gray-600">Sábado, 31 de Enero</p>
                      <p className="text-2xl md:text-3xl font-serif text-[#B8936E] font-semibold">17:00 hrs</p>
                    </div>
                    <button 
                      onClick={handleAddToCalendar}
                      className="bg-[#B8936E] text-white px-8 py-3 rounded-full text-base md:text-lg hover:bg-[#A07D5C] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2 font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                      </svg>
                      Guardar en Calendario
                    </button>
                  </div>
                </div>
              </div>

              {/* Sección Dirección - Sin fondo */}
              <div className="bg-white p-8 md:p-10">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  {/* Icono */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#B8936E] to-[#A07D5C] rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform">
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Contenido */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-serif text-gray-800 mb-3 flex items-center justify-center md:justify-start gap-2">
                      Ubicación
                      <svg className="w-5 h-5 text-gold-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                    </h3>
                    <p className="text-lg md:text-xl text-gray-600 mb-4 leading-relaxed">
                      Eventos La Casa del Lago<br/>
                      <span className="text-gray-500">Amatitlán, Guatemala</span>
                    </p>
                    <button 
                      onClick={() => openMapModal('fiesta')}
                      className="bg-gradient-to-r from-[#B8936E] to-[#A07D5C] text-white px-8 py-3 rounded-full text-base md:text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg inline-flex items-center gap-2 font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                      </svg>
                      Ver Ubicación
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Decoración inferior */}
            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gold-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gold-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-gold-600 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Divisor SVG flotante */}
        <div className="relative">
          <div className="absolute inset-0 -top-8 sm:-top-12 md:-top-16 lg:-top-20 z-20 pointer-events-none">
            <img 
              src={`${basePath}images/curvas02.svg`} 
              alt="Divisor decorativo" 
              className="w-full h-auto"
            />
          </div>
          <div className="h-20 md:h-40"></div>
        </div>

        {/* Sección Notas */}
        <div className="py-16 md:py-20 px-6 bg-gradient-to-b from-[#f5e6e8] to-white">
          <div className="max-w-6xl mx-auto">
            {/* Título con decoración */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-600 to-gold-600"></div>
                <div className="relative">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-[#B8936E] relative z-10">Detalles</h2>
                  <div className="absolute inset-0 blur-sm bg-[#B8936E] opacity-20"></div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold-600 to-gold-600"></div>
              </div>
              <p className="text-lg md:text-xl text-gray-500 font-serif italic">Hagamos juntos una fiesta épica</p>
            </div>

            {/* Flor decorativa central */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#B8936E]/20 to-[#A07D5C]/20 rounded-full blur-3xl"></div>
                <img 
                  src={`${basePath}images/Flores2.png`} 
                  alt="Flores decorativas" 
                  className="relative w-40 h-40 md:w-48 md:h-48 object-contain animate-pulse"
                />
              </div>
            </div>

            {/* Tarjetas mejoradas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Música */}
              <div className="group">
                <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#B8936E]/20">
                  {/* Decoración superior */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#B8936E] to-[#A07D5C] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src={`${basePath}images/musica.svg`} 
                        alt="Música" 
                        className="w-10 h-10"
                        style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-12 text-center">
                    <h3 className="text-2xl md:text-3xl font-serif text-gray-800 mb-4 flex items-center justify-center gap-2">
                      Música
                      <svg className="w-5 h-5 text-[#B8936E] group-hover:animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
                      </svg>
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">¿Cuál es la canción que no debe faltar en la playlist?</p>
                    <button 
                      onClick={() => setModalOpen('musica')}
                      className="bg-gradient-to-r from-[#B8936E] to-[#A07D5C] text-white px-8 py-3 rounded-full text-base hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium"
                    >
                      Sugerir Canción
                    </button>
                  </div>
                </div>
              </div>

              {/* Dress Code */}
              <div className="group">
                <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#B8936E]/20">
                  {/* Decoración superior */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#A07D5C] to-[#8B6F4E] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src={`${basePath}images/vestuario.svg`} 
                        alt="Dress Code" 
                        className="w-10 h-10"
                        style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-12 text-center">
                    <h3 className="text-2xl md:text-3xl font-serif text-gray-800 mb-4 flex items-center justify-center gap-2">
                      Dress Code
                      <svg className="w-5 h-5 text-[#B8936E] group-hover:animate-spin" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                      </svg>
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">Una orientación para tu vestuario</p>
                    <button 
                      onClick={() => setModalOpen('dresscode')}
                      className="bg-gradient-to-r from-[#A07D5C] to-[#8B6F4E] text-white px-8 py-3 rounded-full text-base hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium"
                    >
                      Ver Más
                    </button>
                  </div>
                </div>
              </div>

              {/* Regalos */}
              <div className="group">
                <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#B8936E]/20">
                  {/* Decoración superior */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#B8936E] to-[#D4A574] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src={`${basePath}images/tarjeta-de-regalo.png`} 
                        alt="Regalo" 
                        className="w-10 h-10"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-12 text-center">
                    <h3 className="text-2xl md:text-3xl font-serif text-gray-800 mb-4 flex items-center justify-center gap-2">
                      Regalos
                      <svg className="w-5 h-5 text-[#B8936E] group-hover:animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
                      </svg>
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">Si deseas regalarme algo...</p>
                    <button 
                      onClick={() => setModalOpen('regalos')}
                      className="bg-gradient-to-r from-[#B8936E] to-[#D4A574] text-white px-8 py-3 rounded-full text-base hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium"
                    >
                      Ver Más
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Decoración inferior */}
            <div className="flex justify-center mt-12 gap-3">
              <div className="w-3 h-3 bg-[#B8936E] rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-[#A07D5C] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-[#D4A574] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>

        {/* Sección Confirmación */}
        <div className="py-16 md:py-20 px-6 relative overflow-hidden">
          {/* Fondo decorativo */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#f5e6e8] via-white to-[#f5e6e8]"></div>
          
          <div className="max-w-2xl mx-auto relative z-10">
            {/* Título con decoración */}
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-600 to-gold-600"></div>
                <div className="relative">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-[#B8936E] relative z-10">Confirmación</h2>
                  <div className="absolute inset-0 blur-sm bg-[#B8936E] opacity-20"></div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold-600 to-gold-600"></div>
              </div>
              <p className="text-base md:text-lg text-gray-600 font-serif leading-relaxed">Recuerda confirmar tu asistencia antes del 15 de Enero de 2026. Puedes hacerlo dando clic en el botón "Confirmar"</p>
            </div>

            {/* Icono de confirmación */}
            <div className="flex justify-center mb-8">
              <img 
                src={`${basePath}images/tips.svg`} 
                alt="Confirmación" 
                className="w-20 h-20 md:w-24 md:h-24"
                style={{ filter: 'brightness(0) saturate(100%) invert(60%) sepia(20%) saturate(700%) hue-rotate(10deg) brightness(90%) contrast(85%)' }}
              />
            </div>

            {/* Información de confirmación */}
            <div className="text-center mb-8 px-4">
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              </p>
              
              {/* Botón de WhatsApp */}
              <a
                href="https://wa.me/50231141143?text=Hola,%20confirmo%20mi%20asistencia%20a%20los%2015%20años%20de%20Fernanda"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#B8936E] via-[#D4A574] to-[#B8936E] text-white px-10 py-4 rounded-full text-base md:text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Confirmar en WhatsApp
              </a>
            </div>

            {/* Decoración inferior */}
            <div className="flex justify-center items-center mt-10 gap-3">
              <div className="w-2 h-2 bg-[#B8936E] rounded-full"></div>
              <div className="w-3 h-3 bg-[#A07D5C] rounded-full"></div>
              <div className="w-2 h-2 bg-[#D4A574] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-6 py-8 md:p-8" onClick={() => setModalOpen(null)}>
            <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
              {/* Decoración superior */}
              <div className="absolute -top-12 md:-top-16 left-1/2 transform -translate-x-1/2">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <img 
                    src={`${basePath}images/${modalOpen === 'musica' ? 'musica' : modalOpen === 'dresscode' ? 'vestuario' : modalOpen === 'regalos' ? 'tarjeta-de-regalo' : 'tips'}.${modalOpen === 'regalos' ? 'png' : 'svg'}`}
                    alt="Icono" 
                    className="w-12 h-12 md:w-16 md:h-16"
                    style={{ filter: 'brightness(0) saturate(100%) invert(60%) sepia(20%) saturate(700%) hue-rotate(10deg) brightness(90%) contrast(85%)' }}
                  />
                </div>
              </div>

              {/* Botón cerrar */}
              <button 
                onClick={() => setModalOpen(null)}
                className="absolute top-3 right-3 md:top-4 md:right-4 w-9 h-9 md:w-10 md:h-10 bg-[#B8936E] rounded-full flex items-center justify-center text-white text-lg hover:bg-[#A07D5C] transition-colors"
              >
                ✕
              </button>

              {/* Contenido */}
              <div className="mt-12 md:mt-16 text-center px-2">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-serif text-[#B8936E] mb-3 md:mb-4">
                  {modalOpen === 'musica' ? 'Música' : modalOpen === 'dresscode' ? 'Dress Code' : modalOpen === 'regalos' ? 'Regalos' : 'Confirmación'}
                </h2>
                <p className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed mb-6">
                  {modalOpen === 'musica' 
                    ? 'Si deseas agregar una canción que no puede faltar en la fiesta, presiona el botón.' 
                    : modalOpen === 'dresscode' 
                    ? 'Agradecemos su colaboración manteniendo un atuendo Formal para la celebración. Por favor, tomen en cuenta que el color Rose Gold está reservado de manera exclusiva para la Quinceañera.' 
                    : modalOpen === 'regalos'
                    ? 'Su compañía es nuestro mejor regalo. Si desean tener un presente, les agradeceríamos que este sea en efectivo.'
                    : 'Recuerda confirmar tu asistencia antes del 15 de Enero de 2026. Puedes hacerlo dando clic en el botón "Confirmar".'}
                </p>
                
                {/* Botón de Spotify solo para música */}
                {modalOpen === 'musica' && (
                  <a
                    href="https://open.spotify.com/playlist/0lqBfw1g6uNO51TV3EUG8E?si=c0d5dad8bc2d45f0&pt=b06cf82faa48f6f2f185b6797e5e9f60"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#1DB954] text-white px-6 py-3 rounded-full text-sm md:text-base hover:bg-[#1AA34A] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    Spotify
                  </a>
                )}
                
                {/* Botón de WhatsApp solo para confirmación */}
                {modalOpen === 'confirmacion' && (
                  <a
                    href="https://wa.me/50231141143?text=Hola,%20confirmo%20mi%20asistencia%20a%20los%2015%20años%20de%20Fernanda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full text-sm md:text-base hover:bg-[#20BA5A] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Confirmar en WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal de selección de mapa */}
        {showMapModal && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowMapModal(false)}
          >
            <div 
              className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón cerrar */}
              <button
                onClick={() => setShowMapModal(false)}
                className="absolute top-3 right-3 w-10 h-10 bg-[#B8936E] rounded-full text-white flex items-center justify-center hover:bg-[#A07D5C] transition-colors"
              >
                <span className="text-xl">×</span>
              </button>

              <h3 className="text-2xl font-serif text-gray-800 mb-4 text-center">
                ¿Cómo deseas navegar?
              </h3>
              
              <p className="text-gray-600 text-center mb-6">
                Selecciona tu app de navegación preferida
              </p>

              <div className="space-y-3">
                {/* Botón Google Maps */}
                <button
                  onClick={() => {
                    const link = mapLocation === 'fiesta' ? FIESTA_GOOGLE_MAPS : MISA_GOOGLE_MAPS
                    window.open(link, '_blank')
                    setShowMapModal(false)
                  }}
                  className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white px-6 py-4 rounded-xl transition-colors flex items-center justify-center gap-3 text-lg font-medium"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  Google Maps
                </button>

                {/* Botón Waze */}
                <button
                  onClick={() => {
                    const link = mapLocation === 'fiesta' ? FIESTA_WAZE : MISA_WAZE
                    window.open(link, '_blank')
                    setShowMapModal(false)
                  }}
                  className="w-full bg-[#33CCFF] hover:bg-[#00B8FF] text-white px-6 py-4 rounded-xl transition-colors flex items-center justify-center gap-3 text-lg font-medium"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Waze
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#B8936E] to-[#A07D5C] py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Decoración superior */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-white/30"></div>
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <div className="w-12 h-px bg-white/30"></div>
          </div>

          {/* Mensaje de agradecimiento */}
          <p className="text-white text-base md:text-lg font-serif italic mb-2">
            Gracias por ser parte de este día tan especial
          </p>
          <p className="text-white/80 text-sm md:text-base mb-4">
            Tu presencia lo hace aún más memorable
          </p>

          {/* Decoración inferior */}
          <div className="flex justify-center gap-1 mb-3">
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
          </div>

          {/* Nombre y fecha */}
          <p className="text-white/60 text-xs md:text-sm font-sans">
            Fernanda • 31.01.2026
          </p>
        </div>
      </footer>
    </div>
  )
}

export default InvitationPage
