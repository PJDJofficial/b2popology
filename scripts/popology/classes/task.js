export class Task {

  constructor(target, operation, value, filter) {
    this.target = target;
    this.operation = operation;
    this.value = value;
    this.filter = filter;
  }

  clone() {
    const target = Array.isArray(this.target) ? Array.from(this.target) : this.target;
    const filter = Array.isArray(this.filter) ? Array.from(this.filter) : this.filter;
    return new Task(target, this.operation, this.value, filter);
  }

  static fromData(data) {
    return new Task(data.target, data.operation, data.value, data.filter);
  }

  toHTML() {
    /*const p = document.createElement('p');

    p.className = 'property-footnote';

    let str = '*';
    for (let i = 0; i < this.affectedAttacks.length; i++) {
      str += ' ' + this.affectedAttacks[i]
      if (i != this.affectedAttacks.length - 1) str + ','
    }
    str += ' attack';
    if (this.affectedAttacks.length != 1) str += 's';
    str += ' buffed, ';
    if (this.operation == 'add') str += `+${this.value} ${this.targets}`;
    else if (this.operation == 'mul') str += `${this.targets} multiplied by ${this.value}`;
    else if (this.operation == 'div') str += `${this.targets} divided by ${this.value}`;
    else if (this.operation == 'set') str += `${this.targets} set to ${this.value}`;

    p.textContent = str;
    return p;*/
  }

}
