import { PropertyBasic } from './property-basic.js';

export class PropertyDamageType extends PropertyBasic {

  clone() {
    return new PropertyDamageType(this.key, this.val);
  }

  formattedValue() {
    return this.val[0].toUpperCase() + this.val.slice(1);
  }

}
