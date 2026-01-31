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
      .then(() => setHealth(`System Online`))
      .catch(() => setHealth('System Offline'))
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
      <header style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div className={`status-pill ${health.includes('Offline') ? 'offline' : ''}`}>
            <div className="status-indicator"></div>
            {health}
          </div>
        </div>
        <h1>Java <span style={{ opacity: 0.5, margin: '0 10px' }}>→</span> Playwright</h1>
        <div className="sub-text">Intelligent Agency Migration Assistant</div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'stretch' }}>

        {/* Input Panel */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '600px' }}>
          <div className="panel-header">
            <div className="panel-title">
              <span style={{ color: '#F59E0B' }}>☕</span> Java Source
            </div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Selenium/TestNG</div>
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <textarea
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
              placeholder="// Paste legacy Selenium code here..."
              spellCheck={false}
            />
          </div>
        </div>

        {/* Action Column */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
          <button
            className="convert-btn"
            onClick={handleConvert}
            disabled={loading || health.includes('Offline')}
            style={{ borderRadius: '50%', aspectRatio: '1/1', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
            title="Convert"
          >
            {loading ? '...' : '→'}
          </button>
        </div>

        {/* Output Panel */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '600px' }}>
          <div className="panel-header">
            <div className="panel-title">
              <span style={{ color: '#2ECC71' }}>🎭</span> Playwright Output
            </div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>TypeScript</div>
          </div>
          <div style={{ flex: 1, position: 'relative', display: 'flex' }}>
            {loading ? (
              <div style={{ margin: 'auto', textAlign: 'center' }}>
                <div className="loader"></div>
                <p style={{ marginTop: '1.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>Analyizing & Refactoring...</p>
              </div>
            ) : (
              <textarea
                value={convertedCode}
                readOnly
                placeholder="// Modern Playwright code will appear here..."
                style={{ color: error ? '#f87171' : '#e2e8f0' }}
              />
            )}
            {error && !loading && (
              <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', color: '#f87171', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}
          </div>
        </div>

      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <button className="convert-btn" onClick={handleConvert} disabled={loading || health.includes('Offline')}>
          {loading ? 'Processing logic...' : 'Initialize Conversion'}
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '4rem', color: 'rgba(255,255,255,0.1)', fontSize: '0.8rem' }}>
        POWERED BY ANTIGRAVITY & DEEPSEEK
      </div>
    </div>
  )
}

export default App
