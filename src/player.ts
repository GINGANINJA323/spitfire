import { Application, Sprite } from "pixi.js";
import { InputController } from "./utils/InputController";
import { testForCollision } from "./utils/utils";
import { addBullet } from "./bullet";

let playerSpeed = 2;
const playerTurnSpeed = 0.05;
export let player: Sprite;

export const addPlayer = (app: Application) => {
    player = Sprite.from('spitfire');
    player.anchor.set(0.5);
    player.x = app.screen.width / 2;
    player.y = app.screen.height / 2;
    player.rotation = 0;
    player.scale = 1.5;

    app.stage.addChild(player);
}

export const animatePlayer = (app: Application, controller: InputController, bullets: Sprite[], enemies: Sprite[]) => {
    // Move the player constantly in the direction they're facing
    player.x += Math.sin(player.rotation) * playerSpeed;
    player.y -= Math.cos(player.rotation) * playerSpeed;

    
    // Rotate when the player presses A/D or < >
    if (controller.keys['left'].pressed) {
        player.rotation -= playerTurnSpeed;
    } if (controller.keys['right'].pressed) {
        player.rotation += playerTurnSpeed;
    } if (controller.keys['space'].pressed) {
        addBullet(app, bullets, player.x, player.y, player.rotation);
    } if (controller.keys['boost'].pressed) {
        playerSpeed = 3;
    } else {
        playerSpeed = 2;
    }

    enemies.forEach((enemy) => {
        if (testForCollision(player, enemy)) {
            console.log('Player down!');
        }
    })
}