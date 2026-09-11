import Link from 'next/link';
import styles from './inventory.module.css';

const MOCK_INVENTORY = [
  { id: 'PRT-9012', partNumber: 'SP-4421', description: 'O2 Sensor', manufacturer: 'Dräger', cost: 'ks 120.00', stock: 2, minStock: 5, location: 'Central Stores - Bin 4' },
  { id: 'PRT-9013', partNumber: 'MX-BAT-4', description: 'Li-Ion Battery Pack', manufacturer: 'Philips', cost: 'ks 350.00', stock: 12, minStock: 10, location: 'ICU Store' },
  { id: 'PRT-9014', partNumber: 'FL-990', description: 'Flow Sensor', manufacturer: 'Hamilton', cost: 'ks 85.00', stock: 0, minStock: 20, location: 'Central Stores - Bin 12' },
];

export default function InventoryList() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Spare Parts Inventory</h1>
        <div className={styles.headerActions}>
          <button className={styles.btnSecondary}>Purchase Orders</button>
          <button className={styles.btnPrimary}>+ Add Part</button>
        </div>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metricCard}>
          <div className={styles.metricValue}>1,402</div>
          <div className={styles.metricLabel}>Total Parts in Stock</div>
        </div>
        <div className={styles.metricCard}>
          <div className={`${styles.metricValue} ${styles.valDanger}`}>24</div>
          <div className={styles.metricLabel}>Low Stock Alerts</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricValue}>ks 42,500</div>
          <div className={styles.metricLabel}>Total Inventory Value</div>
        </div>
      </div>

      <div className={styles.filters}>
        <input type="text" placeholder="Search Part Number or Description..." className={styles.searchInput} />
        <select className={styles.selectInput}>
          <option>All Locations</option>
          <option>Central Stores</option>
          <option>ICU Store</option>
        </select>
        <select className={styles.selectInput}>
          <option>All Statuses</option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Part No.</th>
              <th>Description</th>
              <th>Manufacturer</th>
              <th>Location</th>
              <th>Cost</th>
              <th>Stock Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_INVENTORY.map(part => {
              const isLowStock = part.stock > 0 && part.stock <= part.minStock;
              const isOutOfStock = part.stock === 0;
              
              return (
                <tr key={part.id}>
                  <td className={styles.partNo}>{part.partNumber}</td>
                  <td className={styles.description}>{part.description}</td>
                  <td>{part.manufacturer}</td>
                  <td>{part.location}</td>
                  <td>{part.cost}</td>
                  <td>
                    <div className={styles.stockCell}>
                      <span className={styles.stockCount}>{part.stock}</span>
                      <span className={styles.minStock}>/ Min {part.minStock}</span>
                      {isOutOfStock ? (
                        <span className={styles.badgeDanger}>Out of Stock</span>
                      ) : isLowStock ? (
                        <span className={styles.badgeWarning}>Low Stock</span>
                      ) : null}
                    </div>
                  </td>
                  <td>
                    <button className={styles.btnSecondarySmall}>Adjust</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
