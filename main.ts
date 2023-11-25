/** Пользовательский класс MySprite
 * К стандартному классу Sprite добавляем пользовательские my_x/my_y координаты в системе координат,
 * основанной на знакоместах, вместо абсолютных координат x/y
 */
class MySprite extends Sprite {
    private _my_x: number;
    private _my_y: number;
    private fontWidth: number;
    private fontHeight: number;

    constructor(image: Image, my_x = 0, my_y = 0, fontWidth = 5, fontHeight = 7) {
        super(image);
        // Эти параметры будут вычисляться каждый раз, каждый символ, желательно вывести в более базовый объект
        this._my_x = my_x;
        this._my_y = my_y;
        this.fontWidth = fontWidth;
        this.fontHeight = fontHeight;
        this.setMyPosition(this._my_x, this._my_y);
    }

    // Целочисленное деление без остатка
    private _div(val: number, by: number) {
        return (val - val % by) / by;
    }
    
    public get my_x(): number {
        return this._my_x;
    }
    public get my_y(): number {
        return this._my_y;
    }

    public set my_x(value: number) {
        this._my_x = value;
        this.x = this._my_x * (this.fontWidth + 1) + (this._div(this.fontWidth, 2) + 1);
    }
    public set my_y(value: number) {
        this._my_y = value;
        this.y = this._my_y * (this.fontHeight + 1) + (this._div(this.fontHeight, 2) + 2);
    }

    // Пользовательский метод аналог setPosition, но для перемещения по знакоместам, а не абсолютным координатам
    public setMyPosition(my_x: number, my_y: number) {
        this.my_x = my_x;
        this.my_y = my_y;
        //this.setPosition(this._my_x * (this.fontWidth + 1) + (this._div(this.fontWidth, 2) + 1), this._my_y * (this.fontHeight + 1) + (this._div(this.fontHeight, 2) + 2));
    }    
}

/** Класс Текст */
class Text {
    text: string;
    _my_x: number;
    _my_y: number;
    //lastX: number = 0;
    //lastY: number = 0;
    length: number = undefined;
    array: Array<MySprite> = [];

    constructor(text: string, x: number = 0, y: number = 0) { // Создаем новый текст
        this.text = text;
        this._my_x = x;
        this._my_y = y;
        this.length = text.length;
        this.array = [];
        this._init(); // заполняем значениями с помощью метода
    }

    // Поиск картинок в Assets
    private _findChar(char: string) {
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

    private _init() {
        for (let i: number = 0; i < this.length; i++) {
            this.array.push(new MySprite(this._findChar(this.text[i]), this._my_x + i, this._my_y)) // Находим нужную картинку и генерируем в один присест
        }
    }

    // Метод перемещения всего текста разом
    public setPosition(newX: number, newY: number) {
        this._my_x = newX;
        this._my_y = newY;
        const deltaX = newX - this.array[0].my_x;
        const deltaY = newY - this.array[0].my_y;

        for (let el of this.array) {
            el.setMyPosition(
                el.my_x + deltaX,
                el.my_y + deltaY
            );
        }
    }

    get my_x() { return this._my_x }
    get my_y() { return this._my_y }

    set my_x(value) {
        this._my_x = value;
        this.setPosition(value, this._my_y);
    }
    set my_y(value) {
        this._my_y = value;
        this.setPosition(this._my_x, value);
    }
}

class Cursor extends Text {
    public _position: number;
    public parent: Text;
    public current: MySprite;
    constructor(text: string, parent: Text, position: number) { // Создаем новый текст
        super(text, parent.array[position].my_x, parent.array[position].my_y);
        this._position = position;
        this.parent = parent;
        this._my_x = parent.array[position].my_x;
        this._my_y = parent.array[position].my_y;
        this.current = parent.array[position];
        
    }
    get position() {
        return this._position;
    }
    set position(value) {
        if (!(value < 0 || value > (this.parent.length - 1))) {
            this._position = value;
            this._my_x = this.parent.array[value].my_x;
            this.setPosition(
                this.parent.array[value].my_x,
                this.parent.array[value].my_y
            )
        }
        
    }
}


controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
    cursor.position--
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    cursor.position++
})


// feature: нужно где-то хранить координаты занятых и не занятых ячеек, чтобы по умолчанию текст печатать ниже предыдущего
// feature: нужно организовать перенос строки, если не помещается на экране Текст

const array = [];
for (let i = 0; i < 14; i++) {
    array.push(new Text(`${i}: 1234567890/*-+`, 0, i));
}
const cursor = new Cursor("|", array[1], 3)