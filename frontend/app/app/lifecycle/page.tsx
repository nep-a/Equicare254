import Link from 'next/link';
import styles from './lifecycle.module.css';

const MOCK_EOL_ASSETS = [
  { id: 'EQ-0912', name: 'GE MRI Scanner', department: 'Imaging', installDate: '2016-04-12', eolDate: '2026-04-12', tco: 'ks 1,240,000', replacementCost: 'ks 1,500,000' },
  { id: 'EQ-1442', name: 'Dräger Ventilator', department: 'ICU', installDate: '2019-11-05', eolDate: '2026-11-05', tco: 'ks 45,000', replacementCost: 'ks 38,000' },
  { id: 'EQ-0331', name: 'Philips Patient Monitor', department: 'ER', installDate: '2021-02-14', eolDate: '2026-02-14', tco: 'ks 12,500', replacementCost: 'ks 15,000' },
];

export default function LifecycleDashboard() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Lifecycle & Financial Planning</h1>
        <div className={styles.headerActions}>
          <button className={styles.btnSecondary}>Export CAPEX Forecast</button>
        </div>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metricCard}>
          <div className={styles.metricValue}>ks 4,250,000</div>
          <div className={styles.metricLabel}>Total Asset Value</div>
        </div>
        <div className={styles.metricCard}>
          <div className={`${styles.metricValue} ${styles.valDanger}`}>14</div>
          <div className={styles.metricLabel}>Assets Past EOL</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricValue}>ks 1,850,000</div>
          <div className={styles.metricLabel}>2027 Capital Replacement Need</div>
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>End of Life (EOL) Risk Assessment</h2>
        <p className={styles.cardSubtitle}>Equipment requiring immediate capital replacement planning.</p>
        
        <div className={styles.tableContainer}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Asset ID</th>
                <th>Equipment Name</th>
                <th>Department</th>
                <th>Install Date</th>
                <th>EOL Date</th>
                <th>Total Cost of Ownership (TCO)</th>
                <th>Est. Replacement Cost</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_EOL_ASSETS.map(asset => (
                <tr key={asset.id}>
                  <td className={styles.assetId}>{asset.id}</td>
                  <td className={styles.equipment}>{asset.name}</td>
                  <td>{asset.department}</td>
                  <td>{asset.installDate}</td>
                  <td className={styles.eolDate}>{asset.eolDate}</td>
                  <td className={styles.tco}>{asset.tco}</td>
                  <td>{asset.replacementCost}</td>
                  <td>
                    <button className={styles.btnSecondarySmall}>Flag for Disposal</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
