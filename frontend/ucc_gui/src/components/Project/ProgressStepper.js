import React from 'react';
import { Stepper } from 'react-form-stepper';

class ProgressStepper extends React.Component {
    render() {
        return (
            <div>
              <Stepper connectorStyleConfig={{size:4, stepSize:'4em', style:'solid'}}
                    styleConfig = {{activeBgColor: '#2BB9B7', completedBgColor:'#2BB9B7', inactiveBgColor:'#555555'}}
                steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]}
                activeStep={this.props.currentStep}
              />
          </div>
        );
    }
}


export default ProgressStepper;
