import React, { useEffect, useState,} from "react";
import CustomCheckbox from '../custom-checkbox';
import DeleteIcon from '../../assets/icons/Delete-icon.svg';
import Button from '../Custom-Button';

interface DeleteSkillProps {
  open?:boolean;
  onDelete: () => void;
  onClose: () => void;
  isLoading?:boolean;
  handleOptionChange:(option:string)=>void;
}

const DeleteView: React.FC<DeleteSkillProps> = ({ open,onDelete,onClose,isLoading,handleOptionChange}) => {
  const [checkBox, setCheckBox] = useState(true);

  useEffect(()=>{
    setCheckBox(true);
  },[open])

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value=e?.target?.getAttribute('value')??'false'
    let option=value =='false'?'skillCategory':'skill';
		setCheckBox(JSON.parse(value));
		handleOptionChange?.(option)

  };

  return (
        <div className='content-container'>
          <img src={DeleteIcon} alt="Delete_icon" className="delete-icon" />
          <div className='checkbox-container'>
            <text className="select-text">What do you want to delete? Please select one.</text>
            <CustomCheckbox data={["Skill", "Skill Category"]} value={checkBox} checked={checkBox} handleCheckBox={handleCheckBox} />
          </div>
          <div className="btn_wrap">
            <Button
						type="submit"
						showLoader={isLoading}
						disabled={isLoading}
						testId="submit-button-id"
						title='Delete'
						onClick={onDelete}
					/>
          <Button
						type="cancel"
						testId="cancel-button-id"
						disabled={isLoading}
						title="Cancel"
						onClick={onClose}
					/>
          </div>
        </div>  
     
    
  );
};

export default DeleteView;