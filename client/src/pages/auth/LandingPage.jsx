
import { LandingHero, LandingApi, LandingKeyfeature, LandingGetStarted } from './components/LandingSections';

const LandingPage = () => {
    return(
        <>
            <LandingHero />
            <LandingApi/>
            <LandingKeyfeature />
            <LandingGetStarted />
        </>
    );
}

export default LandingPage