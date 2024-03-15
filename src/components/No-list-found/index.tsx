import React from "react";
import { StyledNoListFound } from "./styledComponents";
import NoResultFound from "../../assets/icons/NoResultFound.svg";

type InfoCardProps = {
  title?: string,
  isSearch?: boolean
};

const NoListFound: React.FC<InfoCardProps> = ({ title, isSearch }) => {
  return (
    <StyledNoListFound>
      <div className="content">
        <img className="content-img" src={NoResultFound} alt='NoResultFound' />
        <div className="content-text">
          { isSearch ? (
            <>
              <p className="content-primary-text">No Results Found</p>
              <p className="content-secondary-text">Sorry, there are no results for this search.</p>
              <p className="content-secondary-text">Please try another keyword.</p>
            </>
          ) : (
            <>
              <p className="content-primary-text">No {title} List Found</p>
              <p className="content-secondary-text">Please add {title} to populate this list</p>
            </>
          )}
        </div>
      </div>
    </StyledNoListFound>
  );
};

export default NoListFound;
