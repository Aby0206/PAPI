import React  from 'react';
import { StyledBasicInfo } from '../Basic-info/styledComponents';
import FormController from '../../FormController';
import { FormControl } from '@mui/material';
import FileUploadComponent from '../../custom-form-upload';
import { toBase64 } from '../../../utils';

interface AttachmentProps {
setFile:any;
}
const Attachments: React.FC<AttachmentProps> = ({setFile}) => {

	return (
        <FormControl>
            <StyledBasicInfo>
            <div className='card-title'>Attachments</div>
            <div className='half-container'>
            <FormController
					name="sow"
					formatValue={(value, onChange) => {
						toBase64(value.target.files[0]).then((base64) => {
							setFile(value.target.files[0])
							onChange(base64);
						});
					}}
				>
					<FileUploadComponent fileMessage="Attach SOW" required={false} />
				</FormController>
            </div>
            </StyledBasicInfo>
        </FormControl>
        );
    };
    
    export default Attachments;
    