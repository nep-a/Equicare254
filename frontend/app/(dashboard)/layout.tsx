import Link from 'next/link';
import styles from './appLayout.module.css';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.appContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Equicare</h2>
        </div>
        <nav className={styles.sidebarNav}>
          <div className={styles.navGroup}>
            <div className={styles.navGroupTitle}>Main</div>
            <Link href="/app/dashboard" className={styles.navLink}>Dashboard</Link>
          </div>
          <div className={styles.navGroup}>
            <div className={styles.navGroupTitle}>Operations</div>
            <Link href="/app/work-orders" className={styles.navLink}>Work Orders</Link>
            <Link href="/app/maintenance" className={styles.navLink}>Prev. Maintenance</Link>
            <Link href="/app/calibration" className={styles.navLink}>Calibration</Link>
          </div>
          <div className={styles.navGroup}>
            <div className={styles.navGroupTitle}>Assets & Supply</div>
            <Link href="/app/equipment" className={styles.navLink}>Equipment</Link>
            <Link href="/app/inventory" className={styles.navLink}>Inventory</Link>
            <Link href="/app/vendors" className={styles.navLink}>Vendors & Contracts</Link>
          </div>
          <div className={styles.navGroup}>
            <div className={styles.navGroupTitle}>Lifecycle</div>
            <Link href="/app/procurement" className={styles.navLink}>Procurement</Link>
            <Link href="/app/lifecycle" className={styles.navLink}>Financial Planning</Link>
          </div>
        </nav>
        <div className={styles.sidebarFooter}>
          <div className={styles.userProfile}>
            <div className={styles.avatar}>JD</div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>John Doe</div>
              <div className={styles.userRole}>System Admin</div>
            </div>
          </div>
        </div>
      </aside>
      <main className={styles.mainContent}>
        <header className={styles.topbar}>
          <div className={styles.breadcrumbs}>
            <span>Home</span> / <span className={styles.currentCrumb}>Dashboard</span>
          </div>
          <div className={styles.topbarActions}>
            <Link href="/app/notifications" className={styles.iconButton}>🔔</Link>
            <Link href="/app/settings" className={styles.iconButton}>⚙️</Link>
          </div>
        </header>
        <div className={styles.pageContent}>
          {children}
        </div>
      </main>
    </div>
  );
}
