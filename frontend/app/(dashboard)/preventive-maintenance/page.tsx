import Link from 'next/link';
import styles from './maintenance.module.css';

const MOCK_PM = [
  { id: 'PM-2024-001', equipment: 'CE-000184 (Patient Monitor)', due: '2024-04-15', frequency: '6 Months', status: 'Upcoming', assigned: 'Unassigned' },
  { id: 'PM-2024-002', equipment: 'CE-000185 (Infusion Pump)', due: '2024-05-20', frequency: '12 Months', status: 'Upcoming', assigned: 'Unassigned' },
  { id: 'PM-2024-003', equipment: 'CE-000186 (Ventilator)', due: '2024-03-01', frequency: '6 Months', status: 'Overdue', assigned: 'John Doe' },
];

export default function MaintenanceList() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Preventive Maintenance (PM)</h1>
        <div className={styles.headerActions}>
          <button className={styles.btnSecondary}>PM Checklists</button>
          <button className={styles.btnPrimary}>+ Schedule PM</button>
        </div>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metricCard}>
          <div className={styles.metricValue}>142</div>
          <div className={styles.metricLabel}>PMs Due This Month</div>
        </div>
        <div className={styles.metricCard}>
          <div className={`${styles.metricValue} ${styles.valDanger}`}>12</div>
          <div className={styles.metricLabel}>Overdue PMs</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricValue}>94%</div>
          <div className={styles.metricLabel}>PM Completion Rate</div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>PM ID</th>
              <th>Equipment</th>
              <th>Due Date</th>
              <th>Frequency</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PM.map(pm => (
              <tr key={pm.id}>
                <td className={styles.pmId}>{pm.id}</td>
                <td className={styles.equipment}>{pm.equipment}</td>
                <td className={`${styles.date} ${pm.status === 'Overdue' ? styles.dateOverdue : ''}`}>{pm.due}</td>
                <td>{pm.frequency}</td>
                <td>
                  <span className={`${styles.statusBadge} ${
                    pm.status === 'Overdue' ? styles.statusDanger : styles.statusUpcoming
                  }`}>
                    {pm.status}
                  </span>
                </td>
                <td>{pm.assigned}</td>
                <td>
                  <button className={styles.btnExecute}>Execute PM</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
