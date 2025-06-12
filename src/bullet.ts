import { Application, Sprite } from "pixi.js";
import { testForCollision } from "./utils/utils";
import { addExplosion } from "./explosion";

export const addBullet = (app: Application, bullets: Sprite[], x: number, y: number, rot: number) => {
    const bullet = Sprite.from('bullet');

    bullet.anchor.set(0.5);
    bullet.scale = 0.1;

    bullet.x = x;
    bullet.y = y;
    bullet.rotation = rot;

    bullets.push(bullet);
    app.stage.addChild(bullet);
}

export const animateBullets = (app: Application, bullets: Sprite[], enemies: Sprite[]) => {
    bullets.forEach((bullet) => {
        bullet.x += Math.sin(bullet.rotation) * 4;
        bullet.y -= Math.cos(bullet.rotation) * 4;

        if (bullet.x < app.screen.width || bullet.y < app.screen.height) {
            enemies.forEach((enemy) => {
                if (testForCollision(bullet, enemy)) {
                    addExplosion(app, enemy.x, enemy.y);
                    app.stage.removeChild(enemy);
                    app.stage.removeChild(bullet);
                }
            });
        }
    });
}