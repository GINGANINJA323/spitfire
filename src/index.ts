import { Application, Assets, Sprite } from "pixi.js";
import { InputController } from "./utils/InputController";
import { addEnemies, animateEnemies } from "./enemy";
import { addBullet, animateBullets } from "./bullet";
import { addPlayer, animatePlayer } from "./player";

const app = new Application();
const inputController = new InputController();
const bullets: Sprite[] = []; // Var to store the bullets in the field
const enemies: Sprite[] = []; // Store the enemies in the field

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

// Game's main loop, where everything comes together
(async() => {
    await setup();
    await preload();
    app.ticker.maxFPS = 60;

    addPlayer(app);
    addEnemies(app, enemies);

    app.ticker.add((time) => {
        animatePlayer(app, inputController, bullets, enemies);
        animateBullets(app, bullets, enemies);
        animateEnemies(app, enemies);
    })
})();