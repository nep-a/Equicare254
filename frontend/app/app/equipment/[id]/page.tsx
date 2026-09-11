import Link from 'next/link';
import styles from './assetDetail.module.css';

export default function AssetDetail({ params }: { params: { id: string } }) {
  // Mock data for the specific asset
  const asset = { 
    id: params.id, 
    type: 'Patient Monitor', 
    manufacturer: 'Philips', 
    model: 'IntelliVue MX450', 
    serial: 'PH-482910', 
    department: 'ICU', 
    location: 'Bed 03', 
    status: 'Operational', 
    risk: 'High',
    acquisitionDate: '2020-01-15',
    warrantyExpiry: '2025-01-15',
    purchaseCost: '$12,500'
  };

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Link href="/app/equipment">Equipment</Link> / <span>{asset.id}</span>
      </div>

      <div className={styles.headerCard}>
        <div className={styles.headerInfo}>
          <div className={styles.titleRow}>
            <h1 className={styles.assetName}>{asset.manufacturer} {asset.model}</h1>
            <span className={styles.statusBadge}>{asset.status}</span>
            <span className={styles.riskBadge}>{asset.risk} Risk</span>
          </div>
          <div className={styles.metaRow}>
            <span><strong>ID:</strong> {asset.id}</span>
            <span><strong>Type:</strong> {asset.type}</span>
            <span><strong>Serial:</strong> {asset.serial}</span>
            <span><strong>Location:</strong> {asset.department} - {asset.location}</span>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnSecondary}>Print QR</button>
          <button className={styles.btnPrimary}>Report Fault</button>
        </div>
      </div>

      <div className={styles.tabsContainer}>
        <div className={styles.tabsList}>
          <button className={`${styles.tab} ${styles.tabActive}`}>Overview</button>
          <button className={styles.tab}>Maintenance</button>
          <button className={styles.tab}>Work Orders</button>
          <button className={styles.tab}>Parts</button>
          <button className={styles.tab}>Location History</button>
        </div>
        
        <div className={styles.tabContent}>
          <div className={styles.grid2}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Equipment Details</h3>
              <div className={styles.detailList}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Acquisition Date</span>
                  <span className={styles.detailValue}>{asset.acquisitionDate}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Warranty Expiry</span>
                  <span className={styles.detailValue}>{asset.warrantyExpiry}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Purchase Cost</span>
                  <span className={styles.detailValue}>{asset.purchaseCost}</span>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Dynamic Attributes (Patient Monitor)</h3>
              <div className={styles.detailList}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Screen Size</span>
                  <span className={styles.detailValue}>12 inch</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Parameters</span>
                  <span className={styles.detailValue}>ECG, SpO2, NIBP, Temp</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Battery Type</span>
                  <span className={styles.detailValue}>Lithium-ion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
