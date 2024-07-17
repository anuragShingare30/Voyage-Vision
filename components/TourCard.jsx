import React from 'react'
import Link from 'next/link';

const TourCard = ({ tour }) => {
    return (
        <Link href={`/Tour/${tour.id}`}>
            <div className="card bg-base-200 w-full" >
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-xl">{tour.city},{tour.country}</h2>
                </div>
            </div> 
        </Link>

    )
}

export { TourCard };
