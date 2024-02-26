// context/StepContext.js
'use client'
import React, { createContext, useContext, useState } from 'react';

const StepContext = createContext();

export const useStep = () => useContext(StepContext);

export const StepProvider = ({ children }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({}); // Store all form data here

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);
    const updateFormData = (newData) => setFormData({ ...formData, ...newData });

    return (
        <StepContext.Provider value={{ currentStep, nextStep, prevStep, formData, updateFormData }}>
            {children}
        </StepContext.Provider>
    );
};
