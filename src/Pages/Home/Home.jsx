
import Footer from "../../Components/Footer";
import Slider from "./Slider";
import CustomNavbar from "../../Components/CustomNavbar";
import ExtraSections from "../../Components/ExtraSections";


const Home = () => {
    return (
        <div>
          <CustomNavbar/>
          <Slider/>
          <main className="max-w-7xl mx-auto my-8">
            <ExtraSections/>
          </main>
         <Footer/>
        </div>
    );
};

export default Home;