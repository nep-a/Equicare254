import styles from './settings.module.css';

export default function SettingsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Settings</h1>

      <div className={styles.layout}>
        <div className={styles.sidebar}>
          <div className={`${styles.navItem} ${styles.active}`}>My Profile</div>
          <div className={styles.navItem}>Hospital Preferences</div>
          <div className={styles.navItem}>User Roles & Permissions</div>
          <div className={styles.navItem}>Notifications</div>
          <div className={styles.navItem}>Integrations</div>
        </div>

        <div className={styles.content}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>My Profile</h2>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name</label>
              <input type="text" className={styles.input} defaultValue="John Doe" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <input type="email" className={styles.input} defaultValue="john.doe@hospital.org" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Role</label>
              <input type="text" className={styles.input} defaultValue="System Admin" disabled />
            </div>

            <button className={styles.btnPrimary}>Save Changes</button>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Change Password</h2>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Current Password</label>
              <input type="password" className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>New Password</label>
              <input type="password" className={styles.input} />
            </div>

            <button className={styles.btnSecondary}>Update Password</button>
          </div>
        </div>
      </div>
    </div>
  );
}
