"use client";

import Link from 'next/link';
import styles from './workOrders.module.css';
import { useRealtimeWorkOrders } from '../../lib/useRealtimeWorkOrders';

export default function WorkOrdersList() {
  const { workOrders, loading, error } = useRealtimeWorkOrders();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Work Orders</h1>
        <div className={styles.headerActions}>
          <button className={styles.btnSecondary}>Export</button>
          <button className={styles.btnPrimary}>+ New Work Order</button>
        </div>
      </div>

      <div className={styles.filters}>
        <input type="text" placeholder="Search WO number or Equipment ID..." className={styles.searchInput} />
        <select className={styles.selectInput}>
          <option>All Types</option>
          <option>Corrective</option>
          <option>Preventive</option>
        </select>
        <select className={styles.selectInput}>
          <option>All Statuses</option>
          <option>New</option>
          <option>In Progress</option>
          <option>Awaiting Parts</option>
          <option>Completed</option>
        </select>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>WO Number</th>
              <th>Equipment</th>
              <th>Type & Priority</th>
              <th>Status</th>
              <th>Reported Fault</th>
              <th>Assigned To</th>
              <th>Downtime</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>Loading work orders...</td></tr>
            ) : error ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>Error: {error}</td></tr>
            ) : workOrders.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>No work orders found.</td></tr>
            ) : workOrders.map(wo => (
              <tr key={wo.id}>
                <td className={styles.woId}>
                  <Link href={`/app/work-orders/${wo.id}`}>{wo.wo_number}</Link>
                </td>
                <td>
                  <div className={styles.eqId}>{wo.asset?.asset_number || 'Unknown'}</div>
                  <div className={styles.eqType}>{wo.asset?.equipment_model?.category || 'General'}</div>
                </td>
                <td>
                  <div className={styles.woType}>{wo.maintenance_type}</div>
                  <div className={`${styles.priority} ${
                    wo.priority === 'Critical' ? styles.priCritical : 
                    wo.priority === 'High' ? styles.priHigh : styles.priNormal
                  }`}>{wo.priority}</div>
                </td>
                <td>
                  <span className={`${styles.statusBadge} ${
                    wo.status === 'New' ? styles.statusNew : 
                    wo.status === 'In Progress' ? styles.statusProgress : 
                    wo.status === 'Awaiting Parts' ? styles.statusWaiting : styles.statusDone
                  }`}>
                    {wo.status}
                  </span>
                </td>
                <td className={styles.faultCol}>
                  <span className={styles.faultText}>{wo.reported_fault || wo.title}</span>
                </td>
                <td>{wo.assigned_to?.first_name ? `${wo.assigned_to.first_name} ${wo.assigned_to.last_name}` : 'Unassigned'}</td>
                <td>-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
