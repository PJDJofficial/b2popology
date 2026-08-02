import { PropertyBasic } from './property-basic.js';

export class PropertyTime extends PropertyBasic {

  clone() {
    return new PropertyTime(this.key, this.val);
  }

  formattedValue() {
    if (this.key == 'initialCooldown' && this.val == 0) return '0s';
    return `${this.val}s`;
  }

}
