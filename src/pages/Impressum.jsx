import { Shield } from "lucide-react"

const Impressum = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12 border-b border-blue-900 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-white">Impressum</h1>
          </div>
          <p className="text-purple-400 font-semibold">Gesetzliche Informationen gemäß § 5 TMG</p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Anbieter */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">1</span>
              Anbieter
            </h2>
            <div className="bg-gray-800 border border-blue-900/50 rounded-lg p-6 space-y-2">
              <p className="font-semibold text-white">NexCRM</p>
              <p>Musterstraße 1</p>
              <p>12345 Berlin</p>
              <p>Deutschland</p>
            </div>
          </section>

          {/* Kontakt */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">2</span>
              Kontakt
            </h2>
            <div className="bg-gray-800 border border-blue-900/50 rounded-lg p-6 space-y-2">
              <p><strong>E-Mail:</strong> contact@nexcrm.de</p>
              <p><strong>Telefon:</strong> +49 30 12345678</p>
            </div>
          </section>

          {/* Verantwortlich */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">3</span>
              Verantwortlich für Inhalt
            </h2>
            <div className="bg-gray-800 border border-blue-900/50 rounded-lg p-6">
              <p>Gemäß § 7 Abs. 1 TMG ist der Anbieter als Diensteanbieter für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt und regelmäßig aktualisiert.</p>
            </div>
          </section>

          {/* Haftungsausschluss */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">4</span>
              Haftungsausschluss
            </h2>
            <div className="bg-gray-800 border border-blue-900/50 rounded-lg p-6 space-y-3 text-sm">
              <p><strong>Haftung für Inhalte:</strong> Die Inhalte dieser Website werden mit größter Sorgfalt zusammengestellt und regelmäßig aktualisiert. Dennoch kann eine Garantie für die Vollständigkeit, Richtigkeit und insbesondere die Aktualität nicht übernommen werden.</p>
              <p><strong>Haftung für Links:</strong> Wir sind für den Inhalt von verlinkten Seiten nicht verantwortlich, da diese außerhalb unseres Einflussbereichs liegen. Für illegale, fehlerhafte oder unvollständige Inhalte haften die Anbieter der Seiten, auf die verwiesen wird, selbst.</p>
            </div>
          </section>

          {/* Urheberrecht */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">5</span>
              Urheberrecht
            </h2>
            <div className="bg-gray-800 border border-blue-900/50 rounded-lg p-6">
              <p>Die Inhalte und Werke dieser Website unterliegen dem deutschen Urheberrecht. Eine Vervielfältigung, Verarbeitung, Verbreitung oder Speicherung dieser Inhalte ohne ausdrückliche Genehmigung ist untersagt. Alle Rechte vorbehalten.</p>
            </div>
          </section>

          {/* Datenschutz */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">6</span>
              Datenschutz
            </h2>
            <div className="bg-gray-800 border border-blue-900/50 rounded-lg p-6">
              <p>Weitere Informationen zum Datenschutz und zur Verarbeitung personenbezogener Daten finden Sie in unserer <a href="/datenschutz" className="text-blue-400 hover:text-blue-300 underline font-semibold">Datenschutzerklärung</a>.</p>
            </div>
          </section>

          {/* Letzte Änderung */}
          <div className="pt-8 border-t border-blue-900 text-center text-sm text-gray-500">
            <p>Letzte Änderung: Juni 2026</p>
            <p className="mt-2">© 2026 NexCRM. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Impressum