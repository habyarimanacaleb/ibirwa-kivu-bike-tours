import React from 'react'
import MainLayout from '../../admin-panel/MainLayout'
import BlogManagement from '../../features/blog/BlogManagement'

function AdminBlog() {
  return (
    <>
      <MainLayout>
             <BlogManagement />
      </MainLayout>
    </>
  )
}

export default AdminBlog