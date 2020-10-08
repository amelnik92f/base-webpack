// 2. Реализовать на основе прототипного наследования создание модальных окон.
// У нас есть базовая функция-конструктор, Modal, у которого есть методы 1) show(), которая при вызове выводит в консоль строку следующего вида: “show THIS.NAME”  2) hide(), которая при вызове выводит в консоль строку “hide THIS.NAME”. От данной функции конструктора должны унаследоваться конструкторы других типов модальных окон:
// 1) Warning(name, message)
// 2) Success(name, message)

function Modal() {
  this.show = function () {
    console.log(`show ${this.name}`);
  };

  this.hide = function () {
    console.log(`hide ${this.name}`);
  };
}

function Warning(name, message) {
  this.name = name;
  this.message = message;
}

function Success(name, message) {
  this.name = name;
  this.message = message;
}

const context = new Modal();
Warning.prototype = context;
Success.prototype = context;

// 3. Добавить в прототип объекта метод bingo(), который при вызове выводит в консоль лог Bingo!, если у экземпляра есть ключ начинающийся на “bingo”. Например:
// // добавили наш метод bingo() в прототип объекта
//  const obj = {
// bingoBall: 2
// }
//  const obj = {
// bingeBall: 2
// }

// obj.bingo() //bingo!
// obj2.bingo() //ничего не выводится

Object.prototype.bingo = function () {
  for (const key in this) {
    if (typeof this[key] !== "function" && key.startsWith("bingo")) {
      console.log("bingo!");
      return;
    }
  }
};

// 4. Создать следующие классы:
// 1)Anouncer, от которого наследуется Figure. В классе Anouncer все один метод - present, который при вызове выводит строчку вида: Hello, I am this.type and I have size this.size
// 2) Figure, который принимает в конструкторе size и записывает его в контекст в поле size.
// 3) Circle, который наследуются от Figure и принимает в конструкторе type (не забудьте про size), записывает его в контекст в поле type и реализует метод getArea().
// 4) Square, который наследуются от Figure и принимает в конструкторе type (не забудьте про size), записывает его в контекст в поле type и реализует метод getArea()
// Проверить, что у экземпляров Square и Circle мы можем вызвать все наследуемые методы

class Anouncer {
  constructor() {}
  present() {
    console.log(`Hello, I am ${this.type} and I have size ${this.size}`);
  }
}

class Figure extends Anouncer {
  constructor(size) {
    super();
    this.size = size;
  }
}

class Circle extends Figure {
  constructor(size, type) {
    super(size);
    this.type = type;
  }
  getArea() {
    return this.size ** 2 * Math.PI;
  }
}

class Square extends Figure {
  constructor(size, type) {
    super(size);
    this.type = type;
  }
  getArea() {
    return this.size ** 2;
  }
}
// 5. Расширить прототип Number так, чтобы была возможность производить следующую операцию:
// const result = (8).add(9).multiply(3).divide(3).minus(6)
// // result = 11
// const result2 = (4).add(9).add(2).add(1).minus(10)
// // result2 = 6
Number.prototype.add = function (number) {
  return this + number;
};

Number.prototype.multiply = function (number) {
  return this * number;
};

Number.prototype.divide = function (number) {
  return this / number;
};

Number.prototype.minus = function (number) {
  return this - number;
};