class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");

        this.my = {sprite: {}, text: {}};
    }

    preload() {
        this.load.setPath("./assets/");
    }

    create() {
        let my = this.my;

        this.add.text(10, 5, "Game Over!", {
            fontFamily: 'Times, serif',
            fontSize: 24,
            wordWrap: {
                width: 60
            }
        });

        const button = this.add.text(100, 100, "Start Over", { fill: '#0f0' })
            .setInteractive()
            .on("pointerdown", () => this.scene.start("game"));
    }

    update() {
        let my = this.my;
    }
}