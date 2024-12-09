'use client';

import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { CheckCircle, Circle, ArrowRight, MessageCircle, AlertCircle } from 'lucide-react';

// First, let's create our ProcessStep component that will display each individual step
const ProcessStep = ({ isActive, isComplete, title, description, templates, onClick }) => (
  <div 
    className={`p-4 border rounded-lg mb-4 cursor-pointer transition-all
      ${isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
      ${isComplete ? 'border-green-500 bg-green-50' : ''}`}
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      {isComplete ? (
        <CheckCircle className="text-green-500" size={24} />
      ) : isActive ? (
        <Circle className="text-blue-500" size={24} />
      ) : (
        <Circle className="text-gray-300" size={24} />
      )}
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        {templates && isActive && (
          <div className="mt-4 bg-gray-100 p-3 rounded-md">
            <p className="font-semibold mb-2 text-sm">Message Template:</p>
            <pre className="whitespace-pre-wrap text-sm">{templates}</pre>
          </div>
        )}
      </div>
    </div>
  </div>
);

const ReleaseProcess = () => {
    // This useState hook helps us keep track of which step we're currently on
    const [currentStep, setCurrentStep] = useState(0);
    
    // This array defines all the steps in our release process
    const steps = [
      {
        title: "1. User Story Labelling",
        description: "Tag any item that can be released outside the scheduled release window with the 'Release When Ready' label.",
      },
      {
        title: "2. QA Testing and Pre-Release Validation",
        description: "QA team collaborates with developers to test changes in TEST and PREPROD environments.",
        templates: `  Subject: PREPROD VALIDATION PASSED: [description]
        
  Hi Tech - PocketWatch,

  The following UNSCHEDULED enhancements have passed PreProd Testing:
        1. [User Story ID and Title]
        2. [User Story ID and Title]

  @[Developer] - you may now release to production.

  If anyone has any concerns, please let us know.

  Thanks!`
      },
      {
        title: "3. Developer Release Notification",
        description: "Developer notifies the Technical - Release Teams channel about the planned unscheduled release.",
        templates: `  Subject: UNSCHEDULED RELEASE: [description]
        
  Hi @Release,

  We are releasing the following items to production:
        1. [User Story ID and Title]
        2. [User Story ID and Title]

  It will only impact the PW app and should not affect other areas of the system.
  
  If anyone has any concerns, please let us know.
  
  Thanks!`
      },
      {
        title: "4. Production Deployment",
        description: "Developer deploys to production and (optionally) confirms success with a follow-up message.",
        templates: `  Subject: UNSCHEDULED RELEASE SUCCESSFUL: [description]
        
  Hi @Everyone,

  The following items have been successfully deployed to production:
        1. [User Story ID and Title]
        2. [User Story ID and Title]

  Thanks for your support!`
      }
    ];
  
    // Now we'll create the visual structure of our component
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardContent className="p-6">
          {/* Header section with title and click instruction */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">PocketWatch Unscheduled Release Process</h2>
            <div className="flex items-center gap-2">
              <MessageCircle className="text-blue-500" size={20} />
              <span className="text-sm text-gray-600">Click steps for details</span>
            </div>
          </div>
  
          {/* Important notice section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="text-amber-500" size={20} />
              <span className="text-sm font-medium">Important: All communications must be timely and changes isolated to PW app</span>
            </div>
          </div>
  
          {/* Steps section - mapping through our steps array to create each step */}
          <div className="space-y-2">
            {steps.map((step, index) => (
              <ProcessStep
                key={index}
                isActive={currentStep === index}
                isComplete={currentStep > index}
                title={step.title}
                description={step.description}
                templates={step.templates}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>
  
          {/* Navigation buttons */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              className={`px-4 py-2 rounded ${currentStep === 0 ? 'bg-gray-100 text-gray-400' : 'bg-blue-100 text-blue-600'}`}
              disabled={currentStep === 0}
            >
              Previous Step
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              className={`px-4 py-2 rounded flex items-center gap-2 ${
                currentStep === steps.length - 1 ? 'bg-green-100 text-green-600' : 'bg-blue-500 text-white'
              }`}
            >
              {currentStep === steps.length - 1 ? 'Process Complete' : 'Next Step'}
              {currentStep < steps.length - 1 && <ArrowRight size={16} />}
            </button>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  // Don't forget to export the component so we can use it in other files
  export default ReleaseProcess;