class Equation {
    var1: number;
    sign: string;
    var2: number;
    solution: number; // Вычесляем ответ и кладем в эту переменную
    constructor() {
        // Создаем новый рандомный пример
        switch (randint(0, 3)) { // Случайное число от 0 до 3 означает используемый знак
            case 0: // "-", второе число меньше первого
                this.sign = "-";
                do {
                    this.var1 = randint(1, 99); this.var2 = randint(1, 99);
                } while (!(this.var1 >= this.var2));
                this.solution = this.var1 - this.var2;
                break
            case 1: // "+", оба числа до 99
                this.sign = "+";
                this.var1 = randint(1, 99); this.var2 = randint(1, 99);
                this.solution = this.var1 + this.var2;
                break
            case 2: // "*", оба числа до 5 (указывать руками)
                this.sign = "*";
                this.var1 = randint(1, 5); this.var2 = randint(1, 5);
                this.solution = this.var1 * this.var2;
                break
            case 3: // "/", первое число больше второго и делится целочисленно
                this.sign = "/";
                do {
                    this.var1 = randint(1, 25); this.var2 = randint(1, 5);
                } while (!(this.var1 >= this.var2 && this.var1 % this.var2 == 0));
                this.solution = this.var1 / this.var2;
                break
        };
    }

    // [-] Генератор изображения цифр, знака и ответа, который должен отчищаться
    
};

/**
 * МЕНЯЕМ ЦИФРЫ В ОТВЕТЕ
 */

/** Функция обновляет отображаемое число в ответе
 * Желательно выделить эту функцию в объект или класс
 * 
 * Найти нужный объект, удалить и переписать его используя готовую функцию
 */
/** 
function updateSolution(text: TextType, dif: number) {
    if (dif > 0 && text.currentValue == 9) {
        text.currentValue = 0;
    } else if (dif < 0 && text.currentValue == 0) {
        text.currentValue = 0;
    } else {
        text.currentValue += dif;
    }
    // Записываем текстовое значение ячейки
    text.symbols[text.i].value = convertToText(text.currentValue);
    
    // Удаляем предыдущий спрайт с цифрой
    sprites.destroy(text.symbols[text.i].sprite);
    // Перерисовываем один из символов ответа
    text.symbols[text.i].sprite = drawOnesSymbol(text.symbols[text.i].value, text.x, text.y);
    
    // Обновляем курсор
    sprites.destroy(text.arrow);
    //moveArrow(text, text.x, text.y);

    // При движении вправо добавлять новые знаки, например нуля
}
 * /





/** КОНТРОЛЛЕР */
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    test.moveCursor(-1);
    /**
    if (solutionView.i > 0) {
        moveArrow(solutionView, -1);
        music.footstep.play()
    } else {
        music.knock.play()
    } */
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    test.moveCursor(1);
    /**
    if (solutionView.i < 2) {
        moveArrow(solutionView, 1);
        music.footstep.play()
    } else {
        music.knock.play()
    }
     */
})

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    test.moveCursor(0, 1);
    //updateSolution(solutionView, 1);
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    test.moveCursor(0, -1);
    //updateSolution(solutionView, -1);
})


/** ИНИЦИАЛИЗАЦИЯ */
/**
const eq = new Equation;
// Рисуем новое уровнение
let equationView: TextType = drawSymbols(`${eq.var1}${eq.sign}${eq.var2}=`, 3, 2);
// Рисуем новый ответ на уровнение
let solutionView: TextType = drawSymbols("0", equationView.x + 1, equationView.y, true)
 */

const chars = sprites;

// Возможно стоит просто к станадртному классу добавить возможность перемещать его не по абсолютному x/y, а по знакоместам.
class mySprite extends Sprite {
    private myx: number;
    private myy: number;
    private deltaWidth: number;
    private deltaHeight: number;
    private symbolWidth: number;
    private symbolHeight: number;

    constructor(image: Image) {
        super(image);
        this.deltaWidth = this._div(5, 2) + 1;
        this.deltaHeight = this._div(7, 2) + 2;
        this.symbolWidth = 5 + 1;
        this.symbolHeight = 7 + 1;
        this.myx = 0;
        this.myy = 0;
    }

    // Целочисленное деление без остатка
    private _div(val: number, by: number) {
        return (val - val % by) / by
    }

    /** Функция для перемещения любого знака
     * moveCursor(dx: number = 0, dy: number = 0) {
        const minmax = this.dx + dx;
        if (minmax >= 0 && minmax < this.length && dy == 0) {
            this.myInfo1.changeImage(convertToText(this.dx));
            sprites.destroy(this.arrow);
            this.arrow = this.drawOnesSymbol("|", this.x += dx, this.y);
            this.dx += dx;
            this.currentValue = parseInt(this.symbols[this.dx].value);
            this.myInfo2.changeImage(convertToText(this.dx));
        }
    }
     */
    

    public get myX(): number {
        return this.myx;
    }
    public get myY(): number {
        return this.myy;
    }

    public set myX(x: number) {
        this.myx = x; // Сохраняем на случай крайней нужды
        this.x = x * this.symbolWidth + this.deltaWidth;
    }
    
    public set myY(y: number) {
        this.myy = y;
        this.y = y * this.symbolWidth + this.deltaWidth;
    }
    

