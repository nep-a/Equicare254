import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary-900)' }}>Privacy Policy</h1>
      
      <div style={{ lineHeight: '1.7', color: 'var(--color-text-primary)' }}>
        <p style={{ marginBottom: '1rem' }}>Last updated: September 2026</p>
        <p style={{ marginBottom: '1rem' }}>
          At Equicare, we take your privacy seriously. This policy outlines how we collect, use, and protect your data when you use our Clinical Engineering Management System.
        </p>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Data Collection</h2>
        <p style={{ marginBottom: '1rem' }}>
          We collect operational data related to medical equipment, maintenance schedules, and personnel interactions to provide you with enterprise-grade asset management. Patient Health Information (PHI) is not typically stored in our system, but we adhere to strict healthcare compliance standards for all data.
        </p>
      </div>
      
      <div style={{ marginTop: '3rem' }}>
        <Link href="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontWeight: 500 }}>&larr; Back to Home</Link>
      </div>
    </div>
  );
}
