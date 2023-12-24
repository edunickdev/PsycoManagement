import Footer from "../components/footer/mainFooter";
import Navbar from "../components/navbar/mainNavbar";
import BgSignUp from "../components/register/bgSignUp";
import ContentSignUp from "../components/register/contentSignUp";

const AuthPage = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 grid-rows-1 z-30">
        <Navbar />
      </div>
      <BgSignUp />
      <ContentSignUp />
      <Footer />
    </div>
  );
};

export default AuthPage;
