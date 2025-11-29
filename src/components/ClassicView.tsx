const ClassicView = () => {
  return (
    <div className="max-w-4xl mx-auto text-gray-200 space-y-6 sm:space-y-8 md:space-y-12 px-3 sm:px-4">
      {/* Section ABOUT */}
      <section id="about" className="scroll-mt-20">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-argos-neon mb-3 sm:mb-4 font-sans">ABOUT</h2>
        <div className="bg-argos-dark-secondary border border-argos-border rounded-lg p-4 sm:p-6 space-y-3 sm:space-y-4">
          <p className="text-lg sm:text-xl font-semibold text-argos-turquoise mb-2">
            Chaque jour, des milliards de données sont créées. Et si nous pouvions y lire l'avenir ?
          </p>
          <p className="leading-relaxed">
            ARGOS est une plateforme open-source d'analyse prédictive. Elle agrège en temps réel
            des données publiques et anonymisées pour détecter des signaux faibles et anticiper des
            événements critiques.
          </p>
          <p className="leading-relaxed font-medium text-argos-neon">
            Notre objectif n'est pas de surveiller des personnes, mais de comprendre des tendances
            globales pour anticiper des crises.
          </p>
          <p className="leading-relaxed">
            L'objectif : offrir un outil transparent, éthique et utile pour l'aide à la décision.
          </p>
        </div>
      </section>

      {/* Section USE CASES */}
      <section id="usecases" className="scroll-mt-20">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-argos-neon mb-3 sm:mb-4 font-sans">USE CASES</h2>
        <div className="bg-argos-dark-secondary border border-argos-border rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-argos-turquoise mb-2">
              1. Anticipation de rupture de stock
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Anticiper une rupture de stock sur des composants électroniques en analysant
              l'actualité des usines et des transports.
            </p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-argos-turquoise mb-2">
              2. Détection d'émergence de cyberattaques
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Détecter l'émergence d'une cyberattaque en corrélant des discussions sur des forums
              spécialisés et des publications techniques.
            </p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-argos-turquoise mb-2">
              3. Prévision de pic de trafic
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Prévoir un pic de trafic sur un réseau de transport en analysant des annonces
              d'événements publics.
            </p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-argos-turquoise mb-2">
              4. Analyse de tendances économiques
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Agrégation de données open data pour identifier des signaux faibles dans les secteurs
              économiques.
            </p>
          </div>
        </div>
      </section>

      {/* Section ETHICS */}
      <section id="ethics" className="scroll-mt-20">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-argos-neon mb-3 sm:mb-4 font-sans">ETHICS</h2>
        <div className="bg-argos-dark-secondary border border-argos-border rounded-lg p-4 sm:p-6 space-y-3 sm:space-y-4">
          <p className="text-base sm:text-lg font-semibold text-argos-turquoise mb-3 sm:mb-4">
            La première phase de notre projet sera de rédiger une charte éthique stricte.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            Nous nous engageons à n'utiliser <strong className="text-argos-neon">exclusivement que des données publiques et anonymisées</strong>.
            Notre code sera open-source pour garantir une transparence totale.
          </p>
          <div>
            <h3 className="text-lg font-semibold text-argos-turquoise mb-2">
              ✓ Données publiques uniquement
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Aucune collecte de données privées ou confidentielles.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-argos-turquoise mb-2">
              ✓ Aucune donnée personnelle nominative
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Respect strict de l'anonymisation et de la vie privée.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-argos-turquoise mb-2">
              ✓ Code open-source
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Transparence totale sur les algorithmes et traitements.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-argos-turquoise mb-2">
              ✓ Objectif : aide à la décision
            </h3>
            <p className="text-gray-300 leading-relaxed">
              ARGOS est un outil d'analyse prédictive, pas un système de surveillance individuelle.
            </p>
          </div>
        </div>
      </section>

      {/* Section INNOVATION */}
      <section id="innovation" className="scroll-mt-20">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-argos-neon mb-3 sm:mb-4 font-sans">INNOVATION</h2>
        <div className="bg-argos-dark-secondary border border-argos-border rounded-lg p-6 space-y-4">
          <p className="text-gray-300 leading-relaxed mb-4">
            ARGOS se distingue par son approche originale combinant IA, éthique et transparence.
          </p>
          <div>
            <h3 className="text-lg font-semibold text-argos-turquoise mb-2">
              ✓ Approche éthique proactive
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Charte éthique stricte dès la phase 1, engagement sur la transparence et le respect
              de la vie privée.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-argos-turquoise mb-2">
              ✓ Focus sur les signaux faibles
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Détection de patterns subtils dans des données publiques pour anticiper des
              événements avant qu'ils ne deviennent des crises.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-argos-turquoise mb-2">
              ✓ Open-source et transparent
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Code source ouvert pour garantir la transparence totale des algorithmes et
              traitements.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-argos-turquoise mb-2">
              ✓ Cas d'usage concrets et positifs
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Applications pratiques pour l'industrie, la cybersécurité et les transports, pas de
              surveillance individuelle.
            </p>
          </div>
          <p className="text-gray-300 leading-relaxed mt-4 font-medium">
            ARGOS n'est pas une simple mise à jour d'un projet existant, mais une approche originale
            combinant IA, éthique et transparence.
          </p>
        </div>
      </section>

      {/* Section TECHNO & STACK */}
      <section id="techno" className="scroll-mt-20">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-argos-neon mb-3 sm:mb-4 font-sans">TECHNO & STACK</h2>
        <div className="bg-argos-dark-secondary border border-argos-border rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-argos-turquoise mb-2">Backend</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Python / FastAPI</li>
                <li>• PostgreSQL / TimescaleDB</li>
                <li>• Redis pour le cache</li>
                <li>• Apache Kafka pour les flux</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-argos-turquoise mb-2">IA & Data</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• TensorFlow / PyTorch</li>
                <li>• Scikit-learn</li>
                <li>• NLP : spaCy, Transformers</li>
                <li>• Pandas, NumPy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-argos-turquoise mb-2">Frontend</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• React + TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• D3.js / Chart.js</li>
                <li>• WebSocket pour temps réel</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-argos-turquoise mb-2">DevOps</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Docker / Kubernetes</li>
                <li>• CI/CD : GitHub Actions</li>
                <li>• Monitoring : Prometheus</li>
                <li>• Logs : ELK Stack</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section TEAM & RECRUITMENT */}
      <section id="team" className="scroll-mt-20">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-argos-neon mb-3 sm:mb-4 font-sans">TEAM & RECRUITMENT</h2>
        <div className="bg-argos-dark-secondary border border-argos-border rounded-lg p-6 space-y-4">
          <p className="text-lg font-semibold text-argos-turquoise mb-2">
            Appel à Talents
          </p>
          <p className="leading-relaxed text-gray-300 mb-4">
            Nous recherchons des passionnés d'IA, de data science, de développement back-end et de
            cybersécurité pour construire le futur de l'analyse prédictive.
          </p>
          <div>
            <h3 className="text-lg font-semibold text-argos-turquoise mb-2">
              Le Défi Technique :
            </h3>
            <ul className="text-gray-300 space-y-2">
              <li>• <strong className="text-argos-neon">Big Data</strong> et traitement de flux</li>
              <li>• <strong className="text-argos-neon">Intelligence Artificielle</strong> et <strong className="text-argos-neon">Machine Learning</strong></li>
              <li>• <strong className="text-argos-neon">NLP</strong> (Natural Language Processing) et analyse de texte</li>
              <li>• <strong className="text-argos-neon">Cybersécurité</strong> et protection des données</li>
              <li>• Visualisation avancée de données</li>
              <li>• Architecture distribuée et scalabilité</li>
            </ul>
          </div>
          <p className="text-gray-300 leading-relaxed mt-4">
            Un défi à la hauteur d'une équipe de 7 sur 4 semestres.
          </p>
        </div>
      </section>

      {/* Section ROADMAP */}
      <section id="roadmap" className="scroll-mt-20">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-argos-neon mb-3 sm:mb-4 font-sans">ROADMAP</h2>
        <div className="bg-argos-dark-secondary border border-argos-border rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-6">
          <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
            <strong className="text-argos-neon">4 semestres - Équipe de 7</strong>
          </p>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-argos-turquoise mb-2">S7 - Semestre 1</h3>
            <ul className="text-gray-300 space-y-1 ml-4">
              <li>• <strong className="text-argos-neon">Rédaction de la charte éthique stricte</strong></li>
              <li>• Ideation et définition du périmètre</li>
              <li>• Architecture technique</li>
              <li>• Prototypage des premiers modules</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-argos-turquoise mb-2">S8 - Semestre 2</h3>
            <ul className="text-gray-300 space-y-1 ml-4 text-sm sm:text-base">
              <li>• Développement des pipelines de données</li>
              <li>• Implémentation des modèles ML et IA</li>
              <li>• NLP et analyse de texte</li>
              <li>• Interface utilisateur v1</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-argos-turquoise mb-2">S9 - Semestre 3</h3>
            <ul className="text-gray-300 space-y-1 ml-4 text-sm sm:text-base">
              <li>• Optimisation et scalabilité (Big Data)</li>
              <li>• Cybersécurité et protection des données</li>
              <li>• Tests et validation</li>
              <li>• Documentation complète</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-argos-turquoise mb-2">S10 - Semestre 4</h3>
            <ul className="text-gray-300 space-y-1 ml-4">
              <li>• Déploiement et monitoring</li>
              <li>• KPIs et métriques de performance</li>
              <li>• Open source release</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section CONTACT */}
      <section id="contact" className="scroll-mt-20">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-argos-neon mb-3 sm:mb-4 font-sans">CONTACT</h2>
        <div className="bg-argos-dark-secondary border border-argos-border rounded-lg p-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-argos-turquoise mb-2">GitHub</h3>
            <a
              href="https://github.com/argos-project"
              target="_blank"
              rel="noopener noreferrer"
              className="text-argos-neon hover:underline"
            >
              https://github.com/argos-project
            </a>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-argos-turquoise mb-2">Notion</h3>
            <a
              href="https://argos.notion.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-argos-neon hover:underline"
            >
              https://argos.notion.site
            </a>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-argos-turquoise mb-2">
              Rejoindre le projet
            </h3>
            <a
              href="mailto:contact@argos-project.org"
              className="inline-block mt-2 px-6 py-3 bg-argos-neon text-argos-dark font-semibold rounded-lg hover:bg-argos-turquoise transition-colors duration-300"
            >
              Envoyer un email
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ClassicView

