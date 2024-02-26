// components/StepOne.js
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useStep } from '../context/StepContext';

export default function StepOne() {
    const { register, handleSubmit, setValue } = useForm();
    const { nextStep, updateFormData, formData } = useStep();
    

    const onSubmit = (data) => {
        updateFormData(data);
        nextStep();
    };

    useEffect(() => {
        updateFormData({...formData, step: {title: 'Pick an additional Service', number: 2}})
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('firstName')} placeholder="First Name" />
            <input {...register('lastName')} placeholder="Last Name" />
            <button type="submit">Next</button>
        </form>
    );
}
