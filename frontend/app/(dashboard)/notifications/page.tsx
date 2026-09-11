import styles from './notifications.module.css';

const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'Alert', title: 'Low Stock Alert', message: 'Flow Sensor (FL-990) is out of stock in Central Stores.', time: '10 mins ago', read: false },
  { id: 2, type: 'Warning', title: 'Overdue Maintenance', message: '5 Patient Monitors in ICU have overdue PM schedules.', time: '1 hour ago', read: false },
  { id: 3, type: 'Info', title: 'Work Order Completed', message: 'WO-2023-0891 (Defibrillator) was completed by Sarah Jenkins.', time: '3 hours ago', read: true },
  { id: 4, type: 'Info', title: 'Contract Expiring', message: 'Philips Healthcare PM Contract expires in 30 days.', time: '1 day ago', read: true },
];

export default function NotificationsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Notifications</h1>
        <button className={styles.btnSecondary}>Mark all as read</button>
      </div>

      <div className={styles.list}>
        {MOCK_NOTIFICATIONS.map(n => (
          <div key={n.id} className={`${styles.card} ${!n.read ? styles.unread : ''}`}>
            <div className={styles.cardHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {!n.read && <div className={styles.unreadDot}></div>}
                <span className={`${styles.badge} ${
                  n.type === 'Alert' ? styles.badgeDanger : 
                  n.type === 'Warning' ? styles.badgeWarning : styles.badgeInfo
                }`}>
                  {n.type}
                </span>
                <span className={styles.title}>{n.title}</span>
              </div>
              <span className={styles.time}>{n.time}</span>
            </div>
            <p className={styles.message}>{n.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
