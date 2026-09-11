import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary-900)' }}>About Equicare</h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        We are on a mission to modernize clinical engineering.
      </p>
      
      <div style={{ lineHeight: '1.7' }}>
        <p style={{ marginBottom: '1rem' }}>
          Equicare was founded with a singular focus: to provide healthcare organizations with a robust, intuitive, and highly scalable platform for managing medical equipment and engineering operations.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          We believe that clinical engineers are the unsung heroes of healthcare. By giving them the right tools to manage preventive maintenance, corrective actions, and supply chains, we help hospitals ensure patient safety and optimize capital expenditure.
        </p>
        <p>
          Initially built for the dynamic and demanding environments of Kenyan healthcare facilities, Equicare is architected to scale internationally, supporting advanced organizational hierarchies and offline-ready mobile workflows.
        </p>
      </div>
      
      <div style={{ marginTop: '3rem' }}>
        <Link href="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontWeight: 500 }}>&larr; Back to Home</Link>
      </div>
    </div>
  );
}
