import { Application, Assets, Sprite } from "pixi.js";
import { InputController } from "./Controller";

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

const addBullet = (x: number, y: number, rot: number) => {
    const bullet = Sprite.from('bullet');

    bullet.anchor.set(0.5);
    bullet.scale = 0.1;

    bullet.x = x;
    bullet.y = y;
    bullet.rotation = rot;

    bullets.push(bullet);
    app.stage.addChild(bullet);
}

const animateBullets = () => {

    bullets.forEach((bullet) => {
        bullet.x += Math.sin(bullet.rotation) * 4
        bullet.y -= Math.cos(bullet.rotation) * 4

        if (bullet.x < app.screen.width || bullet.y < app.screen.height) {
            enemies.forEach((enemy) => {
                if (testForCollision(bullet, enemy)) console.log('Shot down!');
            });
        }
    });
}

const animateEnemies = () => {
    const stageBoundary = 100;
    const boundWidth = app.screen.width + stageBoundary * 2;
    const boundHeight = app.screen.height + stageBoundary * 2;

    enemies.forEach((enemy) => {
        enemy.x += Math.sin(enemy.rotation) * 2
        enemy.y -= Math.cos(enemy.rotation) * 2

        // Enemies wrap around if they go out of bounds, keeps them in the field until shot
        if (enemy.x < -stageBoundary) {
            enemy.x += boundWidth;
        } if (enemy.x > app.screen.width + stageBoundary) {
            enemy.x -= boundWidth;
        } if (enemy.y < -stageBoundary) {
            enemy.y += boundHeight;
        } if (enemy.y > app.screen.height + stageBoundary) {
            enemy.y -= boundHeight;
        }
    });
}

// AABB collision detection
const testForCollision = (obj1: Sprite, obj2: Sprite) => {
    const bounds1 = obj1.getBounds();
    const bounds2 = obj2.getBounds();

    return (
        bounds1.x < bounds2.x + bounds2.width &&
        bounds1.x + bounds1.width > bounds2.x &&
        bounds1.y > bounds2.y + bounds2.height &&
        bounds1.y + bounds1.height > bounds2.y
    )
}

const addEnemies = (playerX: number, playerY: number) => {
    const enemyCount = 5;

    for (let i = 0; i < enemyCount; i++) {
        const enemy = Sprite.from('bf109');

        enemy.anchor.set(0.5);
        enemy.x = Math.random() * app.screen.width;
        enemy.y = Math.random() * app.screen.height;
        enemy.rotation = Math.random();
        enemy.scale = 1.5;

        setInterval(() => enemy.rotation = Math.random(), Math.random() * 1000);

        enemies.push(enemy);
        app.stage.addChild(enemy);
    }
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
    player.scale = 1.5;

    const playerSpeed = 2;
    const playerTurnSpeed = 0.05;

    app.stage.addChild(player);

    app.ticker.maxFPS = 60;


    addEnemies(player.x, player.y);

    app.ticker.add((time) => {
        // Move the player constantly in the direction they're facing
        player.x += Math.sin(player.rotation) * playerSpeed;
        player.y -= Math.cos(player.rotation) * playerSpeed;

        
        // Rotate when the player presses A/D or < >
        if (inputController.keys['left'].pressed) {
            player.rotation -= playerTurnSpeed;
        } if (inputController.keys['right'].pressed) {
            player.rotation += playerTurnSpeed;
        } if (inputController.keys['space'].pressed) {
            addBullet(player.x, player.y, player.rotation);
        }

        enemies.forEach((enemy) => {
            if (testForCollision(player, enemy)) {
                console.log('Player down!');
            }
        })

        animateBullets();
        animateEnemies();
    })
})();