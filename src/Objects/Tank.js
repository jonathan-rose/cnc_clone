import 'phaser';

export default class Tank extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "Tank");
        this.scene = scene;
        this.x = x;
        this.y = y;
        // this.setOrigin(0,0);
        
        this.setInteractive();

        this.on('pointerdown', function (pointer) {
            // this.physics.moveTo(scene.input.x, scene.input.y)
        });

        scene.add.existing(this);
    }
}