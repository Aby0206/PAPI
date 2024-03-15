import { act, render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddList from './Addmodal'
jest.mock('./UpdateModal', () => () => null); 
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useFormContext: jest.fn(() => ({
    handleSubmit: (fn: any) => fn,
    reset: jest.fn(),
    setError: jest.fn(),
    formState: { errors: {} },
  })),
}));

describe('AddList Component', () => {
  const onCloseMock = jest.fn();
  const onSuccessMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without errors', () => {
    render(
      <AddList open={true} onClose={onCloseMock} onSuccess={onSuccessMock} editMode={false} />
    );

    expect(screen.getAllByText('Add')).toBeTruthy();
  });

  it('calls onClose when cancel button is clicked', () => {
    render(
      <AddList open={true} onClose={onCloseMock} onSuccess={onSuccessMock} editMode={false} />
    );

    const cancelButton = screen.getByTestId('cancel-button-id');
    fireEvent.click(cancelButton);

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('calls onSuccess and closes modal when Add button is clicked', async () => {
    render(
      <AddList open={true} onClose={onCloseMock}  editMode={false} />
    );
    const addButton = screen.getByTestId('submit-button-id');
    userEvent.click(addButton);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); 
    });

  });
});