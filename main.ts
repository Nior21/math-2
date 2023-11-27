function toUpperCaseCyrillic(str: string) {
    return str.replace('а', 'А')
        .replace('б', 'Б')
        .replace('в', 'В')
        .replace('г', 'Г')
        .replace('д', 'Д')
        .replace('е', 'Е')
        .replace('ё', 'Ё')
        .replace('ж', 'Ж')
        .replace('з', 'З')
        .replace('и', 'И')
        .replace('й', 'Й')
        .replace('к', 'К')
        .replace('л', 'Л')
        .replace('м', 'М')
        .replace('н', 'Н')
        .replace('о', 'О')
        .replace('п', 'П')
        .replace('р', 'Р')
        .replace('с', 'С')
        .replace('т', 'Т')
        .replace('у', 'У')
        .replace('ф', 'Ф')
        .replace('х', 'Х')
        .replace('ц', 'Ц')
        .replace('ч', 'Ч')
        .replace('ш', 'Ш')
        .replace('щ', 'Щ')
        .replace('ъ', 'Ъ')
        .replace('ы', 'Ы')
        .replace('ь', 'Ь')
        .replace('э', 'Э')
        .replace('ю', 'Ю')
        .replace('я', 'Я');
}

/** Пользовательский класс MySprite
 * К стандартному классу Sprite добавляем пользовательские my_x/my_y координаты в системе координат,
 * основанной на знакоместах, вместо абсолютных координат x/y
 */
class MySprite extends Sprite {
    private _my_x: number;
    private _my_y: number;
    private fontWidth: number;
    private fontHeight: number;
    private _value: number;

    constructor(image: Image, value: string | number, my_x = 0, my_y = 0, fontWidth = 5, fontHeight = 7) {
        super(image);
        if (typeof value == "string") {
            this._value = toUpperCaseCyrillic(value).charCodeAt(0);
        } else if (typeof value == "number") {;
            this._value = convertToText(value).charCodeAt(0);
        }
        
        this._init();

        this._my_x = my_x;
        this._my_y = my_y;
        
        this.fontWidth = fontWidth;
        this.fontHeight = fontHeight;
        this.setMyPosition(this._my_x, this._my_y);
        
    }

    private _init() {
        this.setImage(this._findChar(this._value));
    }

    // Поиск картинок в Assets
    private _findChar(char: number) {
        switch (char) {
            // Базовые
            case 0: return assets.image`0`;
            case 1: return assets.image`1`;
            case 2: return assets.image`2`;
            case 3: return assets.image`3`;
            case 4: return assets.image`4`;
            case 5: return assets.image`5`;
            case 6: return assets.image`6`;
            case 7: return assets.image`7`;
            case 8: return assets.image`8`;
            case 9: return assets.image`9`;
            /** "0" */ case 48: return assets.image`48`;
            /** "1" */ case 49: return assets.image`49`;
            /** "2" */ case 50: return assets.image`50`;
            /** "3" */ case 51: return assets.image`51`;
            /** "4" */ case 52: return assets.image`52`;
            /** "5" */ case 53: return assets.image`53`;
            /** "6" */ case 54: return assets.image`54`;
            /** "7" */ case 55: return assets.image`55`;
            /** "8" */ case 56: return assets.image`56`;
            /** "9" */ case 57: return assets.image`57`;
            /** "+" */ case 43: return assets.image`Sign0`;
            /** "-" */ case 45: return assets.image`Sign1`;
            /** "*" */ case 42: return assets.image`Sign2`;
            /** "/" */ case 47: return assets.image`Sign3`;
            /** "=" */ case 61: return assets.image`Sign4`;
            /** ":" */ case 58: return assets.image`58`;
            /** " " */ case 32: return assets.image`32`;
            /** "A" */ case 65: return assets.image`65`;
            /** "B" */ case 66: return assets.image`66`;
            /** "C" */ case 67: return assets.image`67`;
            /** "D" */ case 68: return assets.image`68`;
            /** "E" */ case 69: return assets.image`69`;
            /** "F" */ case 70: return assets.image`70`;
            // Кириллица Unicode 
            // источник: http://blog.kislenko.net/show.php?id=2045
            /** А */ case 1040: return assets.image`1040`
            /** Б */ case 1041: return assets.image`1041`
            /** В */ case 1042: return assets.image`1042`
            /** Г */ case 1043: return assets.image`1043`
            /** Д */ case 1044: return assets.image`1044`
            /** Е */ case 1045: return assets.image`1045`
            /** Ж */ case 1046: return assets.image`1046`
            /** З */ case 1047: return assets.image`1047`
            /** И */ case 1048: return assets.image`1048`
            /** Й */ case 1049: return assets.image`1049`
            /** К */ case 1050: return assets.image`1050`
            /** Л */ case 1051: return assets.image`1051`
            /** М */ case 1052: return assets.image`1052`
            /** Н */ case 1053: return assets.image`1053`
            /** О */ case 1054: return assets.image`1054`
            /** П */ case 1055: return assets.image`1055`
            /** Р */ case 1056: return assets.image`1056`
            /** С */ case 1057: return assets.image`1057`
            /** Т */ case 1058: return assets.image`1058`
            /** У */ case 1059: return assets.image`1059`
            /** Ф */ case 1060: return assets.image`1060`
            /** Х */ case 1061: return assets.image`1061`
            /** Ц */ case 1062: return assets.image`1062`
            /** Ч */ case 1063: return assets.image`1063`
            /** Ш */ case 1064: return assets.image`1064`
            /** Щ */ case 1065: return assets.image`1065`
            /** Ъ */ case 1066: return assets.image`1066`
            /** Ы */ case 1067: return assets.image`1067`
            /** Ь */ case 1068: return assets.image`1068`
            /** Э */ case 1069: return assets.image`1069`
            /** Ю */ case 1070: return assets.image`1070`
            /** Я */ case 1071: return assets.image`1071`
            /** "|" */ case 124: return assets.image`Arrow`; Cursor
            default: return assets.image`error`;
        }
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

    public get value() {
        return this._value;
    }
    public set value(newValue: number) {
        this._value = newValue;
        this._init();
    }
    public setTextValue(newValue: string) {
        this._value = newValue.charCodeAt(0);
        this._init();
    }

    // Пользовательский метод аналог setPosition, но для перемещения по знакоместам, а не абсолютным координатам
    public setMyPosition(my_x: number, my_y: number) {
        this.my_x = my_x;
        this.my_y = my_y;
    }    
}

/** Класс Текст */
class Text {
    text: string;
    _my_x: number;
    _my_y: number;
    _my_last_x: number = 0;
    length: number = undefined;
    array: Array<MySprite> = [];

