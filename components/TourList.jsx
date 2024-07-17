import React from 'react'
import {TourCard} from "./TourCard";

const TourList = ({data}) => {
  return (
    <div className='flex flex-row gap-10'>
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
