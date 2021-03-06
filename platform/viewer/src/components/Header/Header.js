import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import ConnectedUserPreferencesForm from '../../connectedComponents/ConnectedUserPreferencesForm';
import { Dropdown, AboutContent, withModal } from '@ohif/ui';
import OHIFLogo from '../OHIFLogo/OHIFLogo.js';
import './Header.css';

// Context
import AppContext from './../../context/AppContext';

function Header(props) {
  const {
    t,
    user,
    userManager,
    modal: { show },
    home,
    location,
    children,
  } = props;

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const optionsValue = [
      {
        title: t('Nosotros'),
        icon: { name: 'info' },
        onClick: () =>
          show({
            content: AboutContent,
            title: t('Visualizador de Estudios - Nosotros'),
          }),
      },
      {
        title: t('Preferencias'),
        icon: {
          name: 'user',
        },
        onClick: () =>
          show({
            content: ConnectedUserPreferencesForm,
            title: t('User Preferencias'),
          }),
      },
    ];

    if (user && userManager) {
      optionsValue.push({
        title: t('Logout'),
        icon: { name: 'power-off' },
        onClick: () => userManager.signoutRedirect(),
      });
    }

    setOptions(optionsValue);
  }, [setOptions, show, t, user, userManager]);

  const { appConfig = {} } = AppContext;
  const showStudyList =
    appConfig.showStudyList !== undefined ? appConfig.showStudyList : true;

  // ANTD -- Hamburger, Drawer, Menu
  return (
    <>
      {/* <div className="notification-bar">{t('USO COMERCIAL')}</div> */}
      <div className={`entry-header ${home ? 'header-big' : ''}`}>
        <div className="header-left-box">
          {location && location.studyLink && (
            <Link
              to={location.studyLink}
              className="header-btn header-viewerLink"
            >
              {t('Volver')}
            </Link>
          )}

          {/* {children} */}

          {home && (
            <img className="logo" src={process.env.PUBLIC_URL + 'assets/uom.png'} />
          )}


          {showStudyList && !home && (
            <Link
              className="header-btn header-studyListLinkSection"
              to={{
                pathname: '/',
                state: { studyLink: location.pathname },
              }}
            >

              {t('Lista de estudios')}
            </Link>
          )}
        </div>

        <div className="header-menu">
          {/* <span className="research-use">{t('USO COMERCIAL')}</span> */}
          <Dropdown title={t('Options')} list={options} align="right" />
        </div>
      </div>
    </>
  );
}

Header.propTypes = {
  home: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  children: PropTypes.node,
  t: PropTypes.func.isRequired,
  userManager: PropTypes.object,
  user: PropTypes.object,
  modal: PropTypes.object,
};

Header.defaultProps = {
  home: true,
  children: OHIFLogo(),
};

export default withTranslation(['Header', 'AboutModal'])(
  withRouter(withModal(Header))
);
