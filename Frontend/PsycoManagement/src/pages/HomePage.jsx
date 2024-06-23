import Footer from "../components/footer/mainFooter";
import SectionCards from "../components/home/section-cards";
import { staticFiles } from "../config/statics";

const HomePage = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="h-auto col-span-12">
        <video
          autoPlay
          loop
          muted
          className="h-screen w-screen object-cover"
        >
          <source src={staticFiles.shortHome} type="video/mp4" />
        </video>
        <div className="absolute inset-0 opacity-80 bg-gradient-to-b from-gray-500 to-gray-900"></div>
        <SectionCards />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
