import styles from '../dashboard.module.css';

export default function MarketingPage() {
  return (
    <div>
      <h1 className={styles.pageTitle}>Marketing & Newsletters</h1>

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 2 }} className={styles.quickActions}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Draft New Email</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>To (Audience)</label>
              <select style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <option>All Active Hospital Admins</option>
                <option>Pending Demo Leads</option>
                <option>System Users</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Subject Line</label>
              <input type="text" placeholder="e.g. New Feature Release: Predictive Maintenance" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Message Body</label>
              <textarea rows={10} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontFamily: 'inherit', resize: 'vertical' }} placeholder="Write your email content here..."></textarea>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button className={styles.btnPrimary}>Send Email Blast</button>
              <button className={styles.btnSecondary}>Save Draft</button>
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }} className={styles.quickActions}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Recent Campaigns</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Equicare v2.0 Launch</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Sent: Aug 15, 2026</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-status-success)', marginTop: '0.5rem', fontWeight: 600 }}>452 Opened (68%)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