    constructor(text: string, x: number = 0, y: number = 0) { // Создаем новый текст
        this.text = text;
        this._my_x = x;
        this._my_y = y;
        this.length = text.length;
        this._my_last_x = this._my_x + this.length;
        this.array = [];
        this._init(); // заполняем значениями с помощью метода
    }

    private _init() {
        for (let i: number = 0; i < this.length; i++) {
            //this.array.push(new MySprite(this._findChar(this.text[i]), this._my_x + i, this._my_y, this.text[i])) // Находим нужную картинку и генерируем в один присест
            this.array.push(new MySprite(assets.image`error`, this.text[i], this._my_x + i, this._my_y)) // Находим нужную картинку и генерируем в один присест
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

        this._my_last_x = this._my_x + this.length;
    }

    get my_x() { return this._my_x }
    get my_y() { return this._my_y }

    set my_x(value) {
        this._my_x = value;
        this._my_last_x = this.my_x + this.length;
        this.setPosition(value, this._my_y);
    }
    set my_y(value) {
        this._my_y = value;
        this.setPosition(this._my_x, value);
    }

    get my_last_x() {
        return this._my_last_x;
    }
    set my_last_x(value) {
        this._my_last_x = value;
    }
}

let cursor: Cursor;
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
            this.current = this.parent.array[value];
        }
        
    }
}

function div(val: number, by: number) {
    return (val - val % by) / by
}
function convertSignToText(sign: number) {
    switch (sign) {
        case 0: return "+";
        case 1: return "-";
        case 2: return "*";
        case 3: return "/";
        default: return "_";
    }
}

// Класс текста, но с цифрой в памяти
class NumberView extends Text {
    public _value: number;
    constructor(value: number | string, x?: number, y?: number) {
        const text = convertToText(value);
        x = x ? x : 0;
        y = y ? y : 0; 
        super(text, x, y);
        (typeof value == "string") ?
            this._value = parseInt(value) :
            this._value = value;
    }

    get value() {
        return this._value;
    }
    set value(newValue) {
        if (typeof newValue == "string") {
            this._value = parseInt(newValue);
        } else {
            this._value = newValue;
        }
    }
}


let equation: any;

class Equation {
    // Нужен тип позволящий сразу указывать значения в конечный объект
    // Тогда получится красивый перебор значений
    var1: number;
    sign: number;
    var2: number;
    answer: number;
    cursor: Cursor;
    eq_view: Array<NumberView>;
    constructor() {
        this.init();
    }

