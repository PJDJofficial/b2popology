import { Attack } from './attack.js';
import { Buff } from './buff.js';
import { Ability } from './ability.js';
import { PropertiesManager } from './properties/properties-manager.js';

export class Upgrade {

  constructor(path, name, cost, attacks, buffs, abilities, subtowers, externalBuffs, endOfRound, metadata) {
    this.path = path;
    this.name = name;
    this.cost = cost;
    this.attacks = attacks;
    this.buffs = buffs;
    this.abilities = abilities;
    this.subtowers = subtowers;
    this.externalBuffs = externalBuffs;
    this.endOfRound = endOfRound;
    this.metadata = metadata
  }

  static fromData(data) {
    const attacks = (data.attacks || []).map(Attack.fromData);
    const buffs = (data.buffs || []).map(Buff.fromData);
    const abilities = (data.abilities || []).map(Ability.fromData);
    let externalBuffs = data.externalBuffs;
    if (data.externalBuffs != null) externalBuffs = PropertiesManager.createProperty('externalBuffs', data.externalBuffs);

    return new Upgrade(data.path, data.name, data.cost, attacks, buffs, abilities, data.subtowers, externalBuffs, data.endOfRound, data.metadata);
  }

  toHTML() {
    const rootContainer = document.createElement('div');
    const upgradeTitle = document.createElement('h4');
    const upgradeContent = document.createElement('ul');

    rootContainer.append(upgradeTitle, upgradeContent);

    if (this.attacks != null) this.attacks.forEach(attack => rootContainer.append(attack.toHTMLSimple()));
    //if (this.abilities != null) this.abilities.forEach(ability => rootContainer.append(ability.toHTMLSimple()));
    if (this.buffs != null) this.buffs.forEach(buff => upgradeContent.append(buff.toHTMLSimple()));

    rootContainer.classList.add('properties-container-styler');
    upgradeTitle.style.color = 'var(--text-common)';

    upgradeTitle.textContent = `${this.path} - ${this.name} - $${this.cost.toLocaleString('en-US')}`;

    return rootContainer;
  }

}
