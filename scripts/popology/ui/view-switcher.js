export class ViewSwitcher {

  constructor(stateName, objs) {
    this.stateName = stateName;
    this.objs = objs;
    // Array of objects, each having the following entries:
    // Element - elements to hide/show
    // State - history state assosicated with that element
    // Text - text to be displayed on the button
  }

  toHTML() {
    const buttons = [];
    this.objs.forEach(obj => {
      const button = document.createElement('button');
      button.addEventListener("click", () => this.toggleVisibility(obj));
      button.classList.add('view-button');
      button.textContent = obj.text;
      buttons.push(button);
    });
    return buttons;
  }

  toggleVisibility(obj) {
    this.objs.forEach(x => x.element.hidden = true);
    obj.element.hidden = false;
    const state = window.history.state;
    state[this.stateName] = obj.state;
    history.replaceState(
      state,
      ''
    );
  }

}
