import React, { createContext, useContext, useState, useEffect } from "react";

const StepContext = createContext();

export const useStep = () => useContext(StepContext);

export const StepProvider = ({ children }) => {
  // Initialize state with default values initially
  const [isClient, setIsClient] = useState(false);

  const [currentStep, setCurrentStep] = useState(() => {
    if (typeof window !== "undefined") {
      const storedStep = localStorage?.getItem("currentStep");
      return storedStep ? Number(storedStep) : 1; // Use stored value or default to 1
    }
  });

  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const storedFormData = localStorage?.getItem("formData");
      return storedFormData ? JSON.parse(storedFormData) : {}; // Use stored value or default to {}
    }
  });

  useEffect(() => {
    setIsClient(true);
    // Only run this effect on the client side
    const storedStep = localStorage.getItem("currentStep");
    if (storedStep) {
      setCurrentStep(Number(storedStep));
    }

    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  useEffect(() => {
    // These effects run after the component mounts, thus avoiding hydration mismatches
    console.log("Saving currentStep to localStorage:", currentStep);
    localStorage.setItem("currentStep", currentStep.toString());

    console.log("Saving formData to localStorage:", formData);
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [currentStep, formData]); // Depend on both currentStep and formData to update localStorage when they change

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);
  const updateFormData = (newData) =>
    setFormData((prevFormData) => ({ ...prevFormData, ...newData }));

  return (
    <StepContext.Provider
      value={{ currentStep, nextStep, prevStep, formData, updateFormData }}
    >
      {isClient ? children : null}
    </StepContext.Provider>
  );
};
