class Enemy extends Phaser.GameObjects.PathFollower {
    constructor(scene, x, y, texture, frame, enemySpeed, path, scale) {
        super(scene, path, x, y, texture, frame);
        //this.setSpeed(enemySpeed);
        this.setScale(scale);
        this.visible = true;
        this.path = path;
        this.alive = true;
        scene.add.existing(this);

        if (this.visible == true) {
             let followConfig = {
                 from: 0,
                 to: 1,
                 delay: 0,
                 duration: 7000,
                 ease: 'Sine.easeInOut',
                 repeat: -1,
                 yoyo: true,
                 rotateToPath: true,
                 rotationOffset: -90
             }
             this.startFollow(followConfig);
        }

        return this;
    }

    update() {
        
    }
}
