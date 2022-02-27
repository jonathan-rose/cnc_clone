import 'phaser';
import Phaser from 'phaser';

export default class Tank extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, x, y, texture) {
        super(scene, path, x, y, "Tank");
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.speed = 200;
        this.currentTargetCoords = new Phaser.Math.Vector2(x, y);
        // this.setOrigin(0,0);
        this.path = new Phaser.Curves.Path(0, 0);

        // startFollow method is not currently using path stored in class
        // It used the path var in the GameScene
        
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