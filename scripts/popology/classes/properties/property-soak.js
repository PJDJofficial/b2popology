import { PropertyAttributed } from './property-attributed.js';

export class PropertySoak extends PropertyAttributed {

  formattedValue() {
    return `${super.formattedValue()} layers`;
  }

}
