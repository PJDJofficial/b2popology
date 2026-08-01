import { Property } from './property.js';

export class PropertyIconedUnkeyed extends Property {

  clone() {
    return new PropertyIconedUnkeyed(this.key, this.val);
  }

  toHTML() {

    function toFileName(id) {
      return id.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }

    if (!this.key || this.val == null) return;

    const mainContainer = document.createElement('div');
    const topContainer = document.createElement('div');
    const botContainer =document.createElement('div');
    const p = document.createElement('p');
    const icon = document.createElement('img');

    mainContainer.append(topContainer, botContainer);
    topContainer.append(icon);
    botContainer.append(p);

    mainContainer.className = 'property-iconed-container';
    topContainer.classList.add('property-iconed-top');
    botContainer.classList.add('property-iconed-bottom');

    icon.src = '/media/property-icons/' + toFileName(this.key) + '.png';
    p.textContent = this.val;

    return mainContainer;
  }

}
