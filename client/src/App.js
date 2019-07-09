import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import Datasets from './Datasets'

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
    backgroundColor: '#EAFCEF',
    color: '#FFF'
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function getSteps() {
  return [
    'Northamptonshire Biodiversity Records Centre',
    'Select a dataset',
    'Add your email'
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Welcome to the NBRC API for biodiversity and geodiversity information,
              free to all who wish to use it.`;
    case 1:
      return `Select a dataset, available under the Creative Commons License`;
    case 2:
      return `Add your email to rate datasets and keep in touch. We take your privacy
              very seriously.`;
    default:
      return 'Unknown step';
  }
}

function App() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [values, setValues] = React.useState('')
  const steps = getSteps();

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleReset() {
    setActiveStep(0);
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                {index === 1 ? (<Datasets />) : (null)}
                {index === 2 ? (<TextField
                  required
                  id="standard-required"
                  label="Email"
                  className={classes.textField}
                  type="email"
                  name="email"
                  autoComplete="email"
                  margin="normal"
                  onChange={handleChange}
                />) : (null)}
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                      color="primary"
                    >
                      Back
                  </Button>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      className={classes.button}
                      color="primary"
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                    {activeStep === steps.length - 1
                      ? (<Button onClick={handleReset} className={classes.button} color="primary">
                        Reset
                          </Button>)
                      : null}
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <></>
        )}
      </div>
    </>
  );
}

export default App;
