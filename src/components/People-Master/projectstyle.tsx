import { styled } from '@mui/material/styles'


export const StyledButton = styled('button')(({ theme }) => ({
    width: "auto",
    display: "flex",
    fontWeight: 500,
    padding: "8px",
    gap: "3px",
    alignItems: "center",
    borderRadius: "5px",
    background: "var(--color-secondary, #4ABD95)",
    color: "white",
    fontSize: "16px",
    border: "none",
    margin: "0 0 0 auto",
    '&. icon-edit': {
        width: "80px",
        height: "40px"
    },
    '&. icon-delete': {
        width: "20px",
        height: "20px"
    },
   
    '&. button-text': {
        alignItems: "center",
        display: "flex",
        textAlign: "center",
        fontFamily: "Inter",
        fontSize: "16px",
        fontStyle: "normal",
        fontweight: "500",
        lineHeight: "normal",
    },
    [theme.breakpoints.down('sm')]: {

    }
}))

export const StyledWrap = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	gap: 29,
	width:"100%",
	justifyContent:"space-between",
	[theme.breakpoints.down('sm')]: {},
}));
export const StyledList = styled('div')(({ theme }) => ({
    backgroundColor:"red",
	display: 'flex',
	width: '100%',
	padding: '12px',
	minHeight:"430px",
	flexDirection: 'column',
	alignItems: 'flex-end',
	borderRadius: '5px',
	background: '#FFF',
	'& .heading': {
		display: 'flex',
		width: '100%',
		height: '56px',
		padding: '10px 12px',
		alignItems: 'center',
		gap: '10px',
		background: 'rgba(74, 189, 149, 0.20)',
		color: ' var(--color-secondary, #4ABD95)',
		leadingTrim: 'both',
		textEdge: 'cap',
		fontFeatureSettings: " 'clig' off, 'liga' off",
		fontFamily: 'Inter',
		fontSize: '18px',
		fontStyle: 'normal',
		fontWeight: '600',
		lineHeight: 'normal',
		'&.space-between': {
			justifyContent: 'space-between',
		},
	},
	'& .head-row': {
		borderBottom:"1px solid #E7E7E9"
	},
	'& .field-title': {
		flexShrink: '0',
		height:'auto',
		color: 'var(--color- text, #0D0C22)',
		fontFamily: 'Inter',
		fontSize: '16px',
		fontStyle: 'normal',
		borderBottom:"1px solid #E7E7E9",
		fontWeight: 600,
		lineHeight: 'normal',
		'&.content': {
			color: 'var(--color-body, #111215)',
			fontWeight: 400,
		},
	},
	'& .content-row': {
		borderBottom:"1px solid #E7E7E9",
	},
	'& .space-between': {
        display:"flex",
		justifyContent:"space-between"
	},
	'& .pagination-wrap': {
		marginTop: '20px',
	},
	'.rating': {
		display: 'flex',
		flexDirection: 'row',
		gap: 3,
		alignItems: 'center',
	},
	'.update': {
		display: 'flex',
		gap: 30,
		alignItems: 'center',
	},
	" & .divider":{
        width:"1500px",
        height:1,
        backgroundColor:"#E7E7E9"
    },
	'& > :nth-child(3)': {
		marginTop:"auto",
	  },
	[theme.breakpoints.down('sm')]: {
		'.head-row': {
			display: 'none',
		},
		'.table': {
			display: 'block',
		},
		'.heading': {
			fontSize: 16,
		},
		'.table-body': {
			display: 'block',
		},
		'& .content-row': {
			padding: '0',
			display: 'flex',
			flexDirection: 'column',
			'.wrap': {
				width: '100%',
				display: 'flex',
				justifyContent: 'space-between',
			},
		},
		'& .field-title': {
			'&.content': {
				fontSize: 14,
				leadingTrim: 'both',
				border:0
			},
		},
		'.update': {
			display: 'flex',
			gap: 10,
			justifyContent: 'flex-end',
		},
	},
}));

export const StyledDiv = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {

    }
}))