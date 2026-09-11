import Link from 'next/link';
import styles from './dashboard.module.css';

export default function Dashboard() {
  return (
    <div>
      <h1 className={styles.pageTitle}>Engineering Dashboard</h1>
      
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Total Equipment</div>
          <div className={styles.metricValue}>2,451</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Operational</div>
          <div className={styles.metricValue} style={{ color: 'var(--color-status-success)' }}>2,104</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Under Maintenance</div>
          <div className={styles.metricValue} style={{ color: 'var(--color-status-warning)' }}>312</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Out of Service</div>
          <div className={styles.metricValue} style={{ color: 'var(--color-status-error)' }}>35</div>
        </div>
      </div>

      <div className={styles.sectionHeader}>
        <h2>Requires Attention</h2>
      </div>
      
      <div className={styles.alertCard}>
        <div className={styles.alertIcon}>⚠️</div>
        <div className={styles.alertContent}>
          <div className={styles.alertTitle}>5 Preventive Maintenance schedules are overdue</div>
          <div className={styles.alertDesc}>ICU Patient Monitors (Philips MX450)</div>
        </div>
        <Link href="/app/maintenance">
          <button className={styles.btnSmall}>View Assets</button>
        </Link>
      </div>
    </div>
  );
}
