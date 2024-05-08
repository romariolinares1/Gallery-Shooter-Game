class Enemy extends Phaser.GameObjects.PathFollower {
    constructor(scene, x, y, texture, frame, enemySpeed, path, scale, shooter=false, minTimeShoot=30, maxTimeShoot=60) {
        super(scene, path, x, y, texture, frame);
        //this.setSpeed(enemySpeed);
        this.setScale(scale);
        this.visible = true;
        this.path = path;
        this.alive = true;
        this.minTimeShoot = minTimeShoot;
        this.maxTimeShoot = maxTimeShoot;
        this.shouldShoot = false;
        this.currentCooldown = 0;
        this.shooter = shooter;
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

    shoot() {
        this.currentCooldown--;
        if (this.currentCooldown <= 0) {
            console.log("shot bullet");
            this.shouldShoot = true;
            // this.bulletGroup.push(this.x, this.y-(this.displayHeight/2), "gameParts1", "laserRed02.png"); 
            this.resetCooldown();
        }
    }

    resetCooldown() {
        this.currentCooldown = Math.random() * (this.maxTimeShoot - this.minTimeShoot) + this.minTimeShoot;
        console.log("current cooldown is " + this.currentCooldown);
    }

    update() {
        if (this.shooter == true) {
            console.log("is a shooter");
            this.shoot();
        }
    }
}
