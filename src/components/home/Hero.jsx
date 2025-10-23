import React from 'react'
import TourInquiryForm from '../TourInquiryForm'
import SimpleSlider from './ImageSlides';

const Hero = ({localImages}) => {
  return (
      <section>
               <SimpleSlider localImages={localImages}/>
               <div className="flex flex-col justify-center text-center bg-opacity-70 z-10">
                 <TourInquiryForm />
               </div>
             </section>
  )
}

export default Hero