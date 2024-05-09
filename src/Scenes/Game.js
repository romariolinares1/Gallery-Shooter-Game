class Game extends Phaser.Scene {
    graphics;
    curve;
    path;

    constructor() {
        super("game");
        this.my = {sprite: {}, text: {}};

        this.my.sprite.bullet = [];
        this.my.sprite.enemyBullet = [];
        this.my.enemyList = [];
        this.enemiesLeft = 0;
        this.wave = 0;  
        this.maxBullets = 10;
        
        this.myScore = 0;
        this.myLives = 5;

        this.gameFinish = false;
    }

    preload() {
        this.load.setPath("./assets/");

        this.load.image("background", "stars.jpg");
        this.load.image("explosion00", "explosion00.png");
        this.load.image("explosion01", "explosion01.png");
        this.load.image("explosion02", "explosion02.png");
        this.load.image("explosion03", "explosion03.png");
        
        this.load.atlasXML("gameParts1", "sheet.png", "sheet.xml");
        this.load.atlasXML("gameParts2", "spaceShooter2_spritesheet.png", "spaceShooter2_spritesheet.xml");
    
        this.load.audio("playerBullet", "laserRetro_000.ogg");
        this.load.audio("playerDeath", "explosionCrunch_003.ogg");
        this.load.audio("enemyDeath", "explosionCrunch_000.ogg");
        this.load.audio("enemyShoot", "laserRetro_002.ogg");
        this.load.audio("playerDamage", "impactMetal_003.ogg");
    }

    create() {
        let my = this.my;

        const {width, height} = this.scale;
        this.bg = this.add.tileSprite(0, 0, 600, 400, "background").setScale(3);
        
        //score text
        my.text.score = this.add.text(10, 5, "Score: " + this.myScore, {
            fontFamily: "Times, serif",
            fontSize: 50,
            wordWrap: {
                width: 60
            }
        });

        //lives text
        my.sprite.lives = this.add.sprite(650, 90, "gameParts1", "playerLife1_red.png");
        my.text.lives = this.add.text(600, 5, "Lives: " + this.myLives, {
            fontFamily: "Times, serif",
            fontSize: 50,
            wordWrap: {
                width: 60
            }
        });

        this.anims.create({
            key: "explosion",
            frames: [
                { key: "explosion00"},
                { key: "explosion01"},
                { key: "explosion02"},
                { key: "explosion03"},
            ],
            frameRate: 30,
            repeat: 5,
            hideOnComplete: true
        });
        
        //points for wave 1
        this.points = [
            400, 20,
            670, 20,
            400, 200,
            240, 340,
            240, 400,
            500, 400
        ];
        //creating curve for wave 1
        this.curve = new Phaser.Curves.Spline(this.points);

        //creating zig zag with points for wave 2
        this.zigzag = new Phaser.Curves.Path(0, 0);
        this.zigzag.lineTo(100, 50);
        this.zigzag.lineTo(-100, 100);
        this.zigzag.lineTo(100, 150);
        this.zigzag.lineTo(-100, 200);
        this.zigzag.lineTo(100, 250);
        this.zigzag.lineTo(-100, 300);
        this.zigzag.lineTo(100, 350);
        this.zigzag.lineTo(-100, 400);
        this.zigzag.lineTo(100, 450);
        this.zigzag.lineTo(-100, 500);
        

        //creating new zig zag path for wave 3
        this.zigzagFlip = new Phaser.Curves.Path(0, 0);
        this.zigzagFlip.lineTo(-100, 50);
        this.zigzagFlip.lineTo(100, 100);
        this.zigzagFlip.lineTo(-100, 150);
        this.zigzagFlip.lineTo(100, 200);
        this.zigzagFlip.lineTo(-100, 250);
        this.zigzagFlip.lineTo(100, 300);
        this.zigzagFlip.lineTo(-100, 350);
        this.zigzagFlip.lineTo(100, 400);
        this.zigzagFlip.lineTo(-100, 450);
        this.zigzagFlip.lineTo(100, 500);

        //new points for boss wave
        this.newPoints = [
            400, 0,
            600, 200,
            800, 0,
            600, 350,
            400, 0,
            200, 200,
            0, 0,
            200, 350,
            400, 0
        ]
        //creating spiral path for boss wave
        this.spiral = new Phaser.Curves.Spline(this.newPoints);  

        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");

        this.player = new Player(this, game.config.width/2, game.config.height - 40, "gameParts1", "playerShip1_green.png", 10, this.left, this.right);

        this.player.scorePoints = 25;
        
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.bulletSpeed = 20;
        this.enemyBulletSpeed = 25;
    }

    createWave() {
        switch(this.wave) {
            //wave 1
            case 1:
                //console.log("spawned case1");
                let zigzagger1 = new Enemy(this, 100, 20, "gameParts2", "spaceShips_003.png", 10, this.zigzag, 0.5, true);
                let zigzagger2 = new Enemy(this, 500, 20, "gameParts2", "spaceShips_003.png", 10, this.zigzagFlip, 0.5, true);
                let zigzagger3 = new Enemy(this, 300, 20, "gameParts2", "spaceShips_003.png", 10, this.zigzag, 0.5, true);
                let zigzagger4 = new Enemy(this, 700, 20, "gameParts2", "spaceShips_003.png", 10, this.zigzagFlip, 0.5, true);
                this.enemiesLeft = 4;
                this.my.enemyList.push(zigzagger1);
                this.my.enemyList.push(zigzagger2);
                this.my.enemyList.push(zigzagger3);
                this.my.enemyList.push(zigzagger4);
                break;
            //wave 2
            case 2:
                let curver1 = new Enemy(this, 100, 20, "gameParts1", "enemyRed2.png", 10, this.curve, 0.5, true);
                let curver2 = new Enemy(this, 500, 20, "gameParts1", "enemyRed2.png", 10, this.curve, 0.5, true);
                let curver3 = new Enemy(this, 300, 20, "gameParts1", "enemyRed2.png", 10, this.curve, 0.5, true);
                let curver4 = new Enemy(this, 700, 20, "gameParts1", "enemyRed2.png", 10, this.curve, 0.5, true);
                this.enemiesLeft = 4;
                this.my.enemyList.push(curver1);
                this.my.enemyList.push(curver2);
                this.my.enemyList.push(curver3);
                this.my.enemyList.push(curver4);
                break;
            //wave 3
            case 3:
                let zigzagger5 = new Enemy(this, 100, 20, "gameParts2", "spaceShips_003.png", 10, this.zigzag, 0.5, true);
                let zigzagger6 = new Enemy(this, 500, 20, "gameParts2", "spaceShips_003.png", 10, this.zigzagFlip, 0.5, true);
                let curver5 = new Enemy(this, 300, 20, "gameParts1", "enemyRed2.png", 10, this.curve, 0.5, true);
                let curver6 = new Enemy(this, 700, 20, "gameParts1", "enemyRed2.png", 10, this.curve, 0.5, true);
                this.enemiesLeft = 4;
                this.my.enemyList.push(zigzagger5);
                this.my.enemyList.push(zigzagger6);
                this.my.enemyList.push(curver5);
                this.my.enemyList.push(curver6);
                break;
            //wave 4
            case 4:
                let spiraler1 = new Enemy(this, 100, 20, "gameParts2", "spaceShips_004.png", 10, this.spiral, 0.5, true, 10, 20);
                let zigzagger7 = new Enemy(this, 300, 20, "gameParts2", "spaceShips_003.png", 10, this.zigzag, 0.5, true);
                let spiraler2 = new Enemy(this, 500, 20, "gameParts2", "spaceShips_004.png", 10, this.spiral, 0.5, true, 10, 20);
                let curver7 = new Enemy(this, 570, 20, "gameParts1", "enemyRed2.png", 10, this.curve, 0.5, true);
                let spiraler3 = new Enemy(this, 600, 20, "gameParts2", "spaceShips_004.png", 10, this.spiral, 0.5, true, 10, 20);
                let zigzagger8 = new Enemy(this, 700, 20, "gameParts2", "spaceShips_003.png", 10, this.zigzagFlip, 0.5, true); 
                this.enemiesLeft = 6;
                this.my.enemyList.push(spiraler1);
                this.my.enemyList.push(zigzagger7);
                this.my.enemyList.push(spiraler2);
                this.my.enemyList.push(curver7);
                this.my.enemyList.push(spiraler3);
                this.my.enemyList.push(zigzagger8);
                break;
            //ending
            case 5:
                this.gameFinish = true;
            default:
        }

        if (this.gameFinish == true) {
            this.my.enemyList = [];
            this.my.sprite.bullet = [];
            this.my.sprite.enemyBullet = [];
            this.enemiesLeft = 0;
            this.wave = 0;
            this.myScore = 0;
            this.myLives = 5;
            this.scene.restart();
            this.scene.start("end");
            this.gameFinish = false;
        }
    }

    waveCheck() {
        if (this.enemiesLeft <= 0) {
            this.wave = this.wave + 1;
            this.createWave();
        }
    }

    update() {
        let my = this.my;
        this.bg.tilePositionY -= 5;

        this.waveCheck();
        this.player.update();
        if (this.player.alive == false) {
            this.sound.play("playerDeath", {
                volume: 0.2
            });
            for (let enemy of this.my.enemyList) {
                enemy.destroy();
            }
            for (let bullet of my.sprite.bullet) {
                bullet.destroy();
            }
            for (let enemyBullet of my.sprite.enemyBullet) {
                enemyBullet.destroy();
            }
            this.my.enemyList = [];
            my.sprite.bullet = [];
            my.sprite.enemyBullet = [];
            this.enemiesLeft = 0;
            this.wave = 0;
            this.myScore = 0;
            this.myLives = 5;
            this.scene.restart();
            this.scene.start("gameOver");
        }
        //console.log(this.wave);

        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            if (my.sprite.bullet.length < this.maxBullets) {
                my.sprite.bullet.push(this.add.sprite(this.player.x, this.player.y-(this.player.displayHeight/2), "gameParts1", "laserGreen05.png"));
                this.sound.play("playerBullet", {
                    volume: 0.2
                });
            } 
        }

        my.sprite.bullet = my.sprite.bullet.filter((bullet) => bullet.y > -(bullet.displayHeight/2));

        for (let bullet of my.sprite.bullet) {
            for (let enemy of this.my.enemyList) { 
                if (this.collides(enemy, bullet) && bullet.visible == true) {
                    if (enemy.alive == true) {
                        this.explosion = this.add.sprite(enemy.x, enemy.y, "explosion03").setScale(0.25).play("explosion");
                        this.sound.play("enemyDeath", {
                            volume: 0.2
                        });
                        //console.log(enemy);
                        this.myScore += this.player.scorePoints;
                        this.updateScore();
                        enemy.alive = false;
                        bullet.visible = false;
                        bullet.destroy();
                        enemy.visible = false;
                        this.enemiesLeft = this.enemiesLeft - 1;
                        console.log(this.enemiesLeft);
                    }     
                }
            }
        }
        
        for (let bullet of my.sprite.bullet) {
            bullet.y -= this.bulletSpeed;
        }

        for (let bullet of my.sprite.enemyBullet) {
            bullet.y += this.enemyBulletSpeed;
            if (this.collides(bullet, this.player) && bullet.visible == true) {
                this.sound.play("playerDamage", {
                    volume: 0.2
                });
                this.myLives--;
                this.updateLives()
                bullet.destroy();
                this.player.takeDamage();
            }
        }

        for (let enemy of this.my.enemyList) {
            if (enemy.alive == true) {
                enemy.update();
            }

            if (enemy.shouldShoot == true) {
                my.sprite.enemyBullet.push(this.add.sprite(enemy.x, enemy.y-(enemy.displayHeight/2), "gameParts1", "laserRed02.png")); 
                this.sound.play("enemyShoot", {
                    volume: 0.2
                });
                enemy.shouldShoot = false;
            }
        }
        
        if (this.my.enemyList.every(this.isDead)) {
            this.my.enemyList = [];
            //console.log("cleared array");
        }
    }

    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

    isDead(element, index, array) {
        if (array.length <= 0) {
            return false;
        }
        return element.alive == false;
    }
    
    updateScore() {
        let my = this.my;
        my.text.score.setText("Score: " + this.myScore);
    }

    updateLives() {
        let my = this.my
        my.text.lives.setText("Lives: " + this.myLives);
    }

}