import Link from 'next/link';
import styles from './woDetail.module.css';

export default function WorkOrderDetail({ params }: { params: { id: string } }) {
  const wo = {
    id: params.id,
    type: 'Corrective',
    priority: 'Critical',
    status: 'In Progress',
    equipmentId: 'CE-000186',
    equipmentName: 'Dräger Evita V500 Ventilator',
    reportedFault: 'No power. Battery not charging when connected to mains.',
    assignedTo: 'John Doe',
    reportedBy: 'Nurse Alice',
    createdAt: '2023-11-20 09:30 AM',
  };

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Link href="/app/work-orders">Work Orders</Link> / <span>{wo.id}</span>
      </div>

      <div className={styles.headerCard}>
        <div className={styles.headerInfo}>
          <div className={styles.titleRow}>
            <h1 className={styles.woName}>{wo.id} - {wo.type} Maintenance</h1>
            <span className={styles.statusBadge}>{wo.status}</span>
            <span className={styles.priBadge}>{wo.priority} Priority</span>
          </div>
          <div className={styles.metaRow}>
            <span><strong>Equipment:</strong> <Link href={`/app/equipment/${wo.equipmentId}`}>{wo.equipmentName} ({wo.equipmentId})</Link></span>
            <span><strong>Assigned To:</strong> {wo.assignedTo}</span>
            <span><strong>Reported:</strong> {wo.createdAt}</span>
          </div>
        </div>
        <div className={styles.headerActions}>
          <select className={styles.statusSelect} defaultValue="In Progress">
            <option>New</option>
            <option>Assigned</option>
            <option>In Progress</option>
            <option>Awaiting Parts</option>
            <option>Completed</option>
            <option>Closed</option>
          </select>
          <button className={styles.btnPrimary}>Save Status</button>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.mainCol}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Reported Issue</h3>
            <p className={styles.faultText}>{wo.reportedFault}</p>
            <div className={styles.metaText}>Reported by {wo.reportedBy}</div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Execution & Diagnosis</h3>
            <div className={styles.formGroup}>
              <label className={styles.label}>Diagnosis / Root Cause</label>
              <textarea className={styles.textarea} rows={3} placeholder="Describe the findings..."></textarea>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Action Taken</label>
              <textarea className={styles.textarea} rows={4} placeholder="Describe the work performed to resolve the issue..."></textarea>
            </div>
            <div className={styles.formGroup}>
              <button className={styles.btnSecondary}>+ Add Part Used</button>
            </div>
          </div>
          
          <div className={styles.formActions}>
            <button className={styles.btnPrimary}>Submit Service Report</button>
          </div>
        </div>
        
        <div className={styles.sideCol}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Tasks / Checklist</h3>
            <div className={styles.taskList}>
              <label className={styles.taskItem}>
                <input type="checkbox" /> Inspect power cord for damage
              </label>
              <label className={styles.taskItem}>
                <input type="checkbox" /> Test internal battery voltage
              </label>
              <label className={styles.taskItem}>
                <input type="checkbox" /> Verify charging circuit
              </label>
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Documents</h3>
            <button className={styles.btnUpload}>Upload Photo or Manual</button>
            <div className={styles.docList}>
              <div className={styles.docItem}>
                <span>📄 Service_Manual_V500.pdf</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
