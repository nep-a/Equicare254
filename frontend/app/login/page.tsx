import Link from 'next/link';
import styles from './login.module.css';

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.logo}>Equicare</div>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Enter your credentials to access the platform</p>
        
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email Address</label>
            <input type="email" id="email" className={styles.input} placeholder="name@hospital.org" />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.labelRow}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <Link href="/forgot" className={styles.forgotLink}>Forgot password?</Link>
            </div>
            <input type="password" id="password" className={styles.input} placeholder="••••••••" />
          </div>
          <Link href="/app/dashboard" className={styles.btnSubmit}>Sign In</Link>
        </form>
      </div>
    </div>
  );
}
