import Sh from './shoot.js'
import Bm from './bomba.js'
export default class player extends Phaser.Physics.Arcade.Sprite {
    //scene = null;
    input = new Phaser.Math.Vector2(0, 0);
    ultimoInput = new Phaser.Math.Vector2(0, 0);
    Vidas = 5;
    Bombas = 0;
    Bomba = null;
    Llaves = 0;
    angulo = 90;
    tiempo = 10;
    arrayBalas = [];
    arrayBombas = [];
    Pared = 0;
    tempV = 0;
    tempB = 0;

    constructor(config) {
        super(config.scene,config.x,config.y,'Issac');
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);
        this.scene = config.scene;
        this.x = config.x;
        this.y = config.y;
        //this.Sprite = 'Issac';
    }
    create()
    {
        this.scene.cameras.main.startFollow(this);
        this.body.setSize(30,30,true)
        this.healthstext = this.scene.add.text(40,16, 'Vidas:' + this.Vidas,{fontSize: '32px', fill: 'white'}).setScrollFactor(0).setDepth(3);
        this.Bombstext = this.scene.add.text(40,64, 'Bombas:' + this.Bombas,{fontSize: '32px', fill: 'white'}).setScrollFactor(0).setDepth(3);
        this.Keystext = this.scene.add.text(40,112, 'Llaves:' + this.Llaves,{fontSize: '32px', fill: 'white'}).setScrollFactor(0).setDepth(3);

    }

    colision(tileset)
    {
        this.Pared = tileset;
        this.scene.physics.add.collider(this, tileset);
    }

    addInputs()
    {
        this.up = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.right = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.left = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.down = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.Disparar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.Explotar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        
    }

    createAnims()
    {
        this.scene.anims.create({
                key: 'WalkDown',
                frames: this.scene.anims.generateFrameNumbers('Issac', { start: 0, end: 2 }),
                frameRate: 6,
                
        });
      this.scene.anims.create({
        key: 'WalkLeft',
        frames: this.scene.anims.generateFrameNumbers('Issac', { start: 3, end: 5 }),
        frameRate: 6,
        });
        this.scene.anims.create({
            key: 'WalkRight',
            frames: this.scene.anims.generateFrameNumbers('Issac', { start: 6, end: 8 }),
            frameRate: 6,
        });
        this.scene.anims.create({
            key: 'WalkBack',
            frames: this.scene.anims.generateFrameNumbers('Issac', { start: 9, end: 11 }),
            frameRate: 6,
        });
    }

    update()
    {
        
        this.updateText();
        if (this.up.isDown)
        {
            this.anims.play('WalkBack', true);
            this.setVelocityY(-70);
            this.angulo = -90;
        }
        else if (this.right.isDown)
        {
            this.anims.play('WalkRight', true);
            this.setVelocityX(70);
            this.angulo = 0;
        }
        else if (this.left.isDown)
        {
            this.anims.play('WalkLeft', true);
            this.setVelocityX(-70);
            this.angulo = -180;
        }
        else if (this.down.isDown)
        {
           this.anims.play('WalkDown', true);
           this.setVelocityY(70);
           this.angulo = 90;
        }
        else{
            this.setVelocityY(0);
            this.setVelocityX(0);
        }
        

        
        if(this.Disparar.isDown)
        {
            this.velocidadDisparo = 15;
            this.Ataque = 1;
            
            if(this.tiempo <= 0){
                this.Tear = new Sh(this.scene, this.x, this.y, 'Lagrima', this.angulo, this.velocidadDisparo, this.ataque);
                this.arrayBalas.push(this.Tear);
                this.tiempo = 10;
                console.log(this.Tear);
                this.i++;
            }
            for(var i = 0; i < this.arrayBalas.length; i++){
                this.arrayBalas[i].colisionBalas(this.Pared);
            }

            
        }
        if(this.Tear != null)
        {
            for(var i = 0; i < this.arrayBalas.length; i++){
				this.arrayBalas[i].update();
		    }
        }
        if(this.Explotar.isDown && this.Bombas != 0)
        {
            if(this.tempB <= 0){
                this.Bomba = new Bm({scene:this.scene, x:this.x, y:this.y, Player: this})
                //this.Bomba = this.Bomba.createAnim()
                this.arrayBombas.push(this.Bomba);
                this.Bombas--;
                this.tempB = 20;
            }
        }
        if(this.Bomba != undefined)
        {
            for(var i = 0; i < this.arrayBombas.length; i++){
				this.arrayBombas[i].ExplotarBomba()
		    }
        }
        this.tiempo--;
        this.tempV--;
        this.tempB--;
        
        
        
    }
    VajarVida(Enemigo, player)
    {
        if(player.Vidas >= 0 && player.tempV <= 0)
        {
            player.tempV = 60;
            player.Vidas -= Enemigo.Ataque;
            player.updateText();

            
        }
        if(player.Vidas <= 0)
        {
            player.Vidas = 0;
            player.destruida = true;
            player.updateText();
            player.destroy();
            
            //var Go = mosca.scene.add.sprite(500, 500, 'GameOver');
            alert("puta")
            Enemigo.scene.GO();
        }
    }
    updateText()
    {
        this.healthstext.setText('Vidas:' + this.Vidas);
        this.Bombstext.setText('Bombas:' + this.Bombas);
        this.Keystext.setText('Llaves:' + this.Llaves);
    }

}
