const ClassicView = () => {
  return (
    <div className="max-w-4xl mx-auto text-gray-200 space-y-8 md:space-y-12 px-4">
      {/* Section ABOUT */}
      <section id="about" className="scroll-mt-20">
        <h2 className="text-2xl md:text-3xl font-bold text-argos-neon mb-4 font-sans">ABOUT</h2>
        <div className="bg-argos-dark-secondary border border-argos-border rounded-lg p-6 space-y-4">
          <p className="leading-relaxed">
            ARGOS est une plateforme open-source d'analyse prédictive. Elle agrège en temps réel
            des données publiques et anonymisées pour détecter des signaux faibles et anticiper des
            événements critiques.
          </p>
          <p className="leading-relaxed">
            L'objectif : offrir un outil transparent, éthique et utile pour l'aide à la décision.
          </p>
        </div>
      </section>

      {/* Section USE CASES */}
      <section id="usecases" className="scroll-mt-20">
        <h2 className="text-2xl md:text-3xl font-bold text-argos-neon mb-4 font-sans">USE CASES</h2>
        <div className="bg-argos-dark-secondary border border-argos-border rounded-lg p-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-argos-turquoise mb-2">
              1. Anticipation de rupture de stock
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Analyse des actualités industrielles et logistiques pour détecter des risques de
              pénurie sur des composants critiques.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-argos-turquoise mb-2">
              2. Détection d'émergence de cyberattaques
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Surveillance des signaux techniques et discussions spécialisées pour identifier des
              menaces avant leur déploiement.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-argos-turquoise mb-2">
              3. Prévision de pic de trafic
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Croisement d'événements publics et d'annonces pour anticiper les pics de fréquentation
              sur les réseaux de transport.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-argos-turquoise mb-2">
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
        <h2 className="text-2xl md:text-3xl font-bold text-argos-neon mb-4 font-sans">ETHICS</h2>
        <div className="bg-argos-dark-secondary border border-argos-border rounded-lg p-6 space-y-4">
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
              ARGOS est un outil d'analyse, pas un système de surveillance.
            </p>
          </div>
        </div>
      </section>

      {/* Section TECHNO & STACK */}
      <section id="techno" className="scroll-mt-20">
        <h2 className="text-2xl md:text-3xl font-bold text-argos-neon mb-4 font-sans">TECHNO & STACK</h2>
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
        <h2 className="text-2xl md:text-3xl font-bold text-argos-neon mb-4 font-sans">TEAM & RECRUITMENT</h2>
        <div className="bg-argos-dark-secondary border border-argos-border rounded-lg p-6 space-y-4">
          <p className="leading-relaxed text-gray-300">
            Nous cherchons des profils IA, data, back-end, cybersécurité, UI/UX pour construire
            ARGOS sur 4 semestres.
          </p>
          <div>
            <h3 className="text-lg font-semibold text-argos-turquoise mb-2">
              Rejoignez-nous pour travailler sur :
            </h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Big Data et traitement de flux</li>
              <li>• NLP et analyse de texte</li>
              <li>• Machine Learning et modèles prédictifs</li>
              <li>• Visualisation avancée de données</li>
              <li>• Architecture distribuée et scalabilité</li>
              <li>• Sécurité et protection des données</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section ROADMAP */}
      <section id="roadmap" className="scroll-mt-20">
        <h2 className="text-2xl md:text-3xl font-bold text-argos-neon mb-4 font-sans">ROADMAP</h2>
        <div className="bg-argos-dark-secondary border border-argos-border rounded-lg p-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-argos-turquoise mb-2">S7 - Semestre 1</h3>
            <ul className="text-gray-300 space-y-1 ml-4">
              <li>• Ideation et définition du périmètre</li>
              <li>• Architecture technique</li>
              <li>• Prototypage des premiers modules</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-argos-turquoise mb-2">S8 - Semestre 2</h3>
            <ul className="text-gray-300 space-y-1 ml-4">
              <li>• Développement des pipelines de données</li>
              <li>• Implémentation des modèles ML</li>
              <li>• Interface utilisateur v1</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-argos-turquoise mb-2">S9 - Semestre 3</h3>
            <ul className="text-gray-300 space-y-1 ml-4">
              <li>• Optimisation et scalabilité</li>
              <li>• Tests et validation</li>
              <li>• Documentation complète</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-argos-turquoise mb-2">S10 - Semestre 4</h3>
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
        <h2 className="text-2xl md:text-3xl font-bold text-argos-neon mb-4 font-sans">CONTACT</h2>
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

