import React from 'react'
import {TourCard} from "./TourCard";

const TourList = ({data}) => {
  return (
    <div className='grid grid-cols-4 gap-10'>
      {
        data.map((tour)=>{
            return (
                <TourCard key={tour.id} tour={tour}></TourCard>
            );
        }) 
      }
    </div>
  )
}

export  {TourList};
