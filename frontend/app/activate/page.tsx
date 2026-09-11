"use client";

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './activate.module.css';

export default function ActivateAccount() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError('Missing activation token.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
      
      const res = await fetch(`${BASE_URL}/users/invitation/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password, first_name: firstName, last_name: lastName })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.detail || 'Failed to activate account.');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Account Activated!</h1>
          <p className={styles.subtitle}>Your Equicare account is ready. Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Activate Account</h1>
        <p className={styles.subtitle}>Welcome to Equicare. Please complete your profile to activate your account.</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleActivate} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>First Name</label>
              <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label>Last Name</label>
              <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Set Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          
          <button type="submit" disabled={loading} className={styles.btnPrimary}>
            {loading ? 'Activating...' : 'Activate Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
