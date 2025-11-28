import { useState } from 'react'
import Terminal from './components/Terminal'
import ClassicView from './components/ClassicView'

function App() {
  const [showClassicView, setShowClassicView] = useState(false)

  return (
    <div className="min-h-screen bg-argos-dark">
      {/* Header avec logo */}
      <header className="pt-6 md:pt-8 pb-4 px-4 flex justify-center items-center">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="h-10 w-10 md:h-12 md:w-12 bg-argos-neon rounded-lg flex items-center justify-center text-argos-dark font-bold text-lg md:text-xl">
            A
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-argos-neon font-sans">
            ARGOS
          </h1>
        </div>
      </header>

      {/* Terminal principal */}
      <main className="container mx-auto px-4 pb-8">
        <Terminal />
        
        {/* Bouton pour basculer vers le mode classique */}
        <div className="mt-6 md:mt-8 flex justify-center px-4">
          <button
            onClick={() => setShowClassicView(!showClassicView)}
            className="px-4 py-2 md:px-6 md:py-3 bg-argos-dark-secondary border border-argos-border rounded-lg text-argos-turquoise hover:bg-argos-border hover:border-argos-neon transition-all duration-300 hover:scale-105 font-mono-terminal text-sm md:text-base"
          >
            {showClassicView ? '🖥️ Mode Terminal' : '📄 Mode présentation classique'}
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
      <footer className="py-6 px-4 text-center text-gray-500 text-sm">
        <p>ARGOS - Analyse Prédictive par IA • Open Source</p>
      </footer>
    </div>
  )
}

export default App

