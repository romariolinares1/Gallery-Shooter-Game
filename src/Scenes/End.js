class End extends Phaser.Scene {
    constructor() {
        super("end");

        this.my = {sprite: {}, text: {}};
    }

    preload() {
        this.load.setPath("./assets/");
    }

    create() {
        let my = this.my;

        this.add.text(10, 5, "Congrats you beat the game!", {
            fontFamily: 'Times, serif',
            fontSize: 50,
            wordWrap: {
                width: 60
            }
        });

        const button = this.add.text(20, 400, "Go back to title", { fill: '#0f0', fontSize: 30 })
            .setInteractive()
            .on("pointerdown", () => this.scene.start("title"));
    }

    update() {
        let my = this.my;
    }
}