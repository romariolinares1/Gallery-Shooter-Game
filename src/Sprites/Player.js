class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, playerSpeed, leftKey, rightKey, startingLives=5, scale=0.5) {
        super(scene, x, y, texture, frame);
        this.setScale(scale);
        this.left = leftKey;
        this.right = rightKey;
        this.playerSpeed = playerSpeed;
        this.health = startingLives;
        this.alive = true;
        scene.add.existing(this);
        return this;
    }

    takeDamage() {
        this.health--;
        if (this.health <= 0) {
            this.death();
        }
    }

    death() {
        this.alive = false;
    }

    update() {
        // left
        if (this.left.isDown) {
            if (this.x > (this.displayWidth/2)) {
                this.x -= this.playerSpeed;
            }
        }
        // right
        if (this.right.isDown) {
            if (this.x < (game.config.width - (this.displayWidth/2))) {
                this.x += this.playerSpeed;
            }
        }
    }
}
