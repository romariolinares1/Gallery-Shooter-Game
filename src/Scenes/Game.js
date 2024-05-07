var enemyDead = false;

class Game extends Phaser.Scene {
    graphics;
    curve;
    path;

    constructor() {
        super("game");
        this.my = {sprite: {}, text: {}};

        this.my.sprite.bullet = [];
        this.my.sprite.enemies = [];   
        this.maxBullets = 10;
        
        this.myScore = 0;
    }

    preload() {
        this.load.setPath("./assets/");
        
        this.load.atlasXML("gameParts1", "sheet.png", "sheet.xml");
        this.load.atlasXML("gameParts2", "spaceShooter2_spritesheet.png", "spaceShooter2_spritesheet.xml");
    }

    create() {
        let my = this.my;

        this.points = [
            400, 20,
            670, 20,
            400, 200,
            240, 340,
            240, 400,
            500, 400
        ];

        this.curve = new Phaser.Curves.Spline(this.points);

        let zigzag = new Phaser.Curves.Path(600, 20);
        zigzag.lineTo(240, 340);
        zigzag.lineTo(640, 640);
         
        this.graphics = this.add.graphics();

        my.sprite.player = this.add.sprite(game.config.width/2, game.config.height - 40, "gameParts1", "playerShip1_green.png");
        my.sprite.player.setScale(0.5);

        // my.sprite.enemy = this.add.follower(this.curve, 10, 10, "gameParts2", "spaceShips_001.png");
        // my.sprite.enemy.setScale(0.5);
        // my.sprite.enemy.visible = true;

        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.playerSpeed = 8;
        this.bulletSpeed = 15;

        // if (my.sprite.enemy.visible == true) {
        //     let followConfig = {
        //         from: 0,
        //         to: 1,
        //         delay: 0,
        //         duration: 5000,
        //         ease: 'Sine.easeInOut',
        //         repeat: -1,
        //         yoyo: true,
        //         rotateToPath: true,
        //         rotationOffset: -90
        //     }
        //     my.sprite.enemy.x = this.curve.points[0].x;
        //     my.sprite.enemy.y = this.curve.points[0].y;
        //     my.sprite.enemy.startFollow(followConfig);
        // }

        let enemy = new Enemy(Game, 10, 10, "gameParts2", "spaceShips_001.png", 10, this.curve, 0.5);
        let enemy2 = new Enemy(Game, 10, 10, "gameParts2", "spaceShips_001.png", 10, zigzag, 0.5);
    }

    update() {
        let my = this.my;
        
        if (enemyDead == true) {
            console.log("enemydead");
            enemyDead = false;
            my.sprite.enemy = this.add.follower(this.curve, 10, 10, "gameParts2", "spaceShips_001.png");
            
        }

        if (this.left.isDown) {
            if (my.sprite.player.x > (my.sprite.player.displayWidth/2)) {
                my.sprite.player.x -= this.playerSpeed;
            }
        }

        if (this.right.isDown) {
            if (my.sprite.player.x < (game.config.width - (my.sprite.player.displayWidth/2))) {
                my.sprite.player.x += this.playerSpeed;
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            if (my.sprite.bullet.length < this.maxBullets) {
                my.sprite.bullet.push(this.add.sprite(my.sprite.player.x, my.sprite.player.y-(my.sprite.player.displayHeight/2), "gameParts1", "laserGreen05.png"));
            }
        }

        my.sprite.bullet = my.sprite.bullet.filter((bullet) => bullet.y > -(bullet.displayHeight/2));

        for (let bullet of my.sprite.bullet) {
             if (this.collides(my.sprite.enemy, bullet)) {
                //this.puff = this.add.sprite(my.sprite.hippo.x, my.sprite.hippo.y, "whitePuff03").setScale(0.25).play("puff");
                bullet.y = -100;
                my.sprite.enemy.visible = false;
                my.sprite.enemy.x = -100;
                this.myScore += my.sprite.enemy.scorePoints;
                this.updateScore();
                enemyDead = true;
             }
         }

        for (let bullet of my.sprite.bullet) {
            bullet.y -= this.bulletSpeed;
        }
    }

    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

    die() {

    }
    
    updateScore() {
        let my = this.my;
        //ad my.text.score.setText("Score " + this.myScore);
    }

}