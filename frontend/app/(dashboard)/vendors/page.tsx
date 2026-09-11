import Link from 'next/link';
import styles from './vendors.module.css';

const MOCK_VENDORS = [
  { id: 'VND-001', name: 'Dräger Medical', type: 'Manufacturer', contact: 'support@draeger.com', phone: '+254 700 111 222', activeContracts: 2 },
  { id: 'VND-002', name: 'Philips Healthcare', type: 'Manufacturer', contact: 'service.ke@philips.com', phone: '+254 700 333 444', activeContracts: 1 },
  { id: 'VND-003', name: 'Mediparts Ltd', type: 'Supplier', contact: 'sales@mediparts.co.ke', phone: '+254 711 555 666', activeContracts: 0 },
];

const MOCK_CONTRACTS = [
  { id: 'CON-991', vendor: 'Dräger Medical', title: 'Comprehensive Service - Ventilators', start: '2023-01-01', end: '2025-12-31', status: 'Active' },
  { id: 'CON-992', vendor: 'Philips Healthcare', title: 'PM Only - Patient Monitors', start: '2022-06-01', end: '2024-05-31', status: 'Expiring Soon' },
];

export default function VendorsList() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Vendors & Contracts</h1>
        <div className={styles.headerActions}>
          <button className={styles.btnSecondary}>Add Contract</button>
          <button className={styles.btnPrimary}>+ Add Vendor</button>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Vendor Directory</h2>
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Vendor Name</th>
                  <th>Type</th>
                  <th>Contact</th>
                  <th>Contracts</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_VENDORS.map(v => (
                  <tr key={v.id}>
                    <td className={styles.vendorName}>{v.name}</td>
                    <td>{v.type}</td>
                    <td>
                      <div className={styles.contactEmail}>{v.contact}</div>
                      <div className={styles.contactPhone}>{v.phone}</div>
                    </td>
                    <td>{v.activeContracts}</td>
                    <td>
                      <button className={styles.btnSecondarySmall}>View Profile</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Active Contracts</h2>
          <div className={styles.contractList}>
            {MOCK_CONTRACTS.map(c => (
              <div key={c.id} className={styles.contractItem}>
                <div className={styles.contractHeader}>
                  <div className={styles.contractTitle}>{c.title}</div>
                  <span className={`${styles.statusBadge} ${
                    c.status === 'Expiring Soon' ? styles.badgeWarning : styles.badgeSuccess
                  }`}>
                    {c.status}
                  </span>
                </div>
                <div className={styles.contractVendor}>{c.vendor} ({c.id})</div>
                <div className={styles.contractDates}>Valid: {c.start} to {c.end}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
