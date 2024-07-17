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
                        tour.image.map((image) => {
                            return (
                                <div className="carousel-item">
                                    <img
                                        src={image.url}
                                        width={300}
                                        height={300}
                                        className='rounded-xl shadow-xl mb-16 h-96 w-96 object-cover'
                                        alt={image.title}
                                        priority
                                    />
                                </div>
                            );
                        })
                    }


                </div>
            </div>

            <div className='tour-content'>
                <Tourinfo tour={tour} ></Tourinfo>
            </div>
        </div>
    )
}

export default SingleTourPage
