import styles from '../dashboard.module.css';

const MOCK_JOBS = [
  { id: 'JOB-101', title: 'Senior Full Stack Engineer', dept: 'Engineering', location: 'Nairobi, Kenya', type: 'Full-time', status: 'Active' },
  { id: 'JOB-102', title: 'Clinical Product Specialist', dept: 'Product', location: 'Remote', type: 'Full-time', status: 'Active' },
  { id: 'JOB-103', title: 'Healthcare Sales Executive', dept: 'Sales', location: 'Mombasa, Kenya', type: 'Full-time', status: 'Closed' },
];

export default function CareersPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className={styles.pageTitle} style={{ marginBottom: 0 }}>Careers CMS</h1>
        <button className={styles.btnPrimary}>+ Post New Job</button>
      </div>

      <div className={styles.quickActions}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
              <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Job Title</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Department</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Location</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Status</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_JOBS.map(job => (
              <tr key={job.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '1rem', fontWeight: 600 }}>{job.title}</td>
                <td style={{ padding: '1rem' }}>{job.dept}</td>
                <td style={{ padding: '1rem' }}>{job.location}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '999px', 
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    backgroundColor: job.status === 'Active' ? 'var(--color-status-success-bg)' : 'var(--color-surface-gray)',
                    color: job.status === 'Active' ? 'var(--color-status-success)' : 'var(--color-text-muted)'
                  }}>
                    {job.status}
                  </span>
                </td>
                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <button className={styles.btnSecondary} style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
