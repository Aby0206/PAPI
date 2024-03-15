import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';
const Title: React.FC<{ title: string }> = ({ title }) => {
    let target = (document as any).getElementById('app-header');
    const [test,setTest] = React.useState<boolean>(false);
    useEffect(()=>{
        setTest(true)
    },[]);
    return test && target
        ? ReactDOM.createPortal(
                <span>{title}</span>,
                (document as any).getElementById('app-header')
          )
        : <span>Unknown Title</span>;
};
export default Title;