
import testimonial1 from '../../assets/testemonial1.jpg'
import testimonial2 from '../../assets/testimonial2.jpg'
import testimonial3 from '../../assets/testemonial3.jpg'
import testimonial4 from '../../assets/testimonial4.jpg'

import TestimonialSlide from './TestimonialSlide'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';



import './Testimonials.css'

const reviews = [
  {
    name: "Emmily",
    image: testimonial1,
    comment: "Great service, good food.",
    stars: 5,
  },
  {
    name: "Bob",
    image: testimonial2,
    comment:"I love coming to Little Lemon for a casual dinner. The atmosphere is cozy, and the service is top-notch. Their lemon-infused desserts are to die for!",
    stars: 5,
  },
  {
    name: "Shelly",
    image: testimonial3,
    comment:"Little Lemon is a testament to Mario and Adrian’s passion and talent. Mario’s Italian roots and Adrian’s flair for Mediterranean cuisine create a menu that’s both comforting and exciting. The lemon rosemary chicken is an absolute favorite of mine!",
    stars: 4,
  },
  {
    name: "John",
    image: testimonial4,
    comment:"I’m so impressed by what Mario and Adrian have created at Little Lemon. The blend of traditional Italian recipes with Mediterranean influences makes their menu unique and delicious. The vibrant flavors and warm atmosphere keep me coming back for more!",
    stars: 5,
  }
]


const Testimonials = () => {
  return (
    <section className='testimonial'>
    <h1 className='testimonial-title'>Testimonials</h1>
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      autoplay={{ delay: 15_000 }}
      loop={true}
      modules={[Pagination, Navigation, Autoplay]}
    >
      {
        reviews.map((testimonial, index) => {
          return (
          <SwiperSlide key={index}>
            <TestimonialSlide testimonial={testimonial}/>
            <div className="swiper-button-prev testimonial-nav-btn"/>
            <div className="swiper-button-next testimonial-nav-btn"/>
          </SwiperSlide>
          )
        })
      }
    </Swiper>
    </section>
  );
}

export default Testimonials;