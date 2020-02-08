import './OHIFLogo.css';

import { Icon } from '@ohif/ui';
import React from 'react';
// import logo from './uom.png';

function OHIFLogo() {
  return (
    <div>
      <Icon name="ohif-logo" className="header-logo-image" />
      {/* Logo text would fit smaller displays at two lines:
       *
       * Open Health
       * Imaging Foundation
       *
       * Or as `OHIF` on really small displays
       */}
      <Icon name="ohif-text-logo" className="header-logo-text" />
    </div>
  );
}

export default OHIFLogo;
