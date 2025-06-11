import { Application, Assets, Sprite } from "pixi.js";
import { InputController } from "./Controller";

const app = new Application();
const inputController = new InputController();
 // @ts-ignore
const bullets = []; // Var to store the bullets in the field

// Setup - init the app and attach to the body
const setup = async() => {
    await app.init({ background: '#1099bb', resizeTo: window });
    document.body.appendChild(app.canvas);
}

// Load in the required assets for the game
const preload = async() => {
    const assets = [
        {
            alias: 'spitfire',
            src: 'assets/spitfire.png'
        },
                {
            alias: 'bf109',
            src: 'assets/bf109.png'
        },
        {
            alias: 'bullet',
            src: 'assets/bullet.png'
        }
    ];

    await Assets.load(assets);
}

const addBullet = (x: number, y: number, rot: number) => {
    const bullet = Sprite.from('bullet');

    bullet.anchor.set(0.5);
    bullet.scale = 0.2;

    bullet.x = x;
    bullet.y = y;
    bullet.rotation = rot;

    bullets.push(bullet);
    app.stage.addChild(bullet);
}

const animateBullets = () => {
    // @ts-ignore
    bullets.forEach((bullet) => {
        bullet.x += Math.sin(bullet.rotation) * 4
        bullet.y -= Math.cos(bullet.rotation) * 4
    });
}

// Game's main loop, where everything comes together
(async() => {
    await setup();
    await preload();

    const player = Sprite.from('spitfire');

    player.anchor.set(0.5);
    player.x = app.screen.width / 2;
    player.y = app.screen.height / 2;
    player.rotation = 0;

    const playerSpeed = 2;
    const playerTurnSpeed = 0.05;

    app.stage.addChild(player);

    app.ticker.maxFPS = 60;

    app.ticker.add((time) => {
        // Move the player constantly in the direction they're facing
        player.x += Math.sin(player.rotation) * playerSpeed;
        player.y -= Math.cos(player.rotation) * playerSpeed;

        animateBullets();

        // Rotate when the player presses A/D or < >
        if (inputController.keys['left'].pressed) {
            player.rotation -= playerTurnSpeed;
        } if (inputController.keys['right'].pressed) {
            player.rotation += playerTurnSpeed;
        } if (inputController.keys['space'].pressed) {
            addBullet(player.x, player.y, player.rotation);
        }
    })
})();