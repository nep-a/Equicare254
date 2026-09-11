import Link from 'next/link';

export default function TermsPage() {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary-900)' }}>Terms of Service</h1>
      
      <div style={{ lineHeight: '1.7', color: 'var(--color-text-primary)' }}>
        <p style={{ marginBottom: '1rem' }}>Last updated: September 2026</p>
        <p style={{ marginBottom: '1rem' }}>
          By accessing and using the Equicare platform, your healthcare organization agrees to comply with these terms of service.
        </p>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Usage License</h2>
        <p style={{ marginBottom: '1rem' }}>
          Equicare grants you a non-exclusive, non-transferable enterprise license to use our platform for managing clinical engineering operations.
        </p>
      </div>
      
      <div style={{ marginTop: '3rem' }}>
        <Link href="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontWeight: 500 }}>&larr; Back to Home</Link>
      </div>
    </div>
  );
}
