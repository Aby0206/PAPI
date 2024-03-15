import React, { SyntheticEvent } from 'react';
import { StyledFormControl, StyledStar, StyledRatingDesc,StyledRatingWrapper } from './styledComponents';
import { StyledFieldLabel } from '../../styles/global';
import { NullableParam, Proficiency } from '../../types/index';

interface CustomRatingProps {
	label?: string;
	required?: boolean;
	invalid?: boolean;
	value?: number;
	style?: React.CSSProperties;
	showRatingDesc?: boolean;
	showBorder?:boolean,
	readOnly ?:boolean,
	description?: Proficiency[];
	onChange?: (
		event: SyntheticEvent<Element, Event>,
		value: NullableParam<number>
	) => void;
}

const CustomRating: React.FC<CustomRatingProps> = ({
	label,
	required,
	invalid,
	onChange,
	style,
	showRatingDesc = false,
	readOnly = false,
	description,
	showBorder = false,
	...props
}) => {
	const [hover, setHover] = React.useState(-1);

	return (
		<StyledFormControl invalid={invalid}>
				{label && (
					<div style={{ flexDirection: 'column' }}>
					<StyledFieldLabel className="input-label">
						{label}
						{required && <span style={{ color: 'red' }}>*</span>}
					</StyledFieldLabel>
					</div>
				)}
			
			<StyledRatingWrapper className= {showBorder && 'border-show'||''} >
			<StyledStar
				precision={1}
				defaultValue={0}
				className="star"
				onChange={onChange}
				style={style}
				readOnly={readOnly}
				onChangeActive={(_, newHover) => {
					setHover(newHover);
				}}
				{...(props?.value && { key: props.value })}
				{...props}
			/>
			</StyledRatingWrapper>
			{ showRatingDesc && hover !==-1 && (
				<StyledRatingDesc>
					{description?.[hover - 1]?.description??''}
				</StyledRatingDesc>
			)||null}
		</StyledFormControl>
	);
};

export default CustomRating;
