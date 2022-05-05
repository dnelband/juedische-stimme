import React from 'react'
import AdminNav from './Nav'

import styles from '../../styles/Admin.module.css'

function AdminLayout({ children }) {
  return (
    <div>

      <div className={styles.adminHeader}>
        <h1>Admin</h1>
        <ul>
          <li>NEW</li>
          <ul>
            <li><a href="/admin/posts/create">POST</a></li>
            <li>MEDIA</li>
            <li>PAGE</li>
            <li>GALLERY</li>
            <li>USER</li>
          </ul>
        </ul>
      </div>

      <hr/>

      <div className={styles.adminSidebar}>
        <AdminNav/>
      </div>
      <div className={styles.adminMain}>
        {children}
      </div>
    </div>
  )
}

export default AdminLayout