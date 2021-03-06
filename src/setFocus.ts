import { getFocusMerge } from './focusMerge';

export const focusOn = (target: HTMLInputElement | HTMLFrameElement) => {
  target.focus();
  if ('contentWindow' in target && target.contentWindow) {
    target.contentWindow.focus();
  }
};

let guardCount = 0;
let lockDisabled = false;

export const setFocus = (topNode: HTMLElement, lastNode: HTMLInputElement) => {
  const focusable = getFocusMerge(topNode, lastNode);

  if (lockDisabled) {
    return;
  }

  if (focusable) {
    if (guardCount > 2) {
      // tslint:disable-next-line:no-console
      console.error(
        'FocusLock: focus-fighting detected. Only one focus management system could be active. ' +
          'See https://github.com/theKashey/focus-lock/#focus-fighting'
      );
      lockDisabled = true;
      setTimeout(() => {
        lockDisabled = false;
      }, 1);
      return;
    }
    guardCount++;
    focusOn(focusable.node);
    guardCount--;
  }
};
