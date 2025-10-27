import React from "react";
import Footer from "../components/footer/mainFooter";
import BgSignUp from "../components/register/bgSignUp";
import ContentSignUp from "../components/register/contentSignUp";

const AuthPage: React.FC = () => {
  return (
    <div className="grid grid-cols-12">
      <BgSignUp />
      <ContentSignUp />
      <Footer />
    </div>
  );
};

export default AuthPage;
