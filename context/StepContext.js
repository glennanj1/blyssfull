import React, { createContext, useContext, useState, useEffect } from 'react';

const StepContext = createContext();

export const useStep = () => useContext(StepContext);

export const StepProvider = ({ children }) => {
    // Initialize state without localStorage values initially
    const [currentStep, setCurrentStep] = useState(() => {
        // Check if window is defined (i.e., running in the browser)
        if (typeof window !== 'undefined') {
          const storedStep = localStorage.getItem('currentStep');
          return storedStep ? Number(storedStep) : 1; // Default to 1 if not found
        }
        // Default to 1 if running on the server
        return 1;
      });
      

      
      const [formData, setFormData] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedFormData = localStorage.getItem('formData');
            return storedFormData ? JSON.parse(storedFormData) : {}; // Default to {} if not found
        }
        return {};
      });

      
      

    useEffect(() => {
        // Log and save currentStep to localStorage
        console.log("Saving currentStep to localStorage:", currentStep);
        localStorage.setItem('currentStep', currentStep.toString());
    
        // Log and save formData to localStorage
        console.log("Saving formData to localStorage:", formData);
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [currentStep, formData]); // Depend on both currentStep and formData
    
    

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);
    const updateFormData = (newData) => setFormData(prevFormData => ({ ...prevFormData, ...newData }));

    return (
        <StepContext.Provider value={{ currentStep, nextStep, prevStep, formData, updateFormData }}>
            {children}
        </StepContext.Provider>
    );
};
