
import { LandingHero, LandingApi, LandingKeyfeature, LandingGetStarted } from './components/LandingSections';

const LandingPage = () => {
    return(
        <main className='sub-main'>
            <LandingHero />
            <LandingApi/>
            <LandingKeyfeature />
            <LandingGetStarted />
        </main>
    );
}

export default LandingPage