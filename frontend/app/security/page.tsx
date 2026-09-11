import Link from 'next/link';

export default function SecurityPage() {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary-900)' }}>Enterprise Security</h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Protecting your hospital's operational data is our top priority.
      </p>
      
      <div style={{ lineHeight: '1.7', color: 'var(--color-text-primary)' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Data Isolation</h2>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Every healthcare organization's data is strictly isolated at the database level using Organization IDs, ensuring data leakage is mathematically impossible.
        </p>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Role-Based Access Control (RBAC)</h2>
        <p style={{ marginBottom: '1rem' }}>
          Granular permissions ensure that technicians, managers, and hospital administrators only see the data and actions relevant to their specific roles.
        </p>
      </div>
      
      <div style={{ marginTop: '3rem' }}>
        <Link href="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontWeight: 500 }}>&larr; Back to Home</Link>
      </div>
    </div>
  );
}
