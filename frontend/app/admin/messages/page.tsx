import styles from '../dashboard.module.css';

const MOCK_MESSAGES = [
  { id: 'MSG-001', type: 'Demo Request', name: 'Dr. Sarah Kamau', hospital: 'Aga Khan Hospital', email: 'skamau@agakhan.org', date: '2 hours ago', status: 'Unread' },
  { id: 'MSG-002', type: 'Contact', name: 'James Ochieng', hospital: 'Kenyatta National', email: 'j.ochieng@knh.go.ke', date: '1 day ago', status: 'Read' },
  { id: 'MSG-003', type: 'Demo Request', name: 'Dr. Patel', hospital: 'MP Shah', email: 'admin@mpshah.com', date: '2 days ago', status: 'Contacted' },
];

export default function MessagesPage() {
  return (
    <div>
      <h1 className={styles.pageTitle}>Inbox & Demo Requests</h1>

      <div className={styles.quickActions}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <button className={styles.btnPrimary}>All Messages</button>
          <button className={styles.btnSecondary}>Unread (1)</button>
          <button className={styles.btnSecondary}>Demo Requests</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {MOCK_MESSAGES.map(msg => (
            <div key={msg.id} style={{ 
              border: '1px solid var(--color-border)', 
              borderRadius: 'var(--radius-md)', 
              padding: '1.5rem',
              borderLeft: msg.status === 'Unread' ? '4px solid var(--color-primary-600)' : '1px solid var(--color-border)',
              backgroundColor: msg.status === 'Unread' ? 'var(--color-primary-50)' : 'white'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ fontWeight: 600, fontSize: '1.125rem' }}>{msg.type} - {msg.hospital}</div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{msg.date}</div>
              </div>
              <div style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                From: {msg.name} ({msg.email})
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className={styles.btnPrimary} style={{ padding: '0.25rem 1rem', fontSize: '0.875rem' }}>Reply</button>
                <button className={styles.btnSecondary} style={{ padding: '0.25rem 1rem', fontSize: '0.875rem' }}>Mark Contacted</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
