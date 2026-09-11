import Link from 'next/link';

export default function ContactPage() {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', minHeight: '80vh', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary-900)' }}>Contact Us</h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Have questions? We're here to help you optimize your clinical engineering department.
      </p>
      
      <div style={{ padding: '3rem', backgroundColor: 'var(--color-surface-gray)', borderRadius: '8px', border: '1px solid var(--color-border)', textAlign: 'left' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Get in Touch</h2>
        <p style={{ marginBottom: '0.5rem' }}><strong>Email:</strong> support@equicare.health</p>
        <p style={{ marginBottom: '0.5rem' }}><strong>Phone:</strong> +254 700 000 000</p>
        <p><strong>HQ:</strong> Nairobi, Kenya</p>
      </div>
      
      <div style={{ marginTop: '3rem' }}>
        <Link href="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontWeight: 500 }}>&larr; Back to Home</Link>
      </div>
    </div>
  );
}
