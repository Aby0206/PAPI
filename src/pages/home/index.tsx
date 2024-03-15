import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { StyledTab } from './styledComponents';
import ContractListing from '../../components/people-list/Contract';
import RegularListing from '../../components/people-list/Regular';
import Title from '../../components/Title/title';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;
	

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const HomePage: React.FC = () => {
	const [value, setValue] = React.useState(0);
	const [title, setTitle] = useState('People Master-Employees');
	

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
		
	};
  useEffect(()=>{
    value == 0
    ? setTitle('People Master-Employees')
    : setTitle('People Master-Contractors');
  },[value])

	return (
		<>
			<Title title={title} />
			<StyledTab>
				<div>
					<Tabs
						value={value}
						onChange={handleChange}
						TabIndicatorProps={{
							style: {
								backgroundColor: '#4ABD95',
								height: '5px',
							},
						}}
					>
						<Tab label="Regular Employees" disableRipple {...a11yProps(0)} 
						data-qa-automation="RegEmpTab"
						
						/>
						<Tab label="Contract Employees" disableRipple {...a11yProps(1)} 
						data-qa-automation="ContEmpTab"
						/>
					</Tabs>
				</div>
				<TabPanel value={value} index={0}>
					<RegularListing />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<ContractListing />
				</TabPanel>
			</StyledTab>
		</>
	);
};

export default HomePage;
