import photo1 from '../../assets/Mario and Adrian A.jpg';
import photo2 from '../../assets/Mario and Adrian b.jpg';


import './About.css';

const About = () => {
  return (
    <section id="about" className='about'>
      <div className='about-content'>
        <h3 className='about-name'>Little Lemon</h3>
        <p className='about-description'>
          Little Lemon is owned by two Italian brothers, Mario and Adrian, who moved to the United States to pursue their shared dream of owning a restaurant. To craft the menu, Mario relies on family recipes and his experience as a chef in Italy. Adrian does all the marketing for the restaurant and led the effort to expand the menu beyond classic Italian to incorporate additional cuisines from the Mediterranean region.
        </p>
      </div>
      <div className='about-images'>
        <img src={photo1} alt='Mario and Adrian 1' />
        <img src={photo2} alt='Mario and Adrian 2' />
      </div>
    </section>
  );
};

export default About;
