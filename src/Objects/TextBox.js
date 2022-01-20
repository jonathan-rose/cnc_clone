import 'phaser';
import Phaser from 'phaser';

export default class TextBox extends Phaser.GameObjects.Text {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene = scene;

        // As an extension of Phaser.GameObjects.Text
        // it has all the members of the base class
        // https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Text.html
        this.text = "Text Undefined";

        scene.add.existing(this);
    }


}
