import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer";
import { StyledOnboardingLayout ,CurvedDiv} from "./styledComponents";

const OnboardingLayout: React.FC = () => {
  return (
    <StyledOnboardingLayout>
        <div className="main-container">
            <CurvedDiv />
            <div className="top-container">
                <Outlet />
            </div>
        </div>
        <Footer />
    </StyledOnboardingLayout>
  );
};

export default OnboardingLayout;
