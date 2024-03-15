import React from "react"
import { StyledFooter,CustomLink } from "./styledComponents";

type FooterProps = {
    layout?: 'onboarding' |'dashboard';
  };

const Footer: React.FC<FooterProps> = ({layout = 'onboarding'}) => {
    return (
      <StyledFooter layout={layout}>
        <div className="rights" >© 2023 PAPI. All rights reserved.</div>
        {layout==="onboarding" &&
        <div className="footer-links">
            <CustomLink to="/terms-and-conditions">Terms & Conditions</CustomLink>
            <div className="seperator" />
            <CustomLink to="/privacy-and-policy">Privacy & Policy</CustomLink>
        </div>
        }
      </StyledFooter>
    );
  };
  
  export default Footer;