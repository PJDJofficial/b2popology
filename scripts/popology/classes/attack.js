import { PropertiesManager } from './properties/properties-manager.js';
import { PropertiesContainer } from '../ui/properties-container.js';

export class Attack {

  constructor(id, name, overwrites, properties) {
    this.id = id;
    this.name = name;
    this.overwrites = overwrites;
    this.properties = properties;
  }

  static fromData(data) {
    const properties = PropertiesManager.propertiesFromData(data.properties);
    return new Attack(data.id, data.name, data.overwrites, properties);
  }

  clone() {
    const properties = [];
    this.properties.forEach((property) => {
      properties.push(property.clone());
    });

    return new Attack(this.id, this.name, this.overwrites, properties);
  }

  addFlag(flag) {
    if (this.properties.flags == null) this.properties.flags = [];
    this.properties.flags.push(flag);
  }

  buffedBy(buff) {
    const attack = this.clone();
    // buff the embedded attacks before anything else
    {
      let embeddedAttacks = attack.properties.find(property => property.key == 'embeddedAttacks');
      if (embeddedAttacks != null) {
        const buffedAttacks = [];
        embeddedAttacks.val.forEach((embeddedAttack) => {
          buffedAttacks.push(embeddedAttack.buffedBy(buff));
        });
        embeddedAttacks.val = buffedAttacks;
      }
    }
    if (
      (!buff.affectedAttacks.includes('EX_' + this.id)) &&
      ((buff.affectedAttacks.includes('all')) || (buff.affectedAttacks.includes(this.id)))
    ) {
      // handle special buffs that append some embedded object
      if (buff.type == 'appendDoT') {
        if (attack.properties.dots == null) attack.properties.dots = [];
        attack.properties.push(PropertiesManager.createProperty('dot', buff.value));
        return attack;
      }
      if (buff.type == 'appendAttack') {
        let embeddedAttacks = attack.properties.find(property => property.key == 'embeddedAttacks');
        if (embeddedAttacks == null) {
          embeddedAttacks = PropertiesManager.createProperty('embeddedAttacks', [])
          attack.properties.push(embeddedAttacks);
        }
        embeddedAttacks.val.push(Attack.fromData(buff.value));
        return attack;
      }
      // apply property buffs, if buff doesn't exist but has the operator 'set', then create the property
      let propertyToBuff = attack.properties.find(property => property.key == buff.type);
      if (propertyToBuff == null) {
        if (buff.operation == 'set') {
          propertyToBuff = PropertiesManager.createProperty(buff.type, buff.value);
          attack.properties.push(propertyToBuff);
        } // exceptions to create default values on add/append
        if (buff.operation == 'add' && buff.type == 'bonusDamage') {
          propertyToBuff = PropertiesManager.createProperty(buff.type, {});
          attack.properties.push(propertyToBuff);
        }
        if (buff.operation == 'add' && buff.type == 'projectiles') {
          propertyToBuff = PropertiesManager.createProperty(buff.type, 1);
          attack.properties.push(propertyToBuff);
        }
        if (
          (buff.operation == 'append' && buff.type == 'summonAttack') ||
          buff.operation == 'add' && buff.type == 'notes'
        ) {
          propertyToBuff = PropertiesManager.createProperty(buff.type, []);
          attack.properties.push(propertyToBuff);
        }
      }
      if (propertyToBuff != null) propertyToBuff.applyBuff(buff);
    }
    // damage buffs get applied to crits too
    /*if (buff.type == 'damage' && this.properties.find(property => property.key == 'crit') != null) {
      const newBuff = buff.clone();
      newBuff.type = 'crit';
      return attack.buffedBy(newBuff);
    }*/
    attack.clearEmptyArrays();
    return attack;
  }

  clearEmptyArrays() {
    const newProperties = [];
    this.properties.forEach((property) => {
      if (property.key == 'summonAttacks' && property.val.length == 0); // pass
      else newProperties.push(property);
    });
    this.properties = newProperties;
  }

  toHTML() {
    const rootContainer = document.createElement('div');

    if (this.name != null && (this.properties.flags == null || !this.properties.flags.includes('noHeader')) ) {
      const attackName = document.createElement('h4');
      rootContainer.append(attackName)
      attackName.textContent = `${this.name} Attack`;
    }

    const centerContainer = document.createElement('div');
    const propertiesContainer = new PropertiesContainer(this.properties, this);
    propertiesContainer.addChildren(this.dots);

    if (this.properties.flags != null && this.properties.flags.includes('thirdaryBackground')) {
      const backgroundColorVariable = '--background-thirdary';
      const backgroundColor = window.getComputedStyle(document.body).getPropertyValue(backgroundColorVariable);
      propertiesContainer.setBackgroundColor(backgroundColor);
    }

    rootContainer.append(centerContainer);
    centerContainer.append(propertiesContainer.toHTML());

    centerContainer.classList.add('center-container');

    return rootContainer;
  }

  toHTMLSimple() {
    const minorProperties = PropertiesManager.sortProperties(this.properties, 'minor');
    const unkeyProperties = PropertiesManager.sortProperties(this.properties, 'unkey');
    const majorProperties = PropertiesManager.sortProperties(this.properties, 'major');

    const rootli = document.createElement('li');
    const propertiesul = document.createElement('ul');
    const minorli = document.createElement('li');

    rootli.append(document.createTextNode(`${this.id} attack:`), propertiesul);
    if (this.overwrites != null && this.overwrites.length > 0) {
      let str = 'replaces ';
      for (let i = 0; i < this.overwrites.length; i++) {
        str += this.overwrites[i];
        if (i != this.overwrites.length - 1) str += ', ';
      }
      str += ' attacks';
      const overwritesli = document.createElement('li');
      overwritesli.textContent = str;
      propertiesul.append(overwritesli);
    }
    propertiesul.append(minorli);

    {
      let str = '';
      for (let i = 0; i < minorProperties.length; i++) {
        str += minorProperties[i].toText(this);
        if (i == minorProperties.length - 1); // pass
        else str += ', ';
      }
      minorli.textContent = str;
    }

    return rootli;
  }

}
