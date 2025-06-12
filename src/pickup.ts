import { Application, Sprite } from "pixi.js";
import { getBoundedRandomValue, testForCollision } from "./utils/utils";
import { player } from "./player";

let pickup: Sprite;

export const addPickup = (app: Application) => {
    pickup = Sprite.from('pickup');
    const timeout = 5000;

    pickup.x = getBoundedRandomValue(0, app.screen.width);
    pickup.y = getBoundedRandomValue(0, app.screen.height);

    app.stage.addChild(pickup);
    setTimeout(() => app.stage.removeChild(pickup), timeout);
}

export const animatePickup = (app: Application) => {
    if (pickup && testForCollision(pickup, player)) {
        console.log('Got pickup!');
        app.stage.removeChild(pickup);
    }
}