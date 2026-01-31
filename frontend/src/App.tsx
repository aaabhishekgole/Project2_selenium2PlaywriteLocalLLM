import { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import { ArrowRight, Code2, Terminal, Activity, CheckCircle2, AlertCircle } from 'lucide-react'
import './App.css'

function App() {
  const [health, setHealth] = useState<string>('Initializing...')
  const [sourceCode, setSourceCode] = useState<string>(`// Paste your Selenium Java code here...
public void testLogin() {
    System.setProperty("webdriver.chrome.driver", "path/to/driver");
    WebDriver driver = new ChromeDriver();
    driver.get("https://example.com");
    driver.findElement(By.id("login")).click();
}`)
  const [convertedCode, setConvertedCode] = useState<string>('// Playwright TypeScript will appear here...')
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
    setConvertedCode('// Generating Intelligence...');

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

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div className="badge-container">
          <div className={`status-dot`} style={{ color: health.includes('Offline') ? '#f87171' : 'inherit' }}></div>
          {health}
        </div>
        <h1 style={{ display: 'block', marginBottom: '0.5rem' }}>B.L.A.S.T. Engine</h1>
        <div style={{ color: '#94a3b8', fontSize: '1.2rem', fontFamily: 'Space Grotesk' }}>
          Selenium <span style={{ color: '#06b6d4', margin: '0 8px' }}>⚡</span> Playwright
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) auto minmax(400px, 1fr)', gap: '2rem', height: '65vh' }}>

        {/* Source Panel */}
        <div className="tech-panel">
          <div className="panel-header">
            <div className="panel-title">
              <Code2 size={18} color="#f59e0b" />
              <span>JAVA_SOURCE.java</span>
            </div>
            <Activity size={16} color="#64748b" />
          </div>
          <div style={{ flex: 1, padding: 0 }}>
            <Editor
              height="100%"
              defaultLanguage="java"
              theme="vs-dark"
              value={sourceCode}
              onChange={(val) => setSourceCode(val || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: 'JetBrains Mono',
                padding: { top: 20 },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                glyphMargin: false,
                folding: false
              }}
            />
          </div>
        </div>

        {/* Action Column */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <button
            className="cyber-btn"
            onClick={handleConvert}
            disabled={loading || health.includes('Offline')}
            title="Execute Conversion"
          >
            <ArrowRight size={24} />
          </button>
        </div>

        {/* Target Panel */}
        <div className="tech-panel">
          <div className="panel-header">
            <div className="panel-title">
              <Terminal size={18} color="#10b981" />
              <span>PLAYWRIGHT_TARGET.ts</span>
            </div>
            {error ? <AlertCircle size={16} color="#f87171" /> : <CheckCircle2 size={16} color="#10b981" />}
          </div>
          <div style={{ flex: 1, padding: 0, position: 'relative' }}>
            <Editor
              height="100%"
              defaultLanguage="typescript"
              theme="vs-dark"
              value={convertedCode}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: 'JetBrains Mono',
                padding: { top: 20 },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                readOnly: true,
                glyphMargin: false,
                folding: false
              }}
            />

            {/* Overlay Error Message */}
            {error && (
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(248,113,113,0.1)', borderTop: '1px solid #f87171', color: '#f87171', padding: '1rem', backdropFilter: 'blur(4px)' }}>
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '3rem', opacity: 0.5, fontSize: '0.8rem', letterSpacing: '0.1em' }}>
        SYSTEM READY // V2.0.4 [STABLE]
      </div>

    </div>
  )
}

export default App
