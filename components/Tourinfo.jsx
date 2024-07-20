// import { createNewTour } from "../utils/actions";

async function Tourinfo({ tour }) {

    let data = tour.tour;
    console.log(data);  
    return (
        <div className="flex flex-col items-start gap-5">

            {/* <div className="images">
                {
                    data.image ? <div className="tour-images">
                    <div className="carousel carousel-center rounded-box gap-5">
    
                        {
                            data.image.map((image) => {
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
                            })
                        }
    
    
                    </div>
                </div> : null
                }
            </div> */}

            <h1 className='text-4xl font-semibold'>{data.city},{data.country}</h1>
            <p className='leading-10 mb-1 text-3xl'>{data.title}</p>
            <p className=' mb-2 text-xl'>{data.description}</p>
            {
                data.stops.map((stop, index) => {
                    return (
                        <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border" key={index}>
                            <div className="collapse-title text-xl font-medium">{`Stop ${index + 1}`}</div>
                            <div className="collapse-content">
                                <p className="text-xl">{stop}</p>
                            </div>
                        </div>
                    );
                })
            }
        </div>

    );
}

export { Tourinfo };




// {
//     tour: {
//       city: 'Mumbai',
//       country: 'India',
//       title: 'A Day in Vibrant Mumbai',
//       description: 'Experience the energy and diversity of Mumbai, India, with this action-packed one-day tour. Explore iconic landmarks, immerse yourself in local culture, and savor delicious street food.',
//       stops: [
//         'Start your day at the iconic **Gateway of India**, a historic arch built in 1924. Take a ferry across the harbor to **Elephanta Caves**, a UNESCO World Heritage Site featuring intricate rock-cut Hindu sculptures. ',
//         "Enjoy lunch at a local eatery in the **Bandra-Worli Sea Link**, a stunning bridge offering panoramic views of the city.  After lunch, explore the bustling **Chhatrapati Shivaji Maharaj Terminus**, a UNESCO World Heritage Site, and the nearby **Prince of Wales Museum** for a glimpse into India's rich history and art. ",
//         "In the evening,  experience the vibrant atmosphere of **Dhobi Ghat**, the world's largest open-air laundry. End your day with a delicious dinner at a **street food stall**, sampling local favorites like vada pav and pani puri."
//       ]
//     }
//   }