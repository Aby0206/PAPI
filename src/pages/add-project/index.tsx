import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { StyledContainer } from '../add-contractor/styledComponents'
import Title from '../../components/Title/title';
import BasicInfo from '../../components/Add-Project/Basic-info';
import ProjectClasify from '../../components/Add-Project/ProjectClasify';
import ProjectSchedule from '../../components/Add-Project/ProjectSchedule';
import Attachments from '../../components/Add-Project/Attachments';
import SubmitSection from '../../components/FormSubmit';
import SubmitProject from '../../components/Add-Project/Submit';
import { useLazyGetProjectByIdQuery } from '../../redux/services/Project';
const AddProject: React.FC = () => {
    const [file, setFile] = useState<any>(null)
    const methods = useForm({ mode: 'onChange', shouldFocusError: true });
    const urlSearchParams = new URLSearchParams(window.location.search);
    const { reset } = methods;
    const id = urlSearchParams.get('id');
    const [trigger, { data, isFetching }] = useLazyGetProjectByIdQuery();
    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            fetchProject();
            const values = data?.data;
            let updatedData = {
                ...values,
            };
            reset(updatedData);
        } else {
            reset()
        }
    }, []);

    const fetchProject = async () => {
        id && (await trigger({ id }).unwrap());
    };
    return (
        <>
            <Title title={isEditMode? "Edit Project" : "Add Project" } />

            <FormProvider {...methods}>
                <StyledContainer>
                    <BasicInfo />
                    <ProjectSchedule />
                    <ProjectClasify />
                    <Attachments setFile={setFile} />
                    <SubmitProject isEditMode={isEditMode} projectId={(id && typeof id ===  "number" ? id : null)} file={file} data={data?.data} />
                </StyledContainer>
            </FormProvider>

        </>
    );
};

export default AddProject;
