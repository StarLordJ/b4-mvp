import React, { useRef, useState, useContext } from 'react';

import { Logo } from '../Logo';
import { SvgIcon } from '../SvgIcon';
import { Button } from '../Button';
import { IconButton } from '../IconButton';

import { useOnClickOutside } from '../../../effects/useOnClickOutside';
import { FirebaseContext } from '../../../contexts/FirebaseContext';

import { ReactComponent as CaretDown } from 'assets/images/svg/caret-down.svg';
import { ReactComponent as Featured } from 'assets/images/svg/featured.svg';
import { ReactComponent as Logout } from 'assets/images/svg/logout.svg';

import { observer } from 'mobx-react';

import { Dropdown } from 'rsuite';

import './style.scss';
import { ModalsStore } from 'stores/modals';

function renderTitle(
  toggle: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
): () => JSX.Element {
  return (): JSX.Element => (
    <div className="header-dropdown-toggle" onClick={toggle}>
      <div className="header-dropdown-label">OOO "Ромашка"</div>
      <SvgIcon className="header-dropdown-icon">
        <CaretDown width="12" height="7" />
      </SvgIcon>
    </div>
  );
}

type THeaderProps = {
  store: ModalsStore;
};

export const Header = observer(
  (props: THeaderProps): JSX.Element => {
    const [isDropdownOpen, setDropdownState] = useState(false);
    const firebase = useContext(FirebaseContext);
    const ref = useRef<HTMLDivElement | null>(null);

    console.log(':L:: header', firebase);

    const onLoginButtonClick = (): void => {
      props.store.openLoginModal();
    };

    const toggle = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): boolean => {
      setDropdownState(!isDropdownOpen);

      event.stopPropagation();
      return false;
    };

    const closeDropdown = (): void => {
      setDropdownState(false);
    };

    useOnClickOutside(ref, (): void => closeDropdown());

    return (
      <header className="header">
        <a href="/">
          <Logo className="header-logo" />
        </a>

        <div className="header-company" ref={ref}>
          <Dropdown
            placement="bottomEnd"
            className="header-dropdown"
            open={isDropdownOpen}
            renderTitle={renderTitle(toggle)}
          >
            <Dropdown.Item eventKey={1}>Action</Dropdown.Item>
            <Dropdown.Item eventKey={2}>Another action</Dropdown.Item>
            <Dropdown.Item eventKey={3}>Otherwise</Dropdown.Item>
          </Dropdown>
        </div>

        <div className="header-controls">
          {((): JSX.Element => {
            if (firebase.isLoggedIn) {
              return (
                <>
                  <IconButton
                    skin="light"
                    circle
                    className="header-controls-button favorites"
                    icon={<Featured width="20" height="20" />}
                  />
                  <IconButton
                    skin="default"
                    className="header-controls-button logout"
                    icon={<Logout width="20" height="20" />}
                  />
                </>
              );
            }

            return (
              <Button
                skin="inverse"
                className="header-controls-button login"
                onClick={onLoginButtonClick}
              >
                Войти
              </Button>
            );
          })()}
        </div>
      </header>
    );
  }
);
