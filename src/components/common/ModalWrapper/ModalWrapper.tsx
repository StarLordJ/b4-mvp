import * as React from 'react';
import Modal from 'react-modal';
import { modalWrapperService, TModalWrapperState } from '../../../services';
import classnames from 'classnames';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ReactComponent as Cross } from './cross.svg';

import './style.scss';
import { SvgIcon } from '../SvgIcon';

export class ModalWrapper extends React.Component<{}, TModalWrapperState> {
  private destroy$: Subject<void> = new Subject();
  public readonly state: TModalWrapperState = {
    component: null,
    isOpened: false,
    animateWrapper: false
  };

  public componentDidMount(): void {
    Modal.setAppElement('#root');
    modalWrapperService.modalState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: TModalWrapperState): void => this.setState(state));
  }

  public componentWillUnmount(): void {
    this.destroy$.next(void 0);
    this.destroy$.complete();
  }

  public render(): React.ReactNode {
    const wrapperClassName = classnames({
      reactModalContentAnimatedFadeIn:
        this.state.animateWrapper && this.state.isOpened,
      reactModalContentAnimatedFadeOut:
        this.state.animateWrapper && !this.state.isOpened,
      reactModalContentIsVisible:
        !this.state.animateWrapper && this.state.isOpened
    });
    const overlayClassName = classnames({
      reactModalOverlayCustomFadeIn: this.state.isOpened,
      reactModalOverlayCustomFadeOut: !this.state.isOpened
    });
    return (
      <Modal
        closeTimeoutMS={modalWrapperService.ANIMATION_TIME_MS}
        className={wrapperClassName}
        overlayClassName={overlayClassName}
        isOpen={this.state.isOpened}
        style={{ overlay: { backgroundColor: this.state.backgroundColor } }}
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
        onRequestClose={modalWrapperService.closeModal}
        shouldFocusAfterRender={false}
      >
        <div className="modalWrapperContent">
          {this.state.component}
          <div
            className="modalWrapperCloseIconContainer"
            onClick={modalWrapperService.closeModal}
          >
            <SvgIcon>
              <Cross width="24" height="24" />
            </SvgIcon>
          </div>
        </div>
      </Modal>
    );
  }
}
