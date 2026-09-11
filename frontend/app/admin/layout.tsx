import Link from 'next/link';
import styles from './adminLayout.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Equicare</h2>
          <span className={styles.adminBadge}>SUPER ADMIN</span>
        </div>
        
        <nav className={styles.sidebarNav}>
          <div className={styles.navGroup}>
            <div className={styles.navGroupTitle}>Overview</div>
            <Link href="/admin" className={styles.navLink}>Dashboard</Link>
          </div>
          
          <div className={styles.navGroup}>
            <div className={styles.navGroupTitle}>Client Management</div>
            <Link href="/admin/hospitals" className={styles.navLink}>Hospital Management</Link>
            <Link href="/admin/messages" className={styles.navLink}>Demo Requests / Inbox</Link>
          </div>
          
          <div className={styles.navGroup}>
            <div className={styles.navGroupTitle}>Public Website</div>
            <Link href="/admin/marketing" className={styles.navLink}>Marketing & Newsletter</Link>
            <Link href="/admin/careers" className={styles.navLink}>Careers & Job Postings</Link>
          </div>
        </nav>
        
        <div className={styles.sidebarFooter}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-primary-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>SA</div>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Super Admin</div>
              <Link href="/" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Logout to Public Site</Link>
            </div>
          </div>
        </div>
      </aside>
      
      <main className={styles.mainContent}>
        <header className={styles.topbar}>
          <div style={{ fontWeight: 500, color: 'var(--color-text-secondary)' }}>
            Equicare Master Control
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}>🔔</button>
          </div>
        </header>
        <div className={styles.pageContent}>
          {children}
        </div>
      </main>
    </div>
  );
}
