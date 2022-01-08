import Sala1 from './mapa1.js'
import P1 from './player.js'
export var config = {

    type: Phaser.AUTO,
    width: 1080,
    height: 720,
    
    fps: {
        min: 15,
        target: 30,
        forceSetTimeOut: true
    },

    pixelArt: true,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [
        Sala1
    ],
}
var Game = new Phaser.Game(config);

class main extends Phaser.Scene{
    constructor(){
        super('main');
    }
    create()
    {
        this.scene.start('Sala1');
    }
}