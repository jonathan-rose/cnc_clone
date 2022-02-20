import 'phaser';
import Phaser from 'phaser';

// Can I make this work by changing it to a Phaser.GameObjects.PathFollower?
export default class Tank extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "Tank");
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.speed = 200;
        this.currentTargetCoords = new Phaser.Math.Vector2(x, y);
        // this.setOrigin(0,0);
        this.currentPath = new Phaser.Curves.Path(0, 0);
        
        this.setInteractive();

        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
    }

    setLocation (x, y)
    {
        this.x = x;
        this.y = y;
    }

    setTargetCoords (x, y){
        this.currentTargetCoords.set(x, y);
    }
}