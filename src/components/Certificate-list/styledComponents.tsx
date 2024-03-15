import { styled } from '@mui/material/styles';
import { TableContainer } from '@mui/material';

export const StyledButton = styled('button')(({ theme }) => ({
	width: "144px",
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
	'&. icon-add': {
		width: "20px",
		height: "20px"
	},
	'&. text-add-certificate': {
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
export const StyledTable = styled(TableContainer)(({ theme }) => ({
	'& .head-row': {
		display: "flex",
		width: "100%",
		padding: " 16px 12px",
		alignItems: "flex-start",
		borderBottom: "1px solid var(--color-border, #E7E7E9)"
	},
	'& .head-name': {
		display: "flex",
		width: "362px",
		alignItems: "center",
		gap: "10px",
		flexShrink: "0",
		color: "var(--color-text, #0D0C22)",
		fontFamily: "Inter",
		fontSize: "16px",
		fontStyle: "normal",
		fontWeight: "600",
		lineHeight: "normal",
	},
	'& .head-organization': {
		display: "flex",
		width: "330px",
		alignItems: "center",
		gap: "10px",
		flexShrink: "0",
		color: "var(--color-text, #0D0C22)",
		fontFamily: "Inter",
		fontSize: "16px",
		fontStyle: "normal",
		fontWeight: "600",
		lineHeight: "normal",
	},
	'& .head-date': {
		display: "flex",
		width: "260px",
		alignItems: "center",
		gap: "10px",
		flexShrink: "0",
		color: "var(--color-text, #0D0C22)",
		fontFamily: "Inter",
		fontSize: "16px",
		fontStyle: "normal",
		fontWeight: "600",
		lineHeight: "normal",
	},
	'& .head-credential-id': {
		display: "flex",
		width: "265px",
		alignItems: "center",
		gap: "10px",
		flexShrink: "0",
		color: "var(--color-text, #0D0C22)",
		fontFamily: "Inter",
		fontSize: "16px",
		fontStyle: "normal",
		fontWeight: "600",
		lineHeight: "normal",
	},
	'& .head-creadential-link': {
		display: "flex",
		width: "222px",
		alignItems: "center",
		gap: "10px",
		flexShrink: "0",
		color: "var(--color-text, #0D0C22)",
		fontFamily: "Inter",
		fontSize: "16px",
		fontStyle: "normal",
		fontWeight: "600",
		lineHeight: "normal",
	},
	'& .content-row': {
		display: "flex",
		width: "100%",
		padding: " 16px 12px",
		alignItems: "center",
		borderBottom: "1px solid var(--color-border, #E7E7E9)"
	},
	'& .content-name': {
		display: "flex",
		width: "362px",
		alignItems: "center",
		gap: "10px",
		flexShrink: "0",
		color: "var(--color-text, #0D0C22)",
		fontFamily: "Inter",
		fontSize: "16px",
		fontStyle: "normal",
		fontWeight: "400",
		lineHeight: "normal",
	},
	'& .content-organization': {
		display: "flex",
		width: "330px",
		alignItems: "center",
		gap: "10px",
		flexShrink: "0",
		color: "var(--color-text, #0D0C22)",
		fontFamily: "Inter",
		fontSize: "16px",
		fontStyle: "normal",
		fontWeight: "400",
		lineHeight: "normal",
	},
	'& .content-date': {
		display: "flex",
		width: "260px",
		alignItems: "center",
		gap: "10px",
		flexShrink: "0",
		color: "var(--color-text, #0D0C22)",
		fontFamily: "Inter",
		fontSize: "16px",
		fontStyle: "normal",
		fontWeight: "400",
		lineHeight: "normal",
	},
	'& .content-credential-id': {
		display: "flex",
		width: "265px",
		alignItems: "center",
		gap: "10px",
		flexShrink: "0",
		color: "var(--color-text, #0D0C22)",
		fontFamily: "Inter",
		fontSize: "16px",
		fontStyle: "normal",
		fontWeight: "400",
		lineHeight: "normal",
	},
	'& .content-credential-link': {
		display: "flex",
		width: "142px",
		alignItems: "center",
		gap: "10px",
		flexShrink: "0",
		color: " var(--color-secondary, #4ABD95)",
		fontFamily: "Inter",
		fontSize: "16px",
		fontStyle: "normal",
		fontWeight: "500",
		lineHeight: "normal",
		textDecorationLine: "underline",
	},
	[theme.breakpoints.down('sm')]: {},
}));
