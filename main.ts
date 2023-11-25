/**
export function create(img: Image, kind?: number): Sprite {
    const scene = game.currentScene();
    const sprite = new Sprite(img)
    sprite.setKind(kind);
    scene.physicsEngine.addSprite(sprite);

    // run on created handlers
    scene.createdHandlers
        .filter(h => h.kind == kind)
        .forEach(h => h.handler(sprite));

    return sprite
}


/**
 * 
 * Возможно стоит просто к станадртному классу добавить возможность перемещать его не по абсолютному x/y, а по знакоместам.
 * 
 * Тогда символы создаются с дополнительным параметром координат и методом перемещения по этим координатам
 */

class MySprite extends Sprite {
    private my_x: number;
    private my_y: number;
    private fontWidth: number;
    private fontHeight: number;
    private deltaWidth: number;
    private deltaHeight: number;

    constructor(image: Image, my_x = 0, my_y = 0, fontWidth = 5, fontHeight = 7) {
        super(image);
        // Эти параметры будут вычисляться каждый раз, каждый символ, желательно вывести в более базовый объект
        this.my_x = my_x;
        this.my_y = my_y;
        this.fontWidth = fontWidth;
        this.fontHeight = fontHeight;
        this.mySetPosition(
            this.my_x * (this.fontWidth + 1) + (this._div(this.fontWidth, 2) + 1),
            this.my_y * (this.fontHeight + 1) + (this._div(this.fontHeight, 2) + 2)
        );
    }

    // Целочисленное деление без остатка
    private _div(val: number, by: number) {
        return (val - val % by) / by;
    }

    public mySetPosition(x: number, y: number) {
        this.setPosition(x, y);
    }
    
    public get getMyX(): number {
        return this.my_x;
    }
    public get getMyY(): number {
        return this.my_y;
    }

    public set setMyX(my_x: number) {
        this.my_x = my_x;
        this.x = this.my_x * (this.fontWidth + 1) + (this._div(this.fontWidth, 2) + 1);
    }

    public set setMyY(my_y: number) {
        this.my_y = my_y;
        this.y = this.my_y * (this.fontHeight + 1) + (this._div(this.fontHeight, 2) + 2);
    }
}

class Text {
    text: string;
    x: number;
    y: number;
    //lastX: number = 0;
    //lastY: number = 0;
    length: number = undefined;
    array: Array<MySprite> = [];

    constructor(text: string, x: number = 0, y: number = 0) { // Создаем новый текст
        this.text = text;
        this.x = x;
        this.y = y;
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
            this.array.push(new MySprite(this._findChar(this.text[i]), this.x + i, this.y)) // Находим нужную картинку и генерируем в один присест
        }
    }

    
}

// todo: нужно где-то хранить координаты занятых и не занятых ячеек
// todo: нужно организовать перенос строки, если не помещается на экране текст

new Text('342342*323325=32532532')

for (let i = 0; i < 14; i++) {
    new Text('1234567890+-*/=1234567890', 0, i+1);
}



