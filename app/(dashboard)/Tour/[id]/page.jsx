import React from 'react'
import Link from 'next/link';
import { getTour, getCityImages } from '../../../../utils/actions'
import { redirect } from 'next/navigation'
import { Tourinfo } from '../../../../components/Tourinfo';
import prisma from '../../../../utils/db';


const SingleTourPage = async ({ params }) => {

    let id = Number(params.id);
    let tour = await getTour(id)
    if (!tour) {
        redirect('/Tour');
    }


    if (!tour.image || tour.image.length === 0) {
        let result = await getCityImages(tour.city); 
        console.log(result);
        // Save the images array to Prisma
        await prisma.tour.update({
            where: {
                id,
            },
            data: {
                image: result.data,
            }
        });

        tour.image = result.data; // Update the tour object with the new images
    }

    return (
        <div>
            <div>
                <Link href='/Tour'>
                    <button className='btn btn-primary mb-10'>Back to tour</button>
                </Link>
            </div>

            <div className="tour-images">
                <div className="carousel carousel-center rounded-box gap-5">

                    {
                        tour.image ? tour.image.map((image) => {
                            return (
                                <div className="carousel-item">
                                    <img
                                        src={image.url}
                                        width={300}
                                        height={300}
                                        className='rounded-xl shadow-xl mb-16 h-96 w-96 object-cover'
                                        alt={image.title}
                                        priority="true"
                                    />
                                </div>
                            );
                        }) : null
                        
                    }


                </div>
            </div>
            
            <div className='tour-content flex flex-col items-start gap-5'>
                {/* <Tourinfo tour={tour} ></Tourinfo> */}
                <h1 className='text-4xl font-semibold'>{tour.city},{tour.country}</h1>
                <p className='leading-10 mb-1 text-3xl'>{tour.title}</p>
                <p className=' mb-2 text-xl'>{tour.description}</p>
                {
                    tour.stops.map((stop, index) => {
                        return (
                            <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border" key={index}>
                                <div className="collapse-title text-xl font-medium">{`Stop ${index + 1}`}</div>
                                <div className="collapse-content">
                                    <p>{stop}</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default SingleTourPage
