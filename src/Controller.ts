const keyMap: { [key: string]: string } = {
    Space: 'space',
    KeyA: 'left',
    ArrowLeft: 'left',
    KeyD: 'right',
    ArrowRight: 'right'
}

interface Keys {
    [key: string]: {
        pressed: boolean;
    }
}

export class InputController {
    keys: Keys;
    
    constructor() {
        this.keys = {
            left: {
                pressed: false
            },
            right: {
                pressed: false
            },
            space: {
                pressed: false
            }
        }

        window.addEventListener('keydown', (event) => this.keydownHandler(event));
        window.addEventListener('keyup',  (event) => this.keyupHandler(event));
    }

    keydownHandler(event: KeyboardEvent) {
        const key = keyMap[event.code];

        if (!key) return;

        this.keys[key].pressed = true;
    }

    keyupHandler(event: KeyboardEvent) {
        const key = keyMap[event.code];

        if (!key) return;

        this.keys[key].pressed = false;
    }
}