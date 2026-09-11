'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { login } from './actions';
import styles from './login.module.css';

export default function Login() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: { error: string | null }, formData: FormData) => {
      const result = await login(formData);
      return result || prevState;
    },
    { error: null as string | null }
  );

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.logo}>Equicare</div>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Enter your credentials to access the platform</p>
        
        <form action={formAction} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email Address</label>
            <input type="email" id="email" name="email" className={styles.input} placeholder="name@hospital.org" required />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.labelRow}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <Link href="/forgot" className={styles.forgotLink}>Forgot password?</Link>
            </div>
            <input type="password" id="password" name="password" className={styles.input} placeholder="••••••••" required />
          </div>
          
          {state?.error && (
            <div className={styles.errorAlert}>{state.error}</div>
          )}

          <button type="submit" className={styles.btnSubmit} disabled={isPending}>
            {isPending ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
