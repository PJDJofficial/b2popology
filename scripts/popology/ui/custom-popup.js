export class CustomPopup {

  constructor(...content) {
    this.content = content;
  }

  activate() {
    const popupBackground = document.createElement('div');
    const popupWindow = document.createElement('div');
    const popupExitButton= document.createElement('button');

    document.body.prepend(popupBackground, popupWindow);
    popupWindow.append(popupExitButton, ...this.content);

    popupBackground.classList.add('popup-background');
    popupWindow.classList.add('popup-window');
    popupExitButton.classList.add('popup-exit-button');

    popupExitButton.textContent = 'X';

    popupExitButton.addEventListener('click', () => {
      popupBackground.remove();
      popupWindow.remove();
    });
  }

}
