import Hero from './Hero';
import Features from './Features';
import Institutions from './Institutions';
import Contributors from './Contributors';
import '../../../App.css'

const LandingPage = () => {
    return (
      <>
      <div className='LandingContainer'>
        <Hero />
        <Features/>
        <Institutions />
        <Contributors />
      </div>
      </>
    )
};

export default LandingPage;
