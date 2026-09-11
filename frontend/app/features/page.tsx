import Link from 'next/link';

export default function FeaturesPage() {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary-900)' }}>Equicare Features</h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Discover how our enterprise platform streamlines your clinical engineering department.
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Asset Management</h2>
          <p>Track equipment history, lifecycle status, and dynamic attributes customized per equipment type. From acquisition to disposal, keep a complete audit trail.</p>
        </div>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Preventive Maintenance</h2>
          <p>Automate PM scheduling with detailed checklists, measurements, and engineering sign-offs. Ensure compliance with local regulations and manufacturer guidelines.</p>
        </div>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Inventory & Contracts</h2>
          <p>Manage spare parts inventory across multiple facilities. Monitor vendor service level agreements (SLAs) and warranty expirations.</p>
        </div>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Mobile Workflows</h2>
          <p>Scan. Identify. Act. Instantly view asset history and report breakdowns from the mobile interface, even when offline.</p>
        </div>
      </div>
      
      <div style={{ marginTop: '3rem' }}>
        <Link href="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontWeight: 500 }}>&larr; Back to Home</Link>
      </div>
    </div>
  );
}
