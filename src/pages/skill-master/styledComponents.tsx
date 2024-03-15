import { styled } from '@mui/material/styles';
import { Theme } from '@emotion/react';
interface StyledButtonProps {
     theme?: Theme;
     isLoading?: boolean;
}
export const StyledContainer = styled('div')(({ theme}) => ({
     display:"flex",
     flexDirection:"column",
     width:"100%",
     padding:'15px',
     height:"fit-content",
     backgroundColor:"#FFF",
     [theme.breakpoints.down('sm')]: {
          width:'105%',
          justifyContent: 'center',
          alignItems: 'center',
          '& .MuiTabs-root': {
               justifyContent: 'center',
               width: '100%',
          },
          '& .MuiTab-root': {
            minWidth: 'auto',
            padding: '10px',
          },
        },
      }));
      export const StyledList = styled('div')(({ theme }) => ({
          display: 'flex',
          gap: '29px',
          flexDirection: 'column',
          '& .head-row': {
               borderRadius: '5px 5px 0px 0px',
               background: 'rgba(74, 189, 149, 0.20)',
          },
          '& .content-row': {
               borderBottom: '2px solid  rgba(0, 0, 0, 0.1)',
          },
          '& .head-title': {
               color: 'var(--color-secondary, #4ABD95)',
               fontFamily: 'Inter',
               fontSize: 16,
               fontStyle: 'normal',
               fontWeight: 600,
               lineHeight: 'normal',
               '& .title-container': {
                    display: 'flex',
                    alignItems: 'center',
                    '& .icon-container': {
                         display: 'flex',
                         paddingLeft: '15px',
                         gap: '3px',
                         flexDirection: 'column',
                         '& .active-icon-wrapper': {
                              cursor: 'pointer',
                         },
                         '& .inactive-icon-wrapper': {
                              cursor: 'pointer',
                              opacity:.5
                         },
                    },
               },
          },
          '& .inactive-button-wrap': {
               display: 'flex',
               width: '100px',
               padding: '4px 8px',
               flexDirection: 'row',
               justifyContent: 'flex-start',
               alignItems: 'center',
               gap: 10,
               borderRadius: 100,
               background: 'rgba(110, 109, 122, 0.20)',
          },
          '& .inactive-button-icon': {
               width: '8px',
               height: '8px',
               borderRadius: '50%',
               backgroundColor: '#6E6D7A',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
          },
          '& .inactive-button-text': {
               color: '#6E6D7A',
          },
          '& .active-button-wrap': {
               display: 'flex',
               width: '100px',
               padding: '4px 8px',
               flexDirection: 'row',
               justifyContent: 'flex-start',
               alignItems: 'center',
               gap: 10,
               borderRadius: 100,
               background: 'rgba(83, 205, 130, 0.20)',
          },
          '& .active-button-icon': {
               width: '8px',
               height: '8px',
               borderRadius: '50%',
               backgroundColor: '#53CD82',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
          },
          '& .active-button-text': {
               color: '#53CD82',
          },
          '& .custom-paper': {
               boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
          '& .status-wrapper': {
               display: 'flex',
               width:'100%',
              justifyContent:'space-between',
          },
          '& .status-cell': {
               display: 'flex',
               gap: 20,
          },
          '.icon-container': {
               display: 'flex',
               gap: 20,
          },
          '& .edit-btn': {
               backgroundColor: 'transparent',
               border: 'none',
               cursor: 'pointer',
          },
          '& .pagination-wrap': {
               display: 'flex',
               width: '100%',
               justifyContent: 'flex-end',
          },
          a: {
               color: '#000',
          },
          '& .no-data': {
               height: '100px',
               width: '100%',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               flexDirection: 'column',
               color: '#6E6D7A',
               '& .heading': {
                    height: '29px',
                    fontSize: '24px',
                    fontWeight: 600,
                    color: '#0D0C22',
                    marginBottom: '10px',
               },
          },
          [theme.breakpoints.down('sm')]: {
               '.head-title:not(.skill,.category)': {
                    display: 'none',
               },
                  '.head-row': {
                    display: 'block',
                    width:'max-content'
                  },
               '& .content-row' : {
                    display: 'flex',
                    flexDirection:'column',
                    marginBottom:"15px",
                     '.wrap':{
                         display: 'flex',
                         justifyContent:'space-between',
                         alignItems:'center'
                     }
               },
               '.active-button-wrap,.inactive-button-wrap': {
                    width: 'fit-content',
               },
               '& .status-cell': {
                    gap: 10,
               },
               '.icon-container': {
                    gap: "10px"
                  }
          },
     }));
     export const StyledInputWrap = styled('div')(({ theme }) => ({
          width: '100%',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFF',
          boxSizing: 'border-box',
          flexWrap: 'wrap',
          gap: '37px',
          '& .search-bar': {
               flex: 1,
               height: '100%',
               padding: '15px 20px',
               borderRadius: '5px',
               border: '1px solid #ccc',
               justifyContent: 'space-between',
               display: 'flex',
               alignItems: 'center',
               backgroundColor: 'rgba(238, 238, 238, 1)',
               boxSizing: 'border-box',
          },
          '& .search-div': {
               height: '20px',
               display: 'flex',
               alignItems: 'center',
               gap: '10px',
               boxSizing: 'border-box',
          },
          '& .search-input': {
               flex: 1,
               backgroundColor: 'transparent',
               border: 'none',
               '&:focus': {
                    outline: 'none',
                    border: 'none',
               },
               boxSizing: 'border-box',
          },
          '& .fn-btn': {
               color: '#fff',
               height: '100%',
               padding: '15px 20px',
               borderRadius: '5px',
               display: 'flex',
               gap: '10px',
               alignItems: 'center',
               backgroundColor: 'rgba(74, 189, 149, 1)',
               border: 'none',
               cursor: 'pointer',
               boxSizing: 'border-box',
          },
          '& .filter-btn': {
               border: 'none',
               cursor: 'pointer',
          },
          [theme.breakpoints.down('sm')]: {
               flexDirection: 'column',
               gap: '10px',
               '& .search-bar': {
                    width: 'auto',
               },
               '& .fn-btn': {
                    width: 'auto',
                    justifyContent: 'center',
                    padding: '15px',
                    '& :last-child': {
                         display: 'none',
                    },
               },
          },
     }));
     export const StyledWrap = styled('div')(({ theme }) => ({
          display: 'flex',
          flexDirection: 'column',
          gap: 29,
          [theme.breakpoints.down('sm')]: {},
     }));
     export const StyledButton = styled('button')<StyledButtonProps>(({ theme,isLoading }) => ({
          color:"#fff",
             height: "100%",
             padding: "15px 20px",
             borderRadius: "5px",
             display: "flex",
               gap:"10px",
             alignItems: "center",
             backgroundColor: isLoading?"rgba(165, 222, 202, 1)": "rgba(74, 189, 149, 1)",
             border: "none",
             cursor: "pointer",
             boxSizing: "border-box",
          [theme.breakpoints.down('sm')]: {},
     }));