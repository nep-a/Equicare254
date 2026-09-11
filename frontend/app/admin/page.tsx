import styles from './dashboard.module.css';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className={styles.pageTitle}>Master Dashboard</h1>
      
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Total Onboarded Hospitals</div>
          <div className={styles.metricValue}>12</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Active Users (System-wide)</div>
          <div className={styles.metricValue} style={{ color: 'var(--color-status-success)' }}>4,892</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Pending Demo Requests</div>
          <div className={styles.metricValue} style={{ color: 'var(--color-status-warning)' }}>5</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Total MRR</div>
          <div className={styles.metricValue}>$42,500</div>
        </div>
      </div>

      <div className={styles.quickActions}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/admin/hospitals">
            <button className={styles.btnPrimary}>+ Onboard New Hospital</button>
          </Link>
          <Link href="/admin/marketing">
            <button className={styles.btnSecondary}>Draft Newsletter</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
