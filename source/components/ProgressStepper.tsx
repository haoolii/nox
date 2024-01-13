import { Box, Step, Stepper } from '@mui/material';
import { FC } from 'react';

const ProgressStepper: FC<{ activeStep: number; steps: any[] }> = ({ activeStep, steps }) => {
  return (
    <Stepper
      activeStep={activeStep}
      sx={{
        '& .MuiStepConnector-lineHorizontal': {
          borderColor: '#28282F',
          borderWidth: '5px',
          position: 'relative',
        },
        '& .MuiStepConnector-horizontal.Mui-completed,.MuiStepConnector-horizontal.Mui-active': {
          '.MuiStepConnector-lineHorizontal:before': {
            content: '" "',
            width: '100%',
            border: '2px solid #6667AB',
            position: 'absolute',
            bottom: '0',
          },
        },
        '& .stepActive + .MuiStepConnector-horizontal.Mui-disabled': {
          '.MuiStepConnector-lineHorizontal:before': {
            content: '" "',
            width: '50%',
            border: '2px solid #6667AB',
            position: 'absolute',
            bottom: '0',
          },
        },
      }}
    >
      {steps.map((cur, index) => (
        <Step
          active={index === activeStep}
          className={index === activeStep ? 'stepActive' : ''}
          completed={index < activeStep}
          key={cur}
          sx={{
            px: 0,
            '&.Mui-completed,&.stepActive': {
              '.stepIndicator': {
                border: '2px solid #fff',
                bgcolor: '#6667AB',
              },
            },
          }}
        >
          <Box
            className="stepIndicator"
            sx={{
              borderRadius: '50%',
              height: '0.75rem',
              width: '0.75rem',
              border: '2px solid #A4A4B2',
            }}
          ></Box>
        </Step>
      ))}
    </Stepper>
  );
};

export default ProgressStepper;