    changeImage(text: string) {
        this.setImage(this.findChar(text));
    }

    // Поиск картинок в Assets
    findChar(char: string) {
        switch (char) {
            case "0": return assets.image`0`;
            case "1": return assets.image`1`;
            case "2": return assets.image`2`;
            case "3": return assets.image`3`;
            case "4": return assets.image`4`;
            case "5": return assets.image`5`;
            case "6": return assets.image`6`;
            case "7": return assets.image`7`;
            case "8": return assets.image`8`;
            case "9": return assets.image`9`;
            case "+": return assets.image`Sign0`;
            case "-": return assets.image`Sign1`;
            case "*": return assets.image`Sign2`;
            case "/": return assets.image`Sign3`;
            case "=": return assets.image`Sign4`;
            case "|": return assets.image`Arrow`; // SpriteKind.Arrow
            default: return assets.image`error`;
        }
    }
}

class Text {
    value: string;
    symbols: Array<{
        value: string,
        sprite: mySprite,
    }>;
    y: number;
    x1: number;
    x: number;
    dx: number = 0;
    length: number = undefined;
    currentValue: number;
    deltaWidth: number;
    deltaHeight: number;
    symbolWidth: number;
    symbolHeight: number;
    arrow: mySprite | undefined;
    myInfo1: mySprite;
    myInfo2: mySprite;

    constructor(value: string, x1: number = 0, y: number = 0, cursor: boolean = false) { // Создаем новый текст
        this.x1 = x1;
        this.y = y;
        this.value = value;
        this.deltaWidth = this._div(5, 2) + 1;
        this.deltaHeight = this._div(7, 2) + 2;
        this.symbolWidth = 5 + 1;
        this.symbolHeight = 7 + 1;
        this.symbols = []; // создаем массив
        this._gen(value); // заполняем значениями с помощью метода
        if (cursor) {
            this.arrow = this.drawOnesSymbol("|", this.x, this.y);
            //this.currentValue = parseInt(this.symbols[this.i].value); Надо перенести в какой-то раздел где уже подсчитаны все значения
        };
    }

    _gen(value: string) {
        this.length = value.length;
        for (this.dx; this.dx < value.length; this.dx++) {
            this.symbols.push({
                value: value[this.dx],
                sprite: this.drawOnesSymbol(value[this.dx], this.x1 + this.dx, this.y), // вызывает и возвращает значение
            });
        }
        this.dx += - 1;
        this.x = this.x1 + this.dx;
    }

    changeChar(sprite: mySprite, text: string) {
        sprite.changeImage(text);
        return sprite;
    }

    // Управляем курсором
    moveCursor(dx: number = 0, dy: number = 0) {
        const minmax = this.dx + dx;
        if (minmax >= 0 && minmax < this.length && dy == 0) {
            this.myInfo1.changeImage(convertToText(this.dx));
            sprites.destroy(this.arrow);
            this.arrow = this.drawOnesSymbol("|", this.x += dx, this.y);
            this.dx += dx;
            this.currentValue = parseInt(this.symbols[this.dx].value);
            this.myInfo2.changeImage(convertToText(this.dx));
        }
        /**if (dx == 0 && dy !== 0) {
            if (dy > 0 && this.currentValue == 9) {
                this.currentValue = 0;
            } else if (dy < 0 && this.currentValue == 0) {
                this.currentValue = 0;
            } else {
                this.currentValue += dy;
            }
            sprites.destroy(this.symbols[this.dx].sprite);
            this.symbols[this.dx] = {
                sprite: this.drawOnesSymbol(convertToText(this.currentValue), this.x, this.y),
                value: convertToText(this.currentValue)
            }
        } else if (dx !== 0 && dy == 0) {
            if (!((this.dx + dx) < 0) && !((this.dx + dx) >= (this.length - 1))) {

            }
        }  */
        
    }

    // Отрисовка отдельного символа (картинка 5x7) по нужным координатам с поправкой на ширину картинки
    drawOnesSymbol(char: string, x: number, y: number) {
        //const charView: mySprite = mySprite.prototype.create(this.findChar(char), SpriteKind.Text);
        //charView.setPosition(x * this.symbolWidth + this.deltaWidth, y * this.symbolHeight + this.deltaHeight);
        //return charView;
    }

    // Поиск картинок в Assets
    findChar(char: string) {
        switch (char) {
            case "0": return assets.image`0`;
            case "1": return assets.image`1`;
            case "2": return assets.image`2`;
            case "3": return assets.image`3`;
            case "4": return assets.image`4`;
            case "5": return assets.image`5`;
            case "6": return assets.image`6`;
            case "7": return assets.image`7`;
            case "8": return assets.image`8`;
            case "9": return assets.image`9`;
            case "+": return assets.image`Sign0`;
            case "-": return assets.image`Sign1`;
            case "*": return assets.image`Sign2`;
            case "/": return assets.image`Sign3`;
            case "=": return assets.image`Sign4`;
            case "|": return assets.image`Arrow`; // SpriteKind.Arrow
            default: return assets.image`error`;
        }
    }

    // Целочисленное деление без остатка
    _div(val: number, by: number) {
        return (val - val % by) / by
    }
};

const test = new Text("012345", 2, 2, true)