export default class bomba extends Phaser.Physics.Arcade.Sprite {

    velocity = 80;
    vida = 1;
    Ataque = 3;
    Pl = 0; 
    tiempoExplosion = 90;
    distancia = [];


    constructor(config) {
        super(config.scene,config.x,config.y,'Bombs');
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);
        this.scene = config.scene;
        this.x = config.x;
        this.y = config.y;
        //this.setScale(5)
        //this.player = config.player;
        //this.Sprite = 'Issac';
    }

    createForEn()
    {
        this.scene.physics.add.overlap(this, this.scene.ply,this.colisionB);
    }
    colisionB(bomba,player)
    {
        player.Bombas += 1;
        bomba.destroy();
    }
    createAnim()
    {

    }

    ExplotarBomba()
    {
        /*this.scene.anims.create({
            key: 'Explosion',
            frames: this.scene.anims.generateFrameNumbers('Explosion', { start: 0, end: 74 }),
            frameRate: 6,
            });*/
        this.distancia[0] = Phaser.Math.Distance.BetweenPoints(this, this.scene.ply);
        for(var i = 1; i < 5; i++){
            this.distancia[i] = Phaser.Math.Distance.BetweenPoints(this, this.scene.arrayMoscas[i-1]);
        }
        if(this.tiempoExplosion <= 0)
        {
            //this.anims.play("ExplosionB", true)
            if(this.distancia[0] <= 100)
            {
                this.scene.ply.VajarVida(this,this.scene.ply);
            }
            for(var i = 1; i < 5; i++){
                if(this.distancia[i] <= 100)
                {
                    if(this.scene.arrayMoscas[i-1] != undefined){
                        this.scene.arrayMoscas[i-1].MatarMosca(this.scene.arrayMoscas[i-1],this);
                    }
                    
                }

            }
        }
        this.tiempoExplosion--;
    }


}