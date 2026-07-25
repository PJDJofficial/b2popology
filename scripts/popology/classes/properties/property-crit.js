import { PropertyUnkeyed } from './property-unkeyed.js';

export class PropertyCrit extends PropertyUnkeyed {

  clone() {
    return new PropertyCrit(this.key, Array.from(this.val));
  }

  getFormattedValue() {
    return `Crits every ${this.val[0]} attacks dealing ${this.val[1]} damage`;
  }

  getOutlineVariable() {
    return '--outline-orange';
  }

  applyBuff(buff) {
    switch (buff.operation) {
      case 'add':
        if (Array.isArray(buff.value)) {
          this.val[0] += buff.value[0];
          this.val[1] += buff.value[1];
        }
        else this.val[1] = this.val[1] + buff.value;
        break;
      case 'mul':
        this.val[1] = parseFloat((this.val[1] * buff.value).toFixed(4));
        break;
      case 'div':
        this.val[1] = parseFloat((this.val[1] / buff.value).toFixed(4));
      case 'set':
        if (Array.isArray(buff.value)) this.val = buff.value;
        else this.val[1] = buff.value;
        break;
    }
  }

}
