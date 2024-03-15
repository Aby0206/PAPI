import { styled, Theme } from '@mui/material/styles';

interface StyledHeaderProps {
    theme?: Theme;
    isDrawerOpen?: boolean;
}

export const StyledAppHeader = styled('div')<StyledHeaderProps>(({ theme, isDrawerOpen }) => ({
    position: 'fixed',
    top: 0,
    left: isDrawerOpen?266:80, //sidebar width
    width: '100%',
    maxWidth: `calc(100vw -  ${isDrawerOpen?266:80}px)`,
    height: '100%',
    maxHeight: '92px',
    backgroundColor: '#FFFFFF',
    padding: '21px 35px',
    boxShadow: '0px 0px 12px 0px rgba(0, 0, 0, 0.10)',
    borderBottom: '1px solid #E7E7E9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1999,
    
    '& .heading': {
        fontSize: 28,
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 'normal',
        color: theme.palette.text.primary,
    },
    '& .hamburger': {
        fontSize: '2rem',
        background: 'transparent',
        border: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'none', 
        },
      },

    '& .profile-wrap': {
        display: 'flex',
        alignItems: 'center',
        gap: 47,
        position: 'relative',
    },
    '& .profile-img-name-outer-wrap': {
        display: 'flex',
        alignItems: 'center',
        gap: 15,    
    },
    '& .profile-name-wrap': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 9, 
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 'normal',
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow:"ellipsis",
       "&.name" :{
        display:"inline-block",
        maxWidth:"130px",
        },
        "&.designation" :{
            fontWeight: 400,
            color: 'var(--color-caption, #6E6D7A)',
            }
    },
    '& .profile-img-wrap': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 100,
        flexShrink: 0,
        background: 'url(<path-to-image>), lightgray 50% / cover no-repeat',
    },
   
    '& .profile-img': {
            
				fontSize: '30px',
				width: 50,
				height: 50,
				alignItems:'center',
                'bg-black':{
                    backgroundColor: 'black',
                }
    },
    '& .icon-img-wrap': {
       position:"relative",

    },

    '& .icon-img': {
        width: 30 ,
        height: 30 ,
    },
    '& .notification-badge': {
        position: 'absolute',
        top: "-8px",
        right: "-6px",
        backgroundColor: '#2d2f39',
        color: 'white',
        borderRadius: '100%',
        width: 20,
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        fontWeight: 'bold',
    },
      [theme.breakpoints.down('md')]: {
        left: 0,
        maxWidth: '100%',
      },
      [theme.breakpoints.between('xs','sm')]: {
        padding:"0px 10px",
        display:"flex",
        justifyContent:"space-between",
        '& .left-wrap':{
            display:"flex",
            flexDirection: "row",
            gap:"7px",
            // alignItems:"top",
            
        },
        '& .heading':{
            marginTop:"5px",
            fontSize: 20,
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
        },
        '& .profile-wrap':{
            display:"flex",
            gap:"20px",
            '& .icon-img':{
                    width: 26 ,
                    height: 26 ,
            },
            '& .profile-img-wrap':{
                backgroundColor:"transparent",
                '& .profile-img':{
                    width: 42,
                    height:42,
                },

            },               
            '& .profile-name-wrap':{
                display:"none"
            }
        }
      },
      [theme.breakpoints.only('sm')]: {
        display:"flex",
        '& .left-wrap':{
            display:"flex",
            gap:"15px"
        },
      },
    }));