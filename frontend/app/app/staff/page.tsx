"use client";

import { useEffect, useState } from 'react';
import styles from './staff.module.css';
import { apiClient } from '../../lib/apiClient';

export default function StaffManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Invite Modal State
  const [showModal, setShowModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Technician');
  const [inviteMsg, setInviteMsg] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await apiClient('/users');
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteMsg('Sending invitation...');
    try {
      // Assuming you have department/facility IDs in real scenario
      const payload = {
        email: inviteEmail,
        role_name: inviteRole,
        facility_id: null,
        department_id: null
      };
      const res = await apiClient('/users/invite', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      setInviteMsg(`Success! Link: ${res.invitation_link}`);
      fetchUsers(); // refresh list
    } catch (err: any) {
      setInviteMsg(`Error: ${err.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Staff Management</h1>
        <button className={styles.btnPrimary} onClick={() => setShowModal(true)}>+ Invite Staff Member</button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Facility</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>Loading staff...</td></tr>
            ) : error ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>{error}</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No staff found.</td></tr>
            ) : users.map(user => (
              <tr key={user.id}>
                <td>{user.first_name ? `${user.first_name} ${user.last_name}` : '-'}</td>
                <td>{user.email}</td>
                <td>{user.role_name || 'Staff'}</td>
                <td>{user.facility_id || 'All'}</td>
                <td>
                  <span className={`${styles.statusBadge} ${
                    user.account_status === 'ACTIVE' ? styles.statusActive : styles.statusPending
                  }`}>
                    {user.account_status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Invite New Staff Member</h2>
            <form onSubmit={handleInvite}>
              <div className={styles.formGroup}>
                <label>Email Address</label>
                <input type="email" required value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label>Role</label>
                <select value={inviteRole} onChange={e => setInviteRole(e.target.value)}>
                  <option>Technician</option>
                  <option>Procurement Officer</option>
                  <option>HOD Medical Engineering</option>
                </select>
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.btnSecondary} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className={styles.btnPrimary}>Send Invite</button>
              </div>
              {inviteMsg && <p className={styles.inviteMessage}>{inviteMsg}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
