"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './equipment.module.css';
import { apiClient } from '../../lib/apiClient';

export default function EquipmentList() {
  const [equipment, setEquipment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAssets() {
      try {
        const data = await apiClient('/assets');
        setEquipment(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAssets();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Equipment Assets</h1>
        <div className={styles.headerActions}>
          <button className={styles.btnSecondary}>Export</button>
          <button className={styles.btnPrimary}>+ Add Equipment</button>
        </div>
      </div>

      <div className={styles.filters}>
        <input type="text" placeholder="Search by ID, model, or serial..." className={styles.searchInput} />
        <select className={styles.selectInput}>
          <option>All Departments</option>
          <option>ICU</option>
          <option>Emergency</option>
        </select>
        <select className={styles.selectInput}>
          <option>All Statuses</option>
          <option>Operational</option>
          <option>Maintenance</option>
          <option>Out of Service</option>
        </select>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Asset ID</th>
              <th>Equipment</th>
              <th>Manufacturer & Model</th>
              <th>Location</th>
              <th>Status</th>
              <th>Risk</th>
              <th>Next PM</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={9} style={{ textAlign: 'center', padding: '2rem' }}>Loading assets...</td></tr>
            ) : error ? (
              <tr><td colSpan={9} style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>Error: {error}</td></tr>
            ) : equipment.length === 0 ? (
              <tr><td colSpan={9} style={{ textAlign: 'center', padding: '2rem' }}>No assets found.</td></tr>
            ) : equipment.map(asset => (
              <tr key={asset.id}>
                <td><input type="checkbox" /></td>
                <td className={styles.assetId}>
                  <Link href={`/app/equipment/${asset.id}`}>{asset.asset_number}</Link>
                </td>
                <td>{asset.equipment_model?.category || 'General Equipment'}</td>
                <td>
                  <div className={styles.mfg}>{asset.equipment_model?.manufacturer?.name || 'Unknown'}</div>
                  <div className={styles.model}>{asset.equipment_model?.model_number || 'Unknown'}</div>
                </td>
                <td>
                  <div className={styles.dept}>{asset.location_history?.[0]?.location?.department?.name || 'Unassigned'}</div>
                  <div className={styles.loc}>{asset.location_history?.[0]?.location?.name || 'Unknown'}</div>
                </td>
                <td>
                  <span className={`${styles.statusBadge} ${
                    asset.status === 'Operational' ? styles.statusSuccess : 
                    asset.status === 'Maintenance' ? styles.statusWarning : styles.statusError
                  }`}>
                    {asset.status}
                  </span>
                </td>
                <td>
                  <span className={`${styles.riskBadge} ${
                    asset.risk_level === 'Critical' ? styles.riskCritical : 
                    asset.risk_level === 'High' ? styles.riskHigh : styles.riskModerate
                  }`}>
                    {asset.risk_level || 'Moderate'}
                  </span>
                </td>
                <td>{asset.next_pm_date || 'N/A'}</td>
                <td>
                  <button className={styles.actionBtn}>⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
