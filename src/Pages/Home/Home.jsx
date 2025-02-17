
import Footer from "../../Components/Footer";
import Slider from "./Slider";
import CustomNavbar from "../../Components/CustomNavbar";
import ExtraSections from "../../Components/ExtraSections";
import { Helmet } from "react-helmet-async";
import Testimonals from "../../Components/testimonals";
import Services from "../../Components/Services";
import JobOffers from "./JobOffers";


const Home = () => {
    return (
        <div>
          <Helmet>HOME | WORK FUSION</Helmet>
          <CustomNavbar/>
          <Slider/>
          <main className="max-w-7xl mx-auto my-8">
            <JobOffers/>
            {/* <Services/> */}
            <ExtraSections/>
          <Testimonals/>
          </main>
         <Footer/>
        </div>
    );
};

export default Home;

