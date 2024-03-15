import React from "react";
import { StyledWrap , StyledButton} from "./styledComponents";
import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
  return (
    <StyledWrap>
      <h1 style={{color:"#4ABD95"}}>404</h1>
      <h3 style={{color:"#4ABD95"}}>Page Not Found</h3>
      <p>we're sorry the page you requested could not be found</p>
      <p>Please go back to the homepage</p>
      <Link to='/home'>
      <StyledButton>Home</StyledButton>
      </Link>
    </StyledWrap>
    )
};

export default PageNotFound;