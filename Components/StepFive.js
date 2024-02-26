// components/StepOne.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { useStep } from '../context/StepContext';
import Calcom from './Calcom';
export default function StepOne() {
    const { register, handleSubmit } = useForm();
    const { nextStep, updateFormData, formData } = useStep();

    const onSubmit = (data) => {
        updateFormData(data);
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Calcom theurl={formData?.url} />
            <button type="submit">Next</button>
        </form>
    );
}
