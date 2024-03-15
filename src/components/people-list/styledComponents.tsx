import { Theme } from '@emotion/react';
import { styled, keyframes } from '@mui/material/styles';

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

interface StyledLoaderProps {
	theme?: Theme;
	isFetching?: boolean;
}

export const StyledLoader = styled('img')<StyledLoaderProps>(({ isFetching = false }) => ({
	animation: isFetching ? `${spinAnimation} 2s linear infinite` : 'none',
}));
