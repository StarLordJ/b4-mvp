import * as React from 'react';
import { Button } from '../../Button';
import { IconButton } from '../../IconButton';

// import { ReactComponent as Featured } from '../../../../assets/images/svg/featured.svg';
import { ReactComponent as Logout } from '../../../../assets/images/svg/logout.svg';
import { firebaseStore } from '../../../../stores';
import { modalWrapperService } from '../../../../services';
import { LoginForm } from '../../Forms';
import { useRxStream } from '../../../../utils/hooks';

export function HeaderControls(): JSX.Element {
  const isLoggedIn = useRxStream(firebaseStore.isLoggedIn$, false);

  const onLoginButtonClick = (): void => {
    modalWrapperService.openModal({
      component: <LoginForm />,
      backgroundColor: 'rgba(86, 125, 244, 0.95)'
    });
  };

  const onLogoutButtonClick = (): void => firebaseStore.signOut();

  if (isLoggedIn) {
    return (
      <div className="header-controls">
        {/* <IconButton
          skin="light"
          circle
          className="header-controls-button favorites"
          icon={<Featured width="20" height="20" />}
        /> */}
        <IconButton
          skin="default"
          className="header-controls-button logout"
          onClick={onLogoutButtonClick}
          icon={<Logout width="20" height="20" />}
        />
      </div>
    );
  }

  return (
    <div className="header-controls">
      <Button
        skin="inverse"
        className="header-controls-button login"
        onClick={onLoginButtonClick}
      >
        Войти
      </Button>
    </div>
  );
}
