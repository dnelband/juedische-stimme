import React from 'react'
import Link from 'next/link'

function AdminNav() {
  return (
    <div>
      <ul>
        <li><Link href='/admin'>Dashboard</Link></li>
        <li><Link href='/admin/posts/page/1'>Posts</Link></li>
        <li><Link href='/admin/media/page/1'>Media</Link></li>
        <li><Link href='/admin/pages/page/1'>Pages</Link></li>
        <li><Link href='/admin/comments/page/1'>Comments</Link></li>
        <li><Link href='/admin/appearance'>Appearance</Link></li>
        <li><Link href='/admin/users/page/1'>Users</Link></li>
      </ul>
    </div>
  )
}

export default AdminNav