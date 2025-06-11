import { Sprite } from "pixi.js";

export const testForCollision = (obj1: Sprite, obj2: Sprite) => {
    const bounds1 = obj1.getBounds();
    const bounds2 = obj2.getBounds();

    return (
        bounds1.x < bounds2.x + bounds2.width &&
        bounds1.x + bounds1.width > bounds2.x &&
        bounds1.y > bounds2.y + bounds2.height &&
        bounds1.y + bounds1.height > bounds2.y
    )
}