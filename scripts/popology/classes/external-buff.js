import { Buff } from "./buff.js";

export class ExternalBuff {

  constructor(targets, buffs) {
    this.targets = targets;
    this.buffs = buffs;
  }

  clone() {
    return new ExternalBuff(Array.from(this.targets), this.buffs.map(buff => buff.clone()));
  }

  static fromData(data) {
    return new ExternalBuff(data.targets, data.buffs.map(Buff.fromData));
  }

  toHTML() {
    const rootContainer = document.createElement('div');
    const header = document.createElement('h5');
    const buffList = document.createElement('ul');

    rootContainer.append(header, buffList);

    rootContainer.style.display = 'inline-block';

    let str = 'Buffs nearby towers: ';
    this.targets.forEach(target => str += ` ${target}`);
    header.textContent = str;
    this.buffs.forEach(buff => buffList.append(buff.toHTML()));

    return rootContainer;
  }

}
