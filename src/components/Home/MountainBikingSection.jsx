import React from 'react'
import Button from '../common/Button'

function MountainBikingSection() {
  return (
<section id="mtb-tours" className="p-10 bg-gray-100">
          <div className="mx-auto px-4 flex flex-col justify-center items-center">
            <h2 className="text-center text-4xl md:text-5xl my-10 font-bold">
              6-Day MTB Adventure Through Rwanda
            </h2>
            <p className="text-xl pt-2 text-gray-700 text-justify">
              Rwanda, known as the "Land of a Thousand Hills," offers a unique
              and thrilling destination for mountain biking enthusiasts...
            </p>

            <div className="mt-5">
              <Button label="Explore More" to="/explore-more-to-Rwanda" />
            </div>
          </div>
        </section>  )
}

export default MountainBikingSection