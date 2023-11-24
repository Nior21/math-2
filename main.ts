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

class mySprite extends Sprite {
    private my_x: number;
    private my_y: number;
    private deltaWidth: number;
    private deltaHeight: number;
    private symbolWidth: number;
    private symbolHeight: number;

    constructor(image: Image, myx = 0, myy = 0) {
        super(image);
        // Эти параметры будут вычисляться каждый раз, каждый символ, желательно вывести в более базовый объект
        this.deltaWidth = this._div(5, 2) + 1;
        this.deltaHeight = this._div(7, 2) + 2;
        this.symbolWidth = 5 + 1;
        this.symbolHeight = 7 + 1;
        this.mySetPosition(myx, myy);
    }

    // Целочисленное деление без остатка
    private _div(val: number, by: number) {
        return (val - val % by) / by
    }

    public mySetPosition(x: number, y: number) {
        this.setPosition(x * this.symbolWidth + this.deltaWidth, y * this.symbolWidth + this.deltaWidth);
    }

    public get getX(): number {
        return this.my_x;
    }
    public get getY(): number {
        return this.my_y;
    }

    public set setX(x: number) {
        this.my_x = x; // Сохраняем на случай крайней нужды
        this.x = x * this.symbolWidth + this.deltaWidth;
    }

    public set setY(y: number) {
        this.my_y = y;
        this.y = y * this.symbolWidth + this.deltaWidth;
    }
}

class Text {
    text: string;
    x: number;
    y: number;
    lastX: number = 0;
    lastY: number = 0;
    length: number = undefined;
    array: Array<mySprite> = [];

    constructor(text: string, x: number = 0, y: number = 0) { // Создаем новый текст
        this.text = text;
        this.x = x;
        this.y = y;
        this.length = text.length;
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
            this.array.push(new mySprite(this._findChar(this.text[i]), this.x + i, this.y)) // Находим нужную картинку и генерируем в один присест
        }
    }

    
}


const spr = new Text('123kjhjklh4', 0, 0);
