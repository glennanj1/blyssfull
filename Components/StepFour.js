// components/StepOne.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { useStep } from '../context/StepContext';

export default function StepOne() {
    const { register, handleSubmit } = useForm();
    const { nextStep, updateFormData } = useStep();

    const onSubmit = (data) => {
        updateFormData(data);
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('firstName')} placeholder="First Name" />
            <input {...register('lastName')} placeholder="Last Name" />
            <button type="submit">Next</button>
        </form>
    );
}
