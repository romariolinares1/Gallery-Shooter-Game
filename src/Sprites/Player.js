class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, playerSpeed, leftKey, rightKey) {
        super(scene, x, y, texture, frame);
        this.left = leftKey;
        this.right = rightKey;
        this.playerSpeed = playerSpeed;
        scene.add.existing(this);
        return this;
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
