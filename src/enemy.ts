import { Application, Sprite } from "pixi.js";

export const animateEnemies = (app: Application, enemies: Sprite[]) => {
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

export const addEnemies = (app: Application, enemies: Sprite[]) => {
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