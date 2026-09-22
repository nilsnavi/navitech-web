export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        🚀 Navitech CRM
      </h1>
      <p style={{ color: '#666', fontSize: '1.1rem' }}>
        Система управления взаимоотношениями с клиентами
      </p>
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <p>✅ Приложение работает!</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#888' }}>health: /api/health</p>
      </div>
    </div>
  )
}
