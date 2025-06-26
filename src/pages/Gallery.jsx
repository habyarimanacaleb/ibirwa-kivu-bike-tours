import React from 'react'
import GalleryList from '../components/GalleryLists'
import Gallery from '../components/GalleryLists'

const GalleryPage = () => {
  return (
    <div className='container mx-auto p-4'>
        <h1 className='text-2xl font-bold mb-4'>Gallery</h1>
        <p className='text-gray-700 mb-4'>
            Explore our gallery showcasing the beauty and culture of Rwanda.
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            <Gallery />
        </div>
      
    </div>
  )
}

export default GalleryPage
