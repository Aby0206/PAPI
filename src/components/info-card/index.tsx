import React from "react"
import { StyledInfoCard ,CustomLink} from "./styledComponents";

type InfoType = {
    [key: string]: {
      displayName: string;
      type: string;
    };
  }

type infoDataType = {
  [key: string]: string
}


type InfoCardProps = {
    title:string
    info:InfoType
    data?:infoDataType
  };

const InfoCard: React.FC<InfoCardProps> = ({title,info,data}) => {

    return (
      <StyledInfoCard>
        <div className="card-title">
            {title}
        </div>
        {Object.keys(info).map((item,index)=>{
            return(
                <>
                {index!==0 &&<div className="divider" />}
                <div className="card-item">
                    <span className="row-name">{info?.[item]?.displayName}</span>
                      <div>
                    {info?.[item]?.type === "link" ?
                    <CustomLink 
                        href={data?.item}
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        {(data?.[item])?data?.[item]:'-'}
                    </CustomLink>
                    :
                    <span>{(data?.[item])?data?.[item]:'-'}</span>
                    }
                    </div>
                </div>
                </>
            )
        })}
      </StyledInfoCard>
    );
  };
  
  export default InfoCard;