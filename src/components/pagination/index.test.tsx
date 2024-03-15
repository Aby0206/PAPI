import { screen, render, fireEvent } from '@testing-library/react';
import Index from './index';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Checking Sidebar Menus', () => {
	test('Render previous Button', async () => {
		render(
			<BrowserRouter>
				<Index
					currentPage={1}
					totalPages={2}
					onPageChange={(page: number) => {
						return 0;
					}}
				/>
			</BrowserRouter>
		);
		const message = screen.getByTestId('prev-Btn');
		expect(message.textContent).toBe('Prev');
	});
	test('Render Next Button', async () => {
		render(
			<BrowserRouter>
				<Index
					currentPage={0}
					totalPages={1}
					onPageChange={(page: number) => {
						return 0;
					}}
				/>
			</BrowserRouter>
		);
		const message = screen.getByTestId('next-Btn');
		expect(message.textContent).toBe('Next');
	});
	test('Checking if all pages numbers rendered or not', async () => {
		let currentPage = 1;
		const totalPage = 3;
		render(
			<BrowserRouter>
				<Index
					currentPage={currentPage}
					totalPages={totalPage}
					onPageChange={(page) => {
						currentPage += 1;
					}}
				/>
			</BrowserRouter>
		);
		const prevBtn = await screen.getByTestId('prev-Btn');

		fireEvent.click(prevBtn);
		expect(screen.getByTestId('current-page').textContent).toBe('123');
		expect(prevBtn).toBeDisabled();
	});
	test('Checking if previous button disable or not on first page', async () => {
		let currentPage = 1;
		const totalPage = 3;
		render(
			<BrowserRouter>
				<Index
					currentPage={currentPage}
					totalPages={totalPage}
					onPageChange={(page) => {
						currentPage += 1;
					}}
				/>
			</BrowserRouter>
		);
		const prevBtn = await screen.getByTestId('prev-Btn');
		fireEvent.click(prevBtn);
	});
	test('Checking if next button disable or not on first page', async () => {
		let currentPage = 1;
		const totalPage = 3;
		render(
			<BrowserRouter>
				<Index
					currentPage={currentPage}
					totalPages={totalPage}
					onPageChange={(page) => {
						currentPage += 1;
					}}
				/>
			</BrowserRouter>
		);
		const nextBtn = await screen.getByTestId('next-Btn');
		fireEvent.click(nextBtn);
	});
});