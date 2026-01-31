import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [health, setHealth] = useState<string>('Checking backend...')
  const [sourceCode, setSourceCode] = useState<string>('')
  const [convertedCode, setConvertedCode] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://localhost:3001/api/health')
      .then(res => res.json())
      .then(d => setHealth(`Online: ${d.agent}`))
      .catch(() => setHealth('Offline (Check Backend)'))
  }, [])

  const handleConvert = async () => {
    if (!sourceCode) return;
    setLoading(true);
    setError(null);
    setConvertedCode('');

    try {
      const res = await fetch('http://localhost:3001/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceCode })
      });
      const data = await res.json();

      if (data.status === 'SUCCESS') {
        setConvertedCode(data.convertedCode);
      } else {
        setError(data.errorLog || 'Unknown error occurred');
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-container">
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Selenium 2 Playwright</h1>
        <div className={`status-badge ${health.includes('Online') ? 'online' : 'offline'}`}
          style={{ padding: '0.5rem 1rem', borderRadius: '20px', background: health.includes('Online') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)', display: 'inline-block' }}>
          System Status: {health}
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

        {/* Input Panel */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3>Source: Java Selenium</h3>
          <textarea
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            placeholder="Paste your Java code here..."
            spellCheck={false}
          />
        </div>

        {/* Output Panel */}
        <div className="glass-panel" style={{ padding: '1.5rem', position: 'relative' }}>
          <h3>Target: Playwright TS</h3>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
              <div className="loader">Converting...</div>
            </div>
          ) : (
            <textarea
              value={convertedCode}
              readOnly
              placeholder="Result will appear here..."
              style={{ borderColor: error ? '#ef4444' : 'var(--glass-border)' }}
            />
          )}
          {error && <div style={{ color: '#ef4444', marginTop: '1rem' }}>Error: {error}</div>}
        </div>

      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button onClick={handleConvert} disabled={loading || !health.includes('Online')}>
          {loading ? 'Converting via Local AI...' : 'Convert Logic 🚀'}
        </button>
      </div>
    </div>
  )
}

export default App
