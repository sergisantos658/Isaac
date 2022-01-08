import Bm from './bomba.js'
export default class mosca extends Phaser.Physics.Arcade.Sprite {   
    velocity = 80;
    vida = 1;
    Ataque = 1;
    Pl = 0; 
    randomB = Phaser.Math.Between(-1, 1);
    

    constructor(config) {
        super(config.scene,config.x,config.y,'Mosca');
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);
        this.scene = config.scene;
        this.x = config.x;
        this.y = config.y;
        //this.player = config.player;
        //this.Sprite = 'Issac';
    }


    colision(mosca,player)
    {
        //console.log(bala);
        for(var i = 0; i < player.arrayBalas.length; i++){
            this.scene.physics.add.overlap(mosca, player.arrayBalas[i],this.dMosca);
        }
        this.scene.physics.add.overlap(mosca, player,player.VajarVida);
    }
    dMosca(mosca, obj)
    {
        console.log(mosca.randomB)
        if(mosca.randomB == 1)
        {
            mosca.bomba = new Bm({scene:mosca.scene, x:mosca.x, y:mosca.y, Player: mosca.Pl})
            mosca.bomba.createForEn();
        }
        mosca.MatarMosca(mosca,obj)
        obj.destruida = true;
        obj.destroy();
        //console.log(balas.ataque);
        //ala.*/
    }

    VajarVida(mosca, player)
    {
        //console.log(mosca.scene)

       if(player.Vidas >= 0 && player.tempV <= 0)
        {
            player.tempV = 60;
            player.Vidas -= mosca.Ataque;

            
        }
        if(player.Vidas == 0)
        {
            player.updateText();
            player.destruida = true;
            player.destroy();
            
            //var Go = mosca.scene.add.sprite(500, 500, 'GameOver');
            
            mosca.scene.GO();
        }
        
    }

    createAnims()
    {
        this.scene.anims.create({
                key: 'Fly',
                frames: this.scene.anims.generateFrameNumbers('Mosca', { start: 0, end: 3 }),
                frameRate: 6,
                
        });
    }

    update()
    {
        
        if(this.Pl != 0 && this.vida > 0)
        {
            this.anims.play('Fly', true);
            this.colision(this,this.Pl);
        }
            
        
        
    }

    FollowPlayer(player)
    {
        this.Pl = player;
        var direction = new Phaser.Math.Vector2( player.x - this.x, player.y - this.y);
        direction.normalize();

        var moviment = new Phaser.Math.Vector2();
        moviment.x = direction.x *  this.velocity;
        moviment.y = direction.y *  this.velocity;

        this.setVelocityX(moviment.x); 
        this.setVelocityY(moviment.y);
        


    }
    MatarMosca(mosca,obj)
    {
        mosca.destruida = true;
        mosca.destroy();
        mosca.vida = mosca.vida - obj.Ataque;
        
    }
}