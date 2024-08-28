import './TestimonialSlide.css'
import 'boxicons/css/boxicons.min.css';


const TestimonialSlide = ({testimonial}) => {
  const {name, image, comment, stars} = testimonial;
  return (
    <section className="testimonial-slide">
    <div className='testimonial-container'>
      <img className="testimonial-image" src={image} alt="user"/>
      <h1 className='testimonial-name'>{name}</h1>
      <div className='stars'>
      {
        Array.from({ length: stars }).map((_, index) => (
            <i key={index} className='bx bxs-star'></i>
        ))
      }
      </div>
      <p className='testimonial-review'>{comment}</p>
      <i className='bx bxs-quote-alt-left testimonial-quote' ></i>
    </div>
    </section>
  );
}

export default TestimonialSlide;