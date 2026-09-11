import Link from 'next/link';

export default function CareersPage() {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', minHeight: '80vh', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary-900)' }}>Join Our Team</h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        We're looking for passionate engineers, designers, and healthcare experts to build the future of clinical operations.
      </p>
      
      <div style={{ padding: '3rem', backgroundColor: 'var(--color-surface-gray)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Open Positions</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>There are no open positions at this time. Please check back later!</p>
      </div>
      
      <div style={{ marginTop: '3rem' }}>
        <Link href="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontWeight: 500 }}>&larr; Back to Home</Link>
      </div>
    </div>
  );
}
