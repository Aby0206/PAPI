import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SkillView from './index';


let testData = {
	links: {
		next: null,
		previous: null,
	},
	total_count: 10,
	results: {
		item_count: 10,
		data: [
			{
				id: 1,
				name: 'C#',
				category: {
					id: 1,
					category: 'Programming Language',
					status: true,
				},
				total_employee: 12,
				status: true,
			},
		],
	},
};

test('UI rendered correctly', async () => {
	render(
		
		<SkillView 
		handleClickUpdate={() => {}}
		handleSortChange={() => {}}
		data={testData} />
		
	);
	const inputElement = screen.getAllByText('Skill');
	expect(inputElement).toBeTruthy();
});

test('SkillListing Component has all the table fields', async () => {
	render(<SkillView handleClickUpdate={() => {}}
	handleSortChange={() => {}}
	data={testData} />);
	  await screen.getAllByText('Skill');
      expect(screen.getAllByText('Skill')).toBeTruthy();
      expect(screen.getAllByText('Skill Category')).toBeTruthy();
      expect(screen.getAllByText('Total Employees')).toBeTruthy();
      expect(screen.getAllByText('Status')).toBeTruthy();
});

describe('SkillListing Component click test cases', () => {
	

    test('handles "Sort by skill" button click', async () => {
		render(<SkillView  handleClickUpdate={() => {}}
		handleSortChange={() => {}}
		data={testData}/>);
		const sortByNameButton = screen.getAllByAltText('sortby-name-icon');
		expect(sortByNameButton).toBeTruthy();
        sortByNameButton.forEach((image) => {
            fireEvent.click(image);
          });

	});


    test('handles "Sort by Category" button click', async () => {
		render(<SkillView  handleClickUpdate={() => {}}
		handleSortChange={() => {}}
		data={testData}/>);
		const sortByCategoryButton = screen.getAllByAltText('sortby-category-icon');
		expect(sortByCategoryButton).toBeTruthy();
        sortByCategoryButton.forEach((image)=>{
            fireEvent.click(image);
        })
		
	});

    test('Skill Listing component has Edit button', async () => {
		render(<SkillView handleClickUpdate={() => {}}
		handleSortChange={() => {}}
		data={testData} />);
		const editButton = screen.getAllByAltText('edit-skill-icon');
		expect(editButton).toBeTruthy();
        editButton.forEach((image)=>{
            fireEvent.click(image);
        })
		
	});

    test('Skill Listing component has Delete button', async () => {
		render(<SkillView handleClickUpdate={() => {}}
		handleSortChange={() => {}}
		data={testData}/>);
		const deleteButton = screen.getAllByAltText('delete-skill-icon');
		expect(deleteButton).toBeTruthy();
         deleteButton.forEach((image)=>{
            fireEvent.click(image);
         })
		
	});
});