import React from "react";
import { StyledWrap , StyledButton} from "./styledComponents";
import { Link } from "react-router-dom";

const PageComingSoon: React.FC = () => {
    return (
        <StyledWrap>
            <h2>Page Under Development...</h2>
            <Link to='/home'>
            <StyledButton>Home</StyledButton>
            </Link>
        </StyledWrap>
        )
    };
    
    export default PageComingSoon;