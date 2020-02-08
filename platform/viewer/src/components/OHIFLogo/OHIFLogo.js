import './OHIFLogo.css';

import { Icon } from '@ohif/ui';
import React from 'react';
// import logo from './uom.png';

function OHIFLogo() {
  return (
    <div>
      {/* <Icon name="ohif-logo" className="header-logo-image" /> */}

      <img className="header-logo-image" src={process.env.PUBLIC_URL + 'assets/uom.png'} />
    </div>
  );
}

export default OHIFLogo;
