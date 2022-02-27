import 'phaser';
import Phaser from 'phaser';

export default class Rock extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "Rock");
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.setScale(0.5);

        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
    }
}
