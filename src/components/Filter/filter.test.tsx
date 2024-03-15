import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ReuseFilterModal, { CustomSelectConfig } from './index'; 

test('renders ReuseFilterModal correctly', () => {
  const selectConfigs: CustomSelectConfig[] = [
    {
      label: 'Label 1',
      valueKey: 'value1',
      optionsKey: 'options1',
      fieldName: 'field1',
      search: true,
      displayProperty: 'name',
      placeholder: 'search...',
      
    },
  ];

  const fetchOptions = {
    options1: {
      results: [{ id: 1, name: 'Option 1' }, { id: 2, name: 'Option 2' }],
    },
  };
  const onSearchChangeMock = jest.fn();
  const onClose = jest.fn();
  const onApply = jest.fn();
  const onReset = jest.fn();

  render(<ReuseFilterModal isOpen={true} onClose={onClose} onApply={onApply} onReset={onReset} searchChange= {onSearchChangeMock} selectConfigs={selectConfigs} fetchOptions={fetchOptions} />);

  expect(screen.getByText('Filter')).toBeTruthy();


});

test('calls onApply with correct filters when search button is clicked', () => {
  const onApplyMock = jest.fn();
  const selectConfigs: CustomSelectConfig[] = [
    {
      label: 'Label 1',
      valueKey: 'value1',
      optionsKey: 'options1',
      fieldName: 'field1',
      search: true,
      displayProperty: 'name',
      placeholder: 'placeholder'
    },
  ];  const fetchOptions = {
    options1: {
      results: [{ id: 1, name: 'Option 1' }, { id: 2, name: 'Option 2' }],
    },
  };

  render(<ReuseFilterModal isOpen={true} onClose={() => {}} onReset={onApplyMock} onApply={onApplyMock} selectConfigs={selectConfigs} searchChange= {onApplyMock} fetchOptions={fetchOptions} />);
  fireEvent.click(screen.getByText('Search'));
  fireEvent.click(screen.getByText('Reset'));
  expect(onApplyMock).toHaveBeenCalledWith({});
});
