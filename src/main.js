// Romario Linares
// Created: 5/5/2024
// Phaser: 3.70.0
//
// Gallery Shooter
//
// 
// Art and sound assets from Kenny Assets "" set:
// 

"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 800,
    height: 600,
    fps: {forceSetTimeOut: true, target: 30},
    scene: [Title, Game, GameOver]
}

const game = new Phaser.Game(config);