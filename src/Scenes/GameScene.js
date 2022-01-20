import 'phaser';
import { Rectangle } from 'phaser/src/gameobjects';
import Tank from '../Objects/Tank';
import Button from '../Objects/Button';

var tank;
var input;

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }


    create ()
    {
        // Get scene input
        input = this.input;

        //  Add background
        this.add.image(400, 300, 'background');

        var r1 = this.add.rectangle(200, 200, 148, 148, 0x6666ff);

        tank = new Tank(this, 100, 300);

    }

    update ()
    {
        let tankAngle = Phaser.Math.Angle.Between(tank.x, tank.y, input.x, input.y);
        tank.setRotation(tankAngle + Math.PI/2);
    }
};
