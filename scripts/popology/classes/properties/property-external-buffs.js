import { Property } from './property.js';

export class PropertyExternalBuffs extends Property {

  clone() {
    return new PropertyExternalBuffs(this.key, this.val.map(externalBuff => externalBuff.clone()));
  }

  toHTML() {
    const rootContainer = document.createElement('div');
    this.val.forEach(externalBuff => rootContainer.append(externalBuff.toHTML()));
    return rootContainer;
  }

}