    public init() {
        this.var1 = 0;
        this.var2 = 0;
        this.sign = randint(0, 3);
        // Создаем новый рандомный пример
        switch (this.sign) { // Случайное число от 0 до 3 означает используемый знак
            case 0: // "+", оба числа до 99
                this.var1 = randint(1, 99); this.var2 = randint(1, 99);
                this.answer = this.var1 + this.var2;
                break
            case 1: // "-", второе число меньше первого
                do {
                    this.var1 = randint(1, 99); this.var2 = randint(1, 99);
                } while (!(this.var1 > this.var2));
                this.answer = this.var1 - this.var2;
                break
            case 2: // "*", оба числа до 5 (указывать руками)
                this.var1 = randint(1, 5); this.var2 = randint(1, 5);
                this.answer = this.var1 * this.var2;
                break
            case 3: // "/", первое число больше второго и делится целочисленно
                do {
                    this.var1 = randint(1, 25); this.var2 = randint(1, 5);
                } while (!(this.var1 >= this.var2 && this.var1 % this.var2 == 0));
                this.answer = this.var1 / this.var2;
                break
        };
        if (this.eq_view) {
            for (let i of this.eq_view) {
                for (let j of i.array) {
                    j.destroy();
                }   
            }
        } else {
            this.eq_view = [];
        }
        this.eq_view.push(new NumberView(
            this.var1, 
            8, 
            8)
        );
        this.eq_view.push(new NumberView(
            convertSignToText(this.sign), // Преобразовываем в арифметический символ
            this.eq_view[this.eq_view.length - 1].my_last_x + 1,
            8
        ));
        this.eq_view.push(new NumberView(
            this.var2,
            this.eq_view[this.eq_view.length - 1].my_last_x + 1,
            8
        ));
        this.eq_view.push(new NumberView(
            "=", 
            this.eq_view[this.eq_view.length - 1].my_last_x + 1, 
           8
        ));
        let ans_field: string = '';
        for (let i = 0; i < this.answer.toString().length; i++) { ans_field += '0' }
        this.eq_view.push(new NumberView(
            ans_field,
            this.eq_view[this.eq_view.length - 1].my_last_x + 1,
            8
        ));
        if (cursor) {
            cursor.array[0].destroy();
        }
        cursor = new Cursor("|", this.eq_view[this.eq_view.length - 1], 0);
        
    }

    public customDelete() {
        if (this.eq_view) {
            for (let i of this.eq_view) {
                for (let j of i.array) {
                    j.destroy();
                }
            }
        }
        if (cursor) {
            cursor.array[0].destroy();
        }
    }

    public checkSolution() {
        const solution_view = this.eq_view[4].array;
        let input_solution = 0;
        let i = 0;
        for (let char_obj of solution_view) {
            const charToText = String.fromCharCode(char_obj.value);
            const textToInt = parseInt(charToText);
            const order = 10 ** (solution_view.length - 1 - i);
            input_solution += textToInt * order;
            i++;
        }
        // todo: Проверка на успех. Нужен доп.звук и цвет
        if (input_solution == this.answer) {
            console.log(`${ input_solution } == ${this.answer} => true`)
            info.changeScoreBy(1);
            this.customDelete();
            equation = new Equation;
        } else {
            console.log(`${input_solution} == ${this.answer} => false`)
            

        }
    }
};

/** 
 * КОНТРОЛЛЕР 
 */
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    equation ? --equation.cursor.position : null;
    cursor ? --cursor.position : null;

})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    equation ? ++equation.cursor.position : null;
    cursor ? ++cursor.position : null;
})

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (equation) {
        if (equation.cursor.current.value < 57) {
            ++equation.cursor.current.value;
        } else if (equation.cursor.current.value == 57) {
            equation.cursor.current.value = 48;
        }
    }
    if (cursor) {
        // Схема для числовых значений
        if (cursor.current.value < 57) {
            ++cursor.current.value;
        } else if (cursor.current.value == 57) {
            cursor.current.value = 48;
        }
        // Схема для текстовых значений (без ограничений)
        if (cursor.current.value > 57) {
            ++cursor.current.value;
        }
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (equation) {
        if (equation.cursor.current.value > 48) {
            --equation.cursor.current.value;
        } else if (equation.cursor.current.value == 48) {
            equation.cursor.current.value = 57;
        }
    }
    if (cursor) {
        // Схема для числовых значений
        if (cursor.current.value > 48) {
            --cursor.current.value;
        } else if (cursor.current.value == 48) {
            cursor.current.value = 57;
        }
        // Схема для текстовых значений (без ограничений)
        if (cursor.current.value > 57) {
            --cursor.current.value;
        }
    }
})

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    equation ? equation.checkSolution() : null;
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    equation ? equation.customDelete() : null;
    equation ? equation = new Equation : null;
})


// feature: нужно где-то хранить координаты занятых и не занятых ячеек, чтобы по умолчанию текст печатать ниже предыдущего
// feature: нужно организовать перенос строки, если не помещается на экране Текст
// todo: Найти способ менять цвет текста





let computer = sprites.create(assets.image`computer`, SpriteKind.Player)
computer.setPosition(screen.width / 2, screen.height / 3.5);

new Text('Для получения доступа', 3, 1);
new Text('введите пароль:', 6, 6);
equation = new Equation;
//const input_field = new Text('000', 11, 8);

//cursor = new Cursor('|', input_field, 0);