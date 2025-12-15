import React from 'react'
import Button from '../common/Button'

function Contact() {
  return (
 <section id="contactus">
          <div className="text-center py-6 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-3xl sm:text-xl font-extrabold text-black">
              Need Assistance?{" "}
              <span className="text-black-600">We’re Here!</span>
            </h1>
            <p className="text-lg mt-3 text-gray-700">
              Questions, feedback, or just saying hello? We’re only one click
              away.
            </p>
            <div className="mt-5">
              <Button label="Contact Us" to="/contact" />
            </div>
            <p className="mt-4 text-gray-600 text-sm italic">
              <i className="fa-solid fa-clock mr-2"></i> Monday to Friday, 9 AM
              - 6 PM
            </p>
          </div>
        </section>  )
}

export default Contact