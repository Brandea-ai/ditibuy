export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'linear-gradient(135deg, #0066B3 0%, #00A3E0 100%)',
    }}>
      <div style={{
        maxWidth: '800px',
        textAlign: 'center',
        color: 'white',
      }}>
        {/* Logo Placeholder */}
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'white',
          margin: '0 auto 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
        }}>
          🏔️
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700,
          marginBottom: '1rem',
          lineHeight: 1.2,
        }}>
          BayernAnkauf
        </h1>

        <p style={{
          fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
          fontWeight: 500,
          marginBottom: '2rem',
          opacity: 0.95,
        }}>
          Elektronik verkaufen in Bayern
        </p>

        {/* Coming Soon Badge */}
        <div style={{
          display: 'inline-block',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: '9999px',
          padding: '1rem 2rem',
          marginBottom: '2rem',
        }}>
          <span style={{
            fontSize: '1.25rem',
            fontWeight: 600,
          }}>
            🚀 Coming Soon
          </span>
        </div>

        {/* Description */}
        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.7,
          opacity: 0.9,
          maxWidth: '600px',
          margin: '0 auto 3rem',
        }}>
          Verkaufen Sie Ihre gebrauchten Smartphones, Tablets und Laptops
          schnell und sicher. Faire Preise, schnelle Auszahlung –
          exklusiv für Bayern.
        </p>

        {/* Features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}>
          {[
            { icon: '💰', title: 'Faire Preise', desc: 'Transparente Kalkulation' },
            { icon: '⚡', title: 'Schnelle Auszahlung', desc: 'Innerhalb von 48h' },
            { icon: '🔒', title: 'Sicher & DSGVO', desc: 'Datenschutz garantiert' },
          ].map((feature, i) => (
            <div key={i} style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem',
              padding: '1.5rem',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p style={{
          fontSize: '0.875rem',
          opacity: 0.7,
        }}>
          Ein Projekt von <strong>Brandea</strong> · Phase 1 in Entwicklung
        </p>
      </div>
    </main>
  )
}
