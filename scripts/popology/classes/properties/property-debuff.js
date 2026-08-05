import { Property } from './property.js'

export class PropertyDebuff extends Property {

  static DEBUFF_FORMATTED = {
    "degrow" : "removes regrow modifier",
    "decamo" : "removes camo modifer",
    "defort" : "removes fortified property",
    "delead" : "removes lead property",
    "damage" : "bloons takes extra damage",
    "noImmunity" : "bloons lose damage type immunity"
  };

  clone() {
    return new PropertyDebuff(this.key, structuredClone(this.val));
  }

  toHTML() {
    const rootContainer = document.createElement('div');
    const debuffHeader = document.createElement('h5');
    const debuffInfo = document.createElement('p');

    rootContainer.append(debuffHeader, debuffInfo);

    debuffInfo.classList.add('debuff-paragraph');

    debuffHeader.textContent = 'Applies the following debuffs on contact with bloons:';

    for (let i = 0; i < this.val.length; i++) {
      const debuff = this.val[i];
      debuffInfo.textContent += this.debuffToText(debuff);
      if (i != this.val.length - 1) debuffInfo.textContent += '\n';
    }

    return rootContainer;
  }

  debuffToText(debuff) {
    let str = '* ';
    if (debuff.debuffTarget != null) str += `applies only to ${debuff.debuffTarget}: ` ;
    if (debuff.debuffType != null) str += PropertyDebuff.DEBUFF_FORMATTED[debuff.debuffType];
    if (debuff.debuffValue != null) str += ` (${debuff.debuffValue})`;
    if (debuff.debuffDuration != null) str += ` for ${debuff.debuffDuration}s`;
    if (debuff.cantStack != null) {
      str += ', can\'t stack with: ';
      debuff.cantStack.forEach(stack => str += stack);
    }
    return str;
  }

  applyBuff(buff) {
    switch (buff.operation) {
      case 'append':
        this.val.push(buff.value);
        break;
      case 'remove':
        const newVal = [];
        this.val.forEach((debuff) => {
          if (debuff.id == null || debuff.id != buff.value) newVal.push(debuff);
        });
        this.val = newVal;
        break;
    }
  }

}
