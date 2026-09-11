import styles from '../dashboard.module.css';

const MOCK_HOSPITALS = [
  { id: 'ORG-001', name: 'Nairobi National Hospital', tier: 'Enterprise', status: 'Active', users: 145, joined: '2025-01-15' },
  { id: 'ORG-002', name: 'Coast General', tier: 'Professional', status: 'Active', users: 42, joined: '2025-03-22' },
  { id: 'ORG-003', name: 'Rift Valley Clinic', tier: 'Standard', status: 'Pending', users: 0, joined: '2026-09-10' },
];

export default function HospitalsPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className={styles.pageTitle} style={{ marginBottom: 0 }}>Hospital Management</h1>
        <button className={styles.btnPrimary}>+ Onboard New Hospital</button>
      </div>

      <div className={styles.quickActions}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
              <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Hospital Name</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>License Tier</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Status</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Active Users</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Joined Date</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_HOSPITALS.map(h => (
              <tr key={h.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '1rem', fontWeight: 600 }}>{h.name}</td>
                <td style={{ padding: '1rem' }}>{h.tier}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '999px', 
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    backgroundColor: h.status === 'Active' ? 'var(--color-status-success-bg)' : 'var(--color-status-warning-bg)',
                    color: h.status === 'Active' ? 'var(--color-status-success)' : 'var(--color-status-warning)'
                  }}>
                    {h.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>{h.users}</td>
                <td style={{ padding: '1rem' }}>{h.joined}</td>
                <td style={{ padding: '1rem' }}>
                  <button className={styles.btnSecondary} style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
