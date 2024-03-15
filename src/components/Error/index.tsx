import React from 'react';
import { StyledError } from './styledComponents';
import Error from '../../assets/icons/error.svg';

type ErrorProps = {
	retry: () => void;
	error: any;
};

const ErrorView: React.FC<ErrorProps> = ({ retry, error }) => {
	let status = error?.code ?? error?.originalStatus;
	const detail = error?.detail ?? error?.data?.detail ?? error?.status ;
	return (
		<StyledError>
			<div className="content">
				<img className="content-img" src={Error} alt="Something went wrong" />
				<p className="content-text" data-testid="Something-went-wrong">Oops!Something went wrong</p>
				{error && (
					<p className="error-text">{`${status} - ${detail}`}</p>
				)}
				<button className="btn" onClick={retry} data-testid="retry-again">
					Retry Again
				</button>
			</div>
		</StyledError>
	);
};

export default ErrorView;
