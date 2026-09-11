import Link from 'next/link';

export default function RequestDemoPage() {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary-900)' }}>Request a Demo</h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)' }}>
          See how Equicare can transform your hospital's clinical engineering operations. Submit your details, and our team will contact you for onboarding.
        </p>
      </div>
      
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Hospital / Organization Name</label>
          <input type="text" style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} placeholder="e.g. National General Hospital" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>First Name</label>
            <input type="text" style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Last Name</label>
            <input type="text" style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Work Email</label>
          <input type="email" style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} placeholder="name@hospital.org" />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Phone Number</label>
          <input type="tel" style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
        </div>
        <button type="button" style={{ 
          backgroundColor: 'var(--color-primary-600)', 
          color: 'white', 
          padding: '1rem', 
          borderRadius: '6px', 
          border: 'none', 
          fontWeight: 600, 
          fontSize: '1rem',
          cursor: 'pointer',
          marginTop: '1rem'
        }}>
          Submit Request
        </button>
      </form>
      
      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <Link href="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontWeight: 500 }}>Return to Homepage</Link>
      </div>
    </div>
  );
}
