import React, {
	ForwardedRef,
	JSXElementConstructor,
	ReactElement,
} from 'react';
import {
	Controller,
	FieldValues,
	RegisterOptions,
	useFormContext,
} from 'react-hook-form';

type OnChange = (...event: any[]) => void;
interface CustomDynamicControllerProps {
	name: string;
	children: ReactElement<any, string | JSXElementConstructor<any>>;
	formatValue?: (event: any, onChange: OnChange) => void;
	validation?: RegisterOptions<FieldValues, string>;
}

const CustomDynamicController = React.forwardRef(
	(
		{ name, children, formatValue, validation }: CustomDynamicControllerProps,
		ref: ForwardedRef<any>
	) => {
		const { control, register, getFieldState } = useFormContext();
		const errorMessage = getFieldState(name).error?.message;
		const invalid = getFieldState(name).invalid;

		return (
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, value } }) => {
					const childWithProps = React.cloneElement(children, {
						value,
						errorMessage,
						invalid,
						...register(name, validation),
						onChange: (event: { target: { value: any; }; }) => {
							formatValue
								? formatValue(event, onChange)
								: onChange(event?.target?.value || event);
						},
					});
					return React.cloneElement(childWithProps, { ref });
				}}
			/>
		);
	}
);

export default CustomDynamicController;
