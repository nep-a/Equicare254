import Link from 'next/link';
import styles from './procurement.module.css';

const MOCK_REQUESTS = [
  { id: 'REQ-2026-041', equipment: 'Portable X-Ray Machine', department: 'Radiology', cost: 'ks 45,000', status: 'Approved', expectedDelivery: '2026-10-15' },
  { id: 'REQ-2026-042', equipment: 'Anesthesia Machine', department: 'Surgery', cost: 'ks 32,000', status: 'Requested', expectedDelivery: 'TBD' },
  { id: 'REQ-2026-043', equipment: 'Defibrillator', department: 'ICU', cost: 'ks 8,500', status: 'Ordered', expectedDelivery: '2026-09-20' },
  { id: 'REQ-2026-044', equipment: 'Infusion Pump (x5)', department: 'Pediatrics', cost: 'ks 12,000', status: 'Delivered', expectedDelivery: '2026-09-05' },
];

export default function ProcurementList() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Procurement & Capital Requests</h1>
        <div className={styles.headerActions}>
          <button className={styles.btnSecondary}>Export Report</button>
          <button className={styles.btnPrimary}>+ New Request</button>
        </div>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metricCard}>
          <div className={styles.metricValue}>12</div>
          <div className={styles.metricLabel}>Pending Requests</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricValue}>ks 185,000</div>
          <div className={styles.metricLabel}>Total Approved Budget (YTD)</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricValue}>3</div>
          <div className={styles.metricLabel}>Pending Commissioning</div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Request No.</th>
              <th>Equipment Name</th>
              <th>Department</th>
              <th>Est. Cost</th>
              <th>Status</th>
              <th>Expected Delivery</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_REQUESTS.map(req => (
              <tr key={req.id}>
                <td className={styles.reqNo}>{req.id}</td>
                <td className={styles.equipment}>{req.equipment}</td>
                <td>{req.department}</td>
                <td>{req.cost}</td>
                <td>
                  <span className={`${styles.badge} ${
                    req.status === 'Requested' ? styles.badgeNeutral :
                    req.status === 'Approved' ? styles.badgeSuccess :
                    req.status === 'Ordered' ? styles.badgeInfo :
                    styles.badgeDelivered
                  }`}>
                    {req.status}
                  </span>
                </td>
                <td>{req.expectedDelivery}</td>
                <td>
                  <button className={styles.btnSecondarySmall}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
