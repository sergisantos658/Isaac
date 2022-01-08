import Ms from './mosca.js'
export default class Bala extends Phaser.Physics.Arcade.Sprite{

	direccion = new Phaser.Math.Vector2();
	angulo = 0;
	velocidad = 0;
	Ataque = 1;
	destruida = false;

	constructor(escena, x, y, sprite, angulo, velocidad, ataque){

		super(escena, x, y, sprite);
        this.x = x;
		this.y = y;
		this.angulo = angulo;
		this.velocidad = velocidad;
		this.ataque = 1;
		this.escena = escena;

		escena.add.existing(this);
		escena.physics.add.existing(this);

		// Physics
		this.enableBody = true;
		this.body.immovable = true;

		this.onColide = true;
		//this.depth = 90;

		//this.body.offset.y = 16;
		//this.body.offset.x = -4;
		this.body.width = 16;
		this.body.height = 16;

	}

	update(){
		if(this.destruida != true){
			this.desplazarBala();
		}

	}

	colisionBalas(tileset)
	{
		//console.log(tileset);
		if(this != undefined){
			this.escena.physics.add.collider(this, tileset, this.destruirBala);
		}
		
	}

	/*calcularDireccion(angulo) {
		var direccion = new Phaser.Math.Vector2(Math.cos(angulo * Math.PI / 180), Math.sin(angulo * Math.PI / 180));
		return direccion;
	}*/

	desplazarBala() {
			/*this.x += this.direccion.x * this.velocidad;
			this.y += this.direccion.y * this.velocidad;*/
			console.log(this.direccion.x * this.velocidad)
			
			if(this.angulo == 0)
			{
				this.setVelocityX(250);
			}
			else if(this.angulo == 90)
			{
				this.setVelocityY(250);
			}
			if(this.angulo == -90)
			{
				this.setVelocityY(-250);
			}
			if(this.angulo == -180)
			{
				this.setVelocityX(-250);
			}
			

			
            
	}
	
	destruirBala(bala,tilesets){
		console.log(bala);
		bala.body.destroy();
		bala.destruida = true;
		bala.destroy();
	}	


}