import { useState } from 'react'
import Terminal from './components/Terminal'
import ClassicView from './components/ClassicView'

function App() {
  const [showClassicView, setShowClassicView] = useState(false)

  return (
    <div className="min-h-screen bg-argos-dark">
      {/* Header avec logo */}
      <header className="pt-4 sm:pt-6 md:pt-8 pb-3 sm:pb-4 px-4 flex justify-center items-center">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 bg-argos-neon rounded-lg flex items-center justify-center text-argos-dark font-bold text-base sm:text-lg md:text-xl">
            A
          </div>
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-argos-neon font-sans">
            ARGOS
          </h1>
        </div>
      </header>

      {/* Terminal principal */}
      <main className="container mx-auto px-2 sm:px-4 pb-6 sm:pb-8">
        <Terminal />
        
        {/* Bouton pour basculer vers le mode classique */}
        <div className="mt-4 sm:mt-6 md:mt-8 flex justify-center px-2 sm:px-4">
          <button
            onClick={() => setShowClassicView(!showClassicView)}
            className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-argos-dark-secondary border border-argos-border rounded-lg text-argos-turquoise hover:bg-argos-border hover:border-argos-neon transition-all duration-300 hover:scale-105 active:scale-95 font-mono-terminal text-xs sm:text-sm md:text-base touch-manipulation"
          >
            {showClassicView ? 'Mode Terminal' : 'Mode présentation classique'}
          </button>
        </div>

        {/* Vue classique */}
        {showClassicView && (
          <div className="mt-12">
            <ClassicView />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-4 sm:py-6 px-4 text-center text-gray-500 text-xs sm:text-sm">
        <p className="break-words">ARGOS - Analyse Prédictive par IA • Open Source</p>
      </footer>
    </div>
  )
}

export default App

