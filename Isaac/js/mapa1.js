import P1 from './player.js'
import Mc from './mosca.js'
export default class Mapa extends Phaser.Scene {
    arrayMoscas = [];
    constructor() {
        super('Sala1');
    
    }
    
    preload()
    {
        //images
        this.load.image("mapa","Sprites/Mapas/mapaIMG.png");
        this.load.image("tilesDoor","Sprites/Mapas/puertas.png");
        //Tilemap
        this.load.tilemapTiledJSON('Map1_Isaac', 'Sprites/Mapas/Map1_isaac.json');
        this.load.spritesheet('Issac', 'Sprites/isaac.png', { frameWidth:94, frameHeight: 64 });
        this.load.spritesheet('Mosca', 'Sprites/mosca.png', { frameWidth:32, frameHeight: 32 });
        this.load.spritesheet('Explosion', 'Sprites/expolison.png', { frameWidth:32, frameHeight: 32 });
        this.load.image('Lagrima', 'Sprites/Lagrima.png');
        this.load.image('GameOver', 'Sprites/GameOver.png');
        this.load.image('Bomba', 'Sprites/bomb.png');
        this.load.image('Bombs', 'Sprites/bomb.png');
    }
    
    
    create()
    {
        
        var map = this.make.tilemap({ key: 'Map1_Isaac'});
        const tileset = map.addTilesetImage('mapaIMG', 'mapa');
        const tileset2 = map.addTilesetImage('puertas', 'tilesDoor');

        var Marco = map.createLayer('Marco', tileset2).setDepth(3);
        var Puerta = map.createLayer('puerta', tileset2).setDepth(2);
        var Suelo = map.createLayer('Suelo', tileset).setDepth(0);
        var Paredes = map.createLayer('Paredes', tileset).setDepth(1);
        Paredes.setCollisionByProperty({Colision: true})
        //Player.player;
        
        this.ply = new P1({scene:this, x:500, y:500}).setDepth(3);
        this.xm = 700;
        this.ym = 700;
        for(var i = 0; i < 2; i++)
        {
            this.xm = this.xm + 20;
            this.EnemM = new Mc({scene:this, x:this.xm, y:this.ym, Player: this.ply}).setDepth(3);
            this.arrayMoscas.push(this.EnemM);
            
        }
        for(var i = 2; i < 4; i++)
        {
            this.ym = this.ym + 20;
            this.EnemM = new Mc({scene:this, x:this.xm, y:this.ym, Player: this.ply}).setDepth(3);
            this.arrayMoscas.push(this.EnemM);
            
        }
        
        this.ply.create();
        this.ply.addInputs();
        this.ply.createAnims();
        this.ply.colision(Paredes);
        this.EnemM.createAnims();
        
        

        
    }
    GO()
    {
        //console.log(this.game.scale.gameSize);
        var Go = this.add.sprite(this.game.scale.gameSize._width / 2, this.game.scale.gameSize._height / 2, 'GameOver').setScale(3,3).setDepth(5).setScrollFactor(0);
        
    }

    update()
    {
            if(this.ply.destruida != true)
            {
                
                this.ply.update();
                for(var i = 0; i < this.arrayMoscas.length; i++){
                    if(this.arrayMoscas[i].destruida != true ){
                        this.arrayMoscas[i].update();
                        this.physics.add.collider(this.arrayMoscas[i], this.arrayMoscas[i+1]);
                        //console.log(this.arrayMoscas[i+1]);
                        this.arrayMoscas[i].FollowPlayer(this.ply);
                    }

                }
            }
        
    }
}