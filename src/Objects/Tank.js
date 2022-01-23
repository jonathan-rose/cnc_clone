import 'phaser';

export default class Tank extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "Tank");
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.speed = 200;
        this.currentTarget = new Phaser.Math.Vector2(100, 300);
        // this.setOrigin(0,0);
        
        this.setInteractive();

        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
    }
}