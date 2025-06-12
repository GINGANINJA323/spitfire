import { Application, Sprite } from "pixi.js";

let explosion: Sprite;

export const addExplosion = (app: Application, x: number, y: number) => {
    explosion = Sprite.from('explosion');

    explosion.x = x;
    explosion.y = y;

    app.stage.addChild(explosion);
    setTimeout(() => app.stage.removeChild(explosion), 200);
}