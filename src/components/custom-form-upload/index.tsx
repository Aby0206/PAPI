import React, {
	useState,
	useRef,
	ChangeEvent,
	useEffect,
	useMemo,
} from 'react';
import {
	StyledUpload,
	StyledButton,
	StyledInputLabel,
	StyledFormHelperText,
} from './styledComponents';

interface FileUploadProps {
	fileMessage: string;
	required: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	invalid?: boolean;
	value?: string;
	errorMessage?: string;
}

const CustomFormUploadComponent: React.FC<FileUploadProps> = ({
	fileMessage,
	required,
	invalid,
	onChange,
	value,
	errorMessage,
}) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const clearFile = () => {
		setSelectedFile(null);
		// @ts-ignore
		fileInputRef.current.value = null;
	};

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file && file.size <= 5 * 1024 * 1024) {
			setSelectedFile(file);
		} else {
			clearFile();
		}

		onChange?.(event);
	};

	const link = useMemo(() => {
		if (value?.startsWith('http')) {
			return value;
		}
		return '#';
	}, [value]);

	useEffect(() => {
		if (value === undefined) {
			clearFile();
		}
	}, [value]);

	return (
		<div>
			<div>
				{fileMessage && <> {fileMessage} </>}
				{required && <span style={{ color: 'red' }}>*</span>}
			</div>
			<StyledUpload invalid={invalid}>
				{selectedFile ? (
					<div className="file-name">{selectedFile.name}</div>
				) : (
					(link !== '#' && (
						<a href={link} target="_blank" className="file-name">
							{link.split('/').pop()}
						</a>
					)) || <div className="file-name">{fileMessage}</div>
				)}
				<StyledButton>
					Browse File
					<input
						type="file"
						className="file-input"
						ref={fileInputRef}
						onChange={handleFileChange}
						accept=".doc,.pdf,.docx"
					/>
				</StyledButton>
			</StyledUpload>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					width: '100%',
					alignItems:'center'
				}}
			>
				<StyledInputLabel>Maximum size is less than 5 MB</StyledInputLabel>
				<StyledFormHelperText style={{ color: 'red' }}>
					{errorMessage as string}
				</StyledFormHelperText>
			</div>
		</div>
	);
};

export default CustomFormUploadComponent;
