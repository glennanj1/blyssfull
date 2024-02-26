import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useStep } from "../context/StepContext";
import Calcom from "./Calcom";

export default function StepOne() {
  const { handleSubmit } = useForm();
  const { nextStep, prevStep, updateFormData, formData } = useStep();


  useEffect(() => {
    updateFormData({...formData, step: {title: 'Book', number: 4}})
  }, []);

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  const onBack = () => {
    prevStep();
  }


  return (
    <div className="mt-5 md:mt-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-start-1 col-end-7">
                <Calcom theurl={formData.service.attributes.Url} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
