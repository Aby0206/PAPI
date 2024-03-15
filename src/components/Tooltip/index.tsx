import React, { ReactElement} from 'react';
import Tooltip from '@mui/material/Tooltip';

type Placement =
  | 'top'
  | 'bottom-end'
  | 'bottom-start'
  | 'bottom'
  | 'left-end'
  | 'left-start'
  | 'left'
  | 'right-end'
  | 'right-start'
  | 'right'
  | 'top-end'
  | 'top-start';

interface DynamicTooltipProps {
  title: string;
  children: ReactElement;
  placement?: Placement;
}

const DynamicTooltip: React.FC<DynamicTooltipProps> = ({
  title,
  children,
  placement = 'top',
}) => {
  return (
    <Tooltip title={title} placement={placement}>
      {children}
    </Tooltip>
  );
};

export default DynamicTooltip;
