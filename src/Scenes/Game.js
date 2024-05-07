class Game extends Phaser.Scene {
    graphics;
    curve;
    path;

    constructor() {
        super("game");
        this.my = {sprite: {}, text: {}};

        this.my.sprite.bullet = [];
        this.my.enemyList = [];
        this.enemiesLeft = 0;
        this.wave = 0;  
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
        this.zigzag.lineTo(100, 550);
        this.zigzag.lineTo(-100, 600);
        this.zigzag.lineTo(100, 650);
        this.zigzag.lineTo(-100, 700);

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
        this.zigzagFlip.lineTo(-100, 550);
        this.zigzagFlip.lineTo(100, 600);
        this.zigzagFlip.lineTo(-100, 650);
        this.zigzagFlip.lineTo(100, 700);

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

        this.spiral = new Phaser.Curves.Spline(this.newPoints);
         
        this.graphics = this.add.graphics();

        my.sprite.player = this.add.sprite(game.config.width/2, game.config.height - 40, "gameParts1", "playerShip1_green.png");
        my.sprite.player.setScale(0.5);

        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.playerSpeed = 8;
        this.bulletSpeed = 15;

        //let enemy = new Enemy(this, 400, 20, "gameParts2", "spaceShips_001.png", 10, this.curve, 0.5);
    }

    createWave() {
        switch(this.wave) {
            case 1:
                let zigzagger1 = new Enemy(this, 100, 20, "gameParts1", "enemyBlack4.png", 10, this.zigzag, 0.5);
                let zigzagger2 = new Enemy(this, 500, 20, "gameParts1", "enemyBlack4.png", 10, this.zigzagFlip, 0.5);
                let zigzagger3 = new Enemy(this, 300, 20, "gameParts1", "enemyBlack4.png", 10, this.zigzag, 0.5);
                let zigzagger4 = new Enemy(this, 700, 20, "gameParts1", "enemyBlack4.png", 10, this.zigzagFlip, 0.5);
                this.enemiesLeft = 4;
                this.my.enemyList.push(zigzagger1);
                this.my.enemyList.push(zigzagger2);
                this.my.enemyList.push(zigzagger3);
                this.my.enemyList.push(zigzagger4);
                break;
            case 2:
                let curver1 = new Enemy(this, 100, 20, "gameParts1", "enemyBlack4.png", 10, this.curve, 0.5);
                let curver2 = new Enemy(this, 500, 20, "gameParts1", "enemyBlack4.png", 10, this.curve, 0.5);
                let curver3 = new Enemy(this, 300, 20, "gameParts1", "enemyBlack4.png", 10, this.curve, 0.5);
                let curver4 = new Enemy(this, 700, 20, "gameParts1", "enemyBlack4.png", 10, this.curve, 0.5);
                this.enemiesLeft = 4;
                this.my.enemyList.push(curver1);
                this.my.enemyList.push(curver2);
                this.my.enemyList.push(curver3);
                this.my.enemyList.push(curver4);
                break;
            case 3:
                let zigzagger5 = new Enemy(this, 100, 20, "gameParts1", "enemyBlack4.png", 10, this.zigzag, 0.5);
                let zigzagger6 = new Enemy(this, 500, 20, "gameParts1", "enemyBlack4.png", 10, this.zigzagFlip, 0.5);
                let curver5 = new Enemy(this, 300, 20, "gameParts1", "enemyBlack4.png", 10, this.curve, 0.5);
                let curver6 = new Enemy(this, 700, 20, "gameParts1", "enemyBlack4.png", 10, this.curve, 0.5);
                this.enemiesLeft = 4;
                this.my.enemyList.push(zigzagger5);
                this.my.enemyList.push(zigzagger6);
                this.my.enemyList.push(curver5);
                this.my.enemyList.push(curver6);
                break;
            case 4:
                let boss = new Enemy(this, 400, 0, "gameParts2", "spaceShips_007.png", 10, this.spiral, 1);
                this.enemiesLeft = 1;
                this.my.enemyList.push(boss);
            default:
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
        
        this.waveCheck();
        //console.log(this.wave);

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
            for (let enemy of this.my.enemyList) { 
                if (this.collides(enemy, bullet)) {
                    if (enemy.alive == true) {
                        //console.log(enemy);
                        enemy.alive = false;
                        bullet.visible = false;
                        enemy.visible = false;
                        this.enemiesLeft = this.enemiesLeft - 1;
                        console.log(this.enemiesLeft);
                        // this.myScore += enemy.scorePoints;
                        // this.updateScore();
                    }     
                }
            }
        }
        
        
        for (let bullet of my.sprite.bullet) {
            bullet.y -= this.bulletSpeed;
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
        //ad my.text.score.setText("Score " + this.myScore);
    }

}