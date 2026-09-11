"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className={styles.main}>
      {/* Navigation Bar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-white)' }}>
        <div style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-primary-700)' }}>Equicare</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/request-demo" className={styles.btnPrimary} style={{ padding: '0.5rem 1rem' }}>Request Demo</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContainer}`}>
          <div className={`${styles.heroContent} ${styles.animateFadeInLeft}`}>
            <h1 className={`${styles.heroTitle} ${isScrolled ? styles.italicText : ''}`}>
              Equicare
            </h1>
            <p className={`${styles.heroSubtitle} ${isScrolled ? styles.italicText : ''}`}>
              Manage every medical device, maintenance task, service contract, spare part, and engineering workflow from one powerful platform designed for healthcare organizations.
            </p>
            <div className={styles.buttonGroup}>
              <Link href="/request-demo" className={styles.btnPrimary}>Request a Demo</Link>
              <Link href="/features" className={styles.btnSecondaryLight}>Explore the Platform</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section style={{ padding: '4rem 0', textAlign: 'center', borderBottom: '1px solid var(--color-border)' }} className={styles.animateFadeInUpDelay1}>
        <div className="container">
          <p style={{ color: 'var(--color-text-muted)', fontWeight: 500, marginBottom: '2rem' }}>TRUSTED BY CLINICAL ENGINEERING TEAMS NATIONWIDE</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', color: 'var(--color-text-secondary)', fontWeight: 600, fontSize: '1.25rem', flexWrap: 'wrap' }}>
            <span>Enterprise Security</span>
            <span>Complete Visibility</span>
            <span>Offline-Ready Workflows</span>
          </div>
        </div>
      </section>

      {/* Problem / Solution Section */}
      <section className={styles.features}>
        <div className="container">
          <h2 className={`${styles.sectionTitle} ${styles.animateFadeInUpDelay2}`}>Medical equipment management shouldn't live in spreadsheets.</h2>
          <div className={`${styles.grid} ${styles.animateFadeInUpDelay3}`}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <h3 className={styles.cardTitle}>Asset Management</h3>
              <p className={styles.cardText}>Track equipment history, lifecycle status, and dynamic attributes customized per equipment type.</p>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
              </div>
              <h3 className={styles.cardTitle}>Preventive Maintenance</h3>
              <p className={styles.cardText}>Automate PM scheduling with detailed checklists, measurements, and engineering sign-offs.</p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
              </div>
              <h3 className={styles.cardTitle}>QR Code Workflows</h3>
              <p className={styles.cardText}>Scan. Identify. Act. Instantly view asset history and report breakdowns from the mobile interface.</p>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section style={{ padding: '6rem 0', textAlign: 'center', backgroundColor: 'var(--color-primary-900)', color: 'white' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Bring your clinical engineering operation into one system.</h2>
          <div className={styles.buttonGroup}>
            <Link href="/request-demo" className={styles.btnPrimary} style={{ backgroundColor: 'white', color: 'var(--color-primary-900)' }}>Request a Demo</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={`container ${styles.footerGrid}`}>
          <div className={styles.footerBrand}>
            <h3 className={styles.footerLogo}>Equicare</h3>
            <p className={styles.footerText}>
              The intelligent clinical engineering management system designed to optimize healthcare operations, maintenance, and asset lifecycles.
            </p>
          </div>
          <div className={styles.footerLinks}>
            <h4 className={styles.footerHeading}>Product</h4>
            <Link href="/features">Asset Management</Link>
            <Link href="/features">Preventive Maintenance</Link>
            <Link href="/features">Inventory & Contracts</Link>
            <Link href="/features">Mobile Workflows</Link>
          </div>
          <div className={styles.footerLinks}>
            <h4 className={styles.footerHeading}>Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className={styles.footerLinks}>
            <h4 className={styles.footerHeading}>Legal</h4>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/security">Security</Link>
          </div>
        </div>
        <div className="container">
          <div className={styles.footerBottom}>
            <p>&copy; {new Date().getFullYear()} Equicare. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Sticky Demo Bar */}
      <div className={styles.stickyDemoBar}>
        <div className={`container ${styles.stickyDemoContent}`}>
          <div className={styles.stickyDemoText}>
            <strong>Ready to transform your clinical engineering?</strong>
            <span className={styles.stickyDemoSubtext}> Request a demo and our team will onboard your hospital.</span>
          </div>
          <Link href="/request-demo" className={styles.btnPrimary}>Request a Demo</Link>
        </div>
      </div>
    </main>
  );
}
