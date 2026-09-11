import Link from 'next/link';
import styles from './calibration.module.css';

const MOCK_CALIBRATIONS = [
  { id: 'CAL-2023-110', equipment: 'Fluke ProSim 8 (Test Inst)', type: 'Test Instrument', lastCal: '2023-01-15', nextDue: '2024-01-15', vendor: 'Fluke Biomedical', status: 'Valid' },
  { id: 'CAL-2023-111', equipment: 'CE-000184 (Patient Monitor)', type: 'Medical Device', lastCal: '2022-10-20', nextDue: '2023-10-20', vendor: 'Internal', status: 'Expired' },
];

export default function CalibrationList() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Calibration Management</h1>
        <div className={styles.headerActions}>
          <button className={styles.btnPrimary}>+ Log Calibration</button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Equipment / Instrument</th>
              <th>Type</th>
              <th>Last Calibration</th>
              <th>Next Due</th>
              <th>Vendor</th>
              <th>Status</th>
              <th>Certificate</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_CALIBRATIONS.map(cal => (
              <tr key={cal.id}>
                <td className={styles.calId}>{cal.id}</td>
                <td className={styles.equipment}>{cal.equipment}</td>
                <td>{cal.type}</td>
                <td>{cal.lastCal}</td>
                <td className={`${styles.date} ${cal.status === 'Expired' ? styles.dateOverdue : ''}`}>{cal.nextDue}</td>
                <td>{cal.vendor}</td>
                <td>
                  <span className={`${styles.statusBadge} ${
                    cal.status === 'Expired' ? styles.statusDanger : styles.statusValid
                  }`}>
                    {cal.status}
                  </span>
                </td>
                <td>
                  <button className={styles.btnSecondary}>View Cert</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
