import React from "react";
import { StyledContainer ,StyledWrap} from "./styledComponents";
import Title from '../../components/Title/title';
import UserSkills from "../../components/User-skills";
import BusinessUnit from "../../components/People-Master/Business-unit";
import ProjectType from "../../components/People-Master/project-type";
import ProjectStatus from "../../components/People-Master/project-status";
import BillingType from "../../components/People-Master/Billing-type";
import Domain from "../../components/People-Master/Domain";
import TechStack from "../../components/People-Master/Tech-stack";
import Currency from "../../components/People-Master/Currency";
const ProjectMaster: React.FC = () => {
  return (
  <>
   <Title title="Project Master" />
   <StyledContainer>
    <StyledWrap>
    <ProjectStatus/>
    <BusinessUnit/>
    <ProjectType/>
    </StyledWrap>
   <StyledWrap>
    <BillingType/>
    <Domain/>
     <Currency/>
   </StyledWrap>
  
    <TechStack/>
   </StyledContainer>
  </>
  )
};

export default ProjectMaster;