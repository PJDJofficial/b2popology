export class Buff {

  constructor(type, operation, value, affectedAttacks, affectedAbilities, affectedPaths) {
    this.type = type;
    this.operation = operation;
    this.value = value;
    this.affectedAttacks = affectedAttacks;
    this.affectedAbilities = affectedAbilities;
    this.affectedPaths = affectedPaths;
  }

  static fromData(data) {
    if (data.affectedAbilities == null) data.affectedAbilities = [];
    if (data.affectedAttacks == null) data.affectedAttacks = [];
    return new Buff(data.type, data.operation, data.value, data.affectedAttacks, data.affectedAbilities, data.affectedPaths);
  }

  clone() {
    return new Buff(this.type, this.operation, this.value, this.affectedAttacks, this.affectedAbilities, this.affectedPaths);
  }

  toHTML() {
    const p = document.createElement('p');

    p.className = 'property-footnote';

    p.textContent = this.toString();

    return p;
  }

  toString() {
    let str = '*';

    for (let i = 0; i < this.affectedAttacks.length; i++) {
      str += ' ' + this.affectedAttacks[i]
      if (i != this.affectedAttacks.length - 1) str + ','
    }

    str += ' attack';
    if (this.affectedAttacks.length != 1) str += 's';
    str += ' buffed, ';
    if (this.operation == 'add') str += `+${this.value} ${this.type}`;
    else if (this.operation == 'mul') str += `${this.type} multiplied by ${this.value}`;
    else if (this.operation == 'div') str += `${this.type} divided by ${this.value}`;
    else if (this.operation == 'set') str += `${this.type} set to ${this.value}`;

    return str;
  }

  toHTMLSimple() {
    const li = document.createElement('li');

    let str = '';

    if (this.affectedPaths) {
      if (this.affectedPaths.includes('all')) {
        str += 'all paths excluding ';
        str
      }
      else {
        for (let i = 0; i < this.affectedPaths.length; i++) {
          if (i == 0); // pass
          else if (i != this.affectedPaths.length - 1) str += ', ';
          else if (i == this.affectedPaths.length - 1) str += ' and ';
          str += this.affectedPaths[i];
        }
        if (this.affectedPaths.length == 1) str += ' path only, ';
        else str += ' paths only, ';
      }
    }

    for (let i = 0; i < this.affectedAttacks.length; i++) {
      if (i == 0);
      else if (i != this.affectedAttacks.length - 1) str += ', ';
      else if (i == this.affectedAttacks.length - 1) str += ' and ';
      str += this.affectedAttacks[i];
    }

    str += ' attack';
    if (this.affectedAttacks.length != 1) str += 's';
    str += ' buffed: ';
    if (this.operation == 'add') str += `+${this.value} ${this.type}`;
    else if (this.operation == 'mul') str += `${this.type} multiplied by ${this.value}`;
    else if (this.operation == 'div') str += `${this.type} divided by ${this.value}`;
    else if (this.operation == 'set') str += `${this.type} set to ${this.value}`;

    li.textContent = str;

    return li;
  }

}
