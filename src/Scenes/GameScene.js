import 'phaser';
import { Rectangle } from 'phaser/src/gameobjects';
import Tank from '../Objects/Tank';
import Button from '../Objects/Button';
import TextBox from '../Objects/TextBox';

var tank;
var input;
var mouseLocation = [0, 0];
var mouseText;
var mouseTextLocation = [600, 25];
var tankLocation = [100, 300];

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }


    create ()
    {
        // Get scene input
        // this.input gets Phaser.Input.InputPlugin
        // Subsequent references to x and y members will refer 
        // to current active Phaser.Input.Point object
        input = this.input;      

        //  Add background
        this.add.image(400, 300, 'background');

        // var r1 = this.add.rectangle(200, 200, 148, 148, 0x6666ff);

        tank = new Tank(this, tankLocation[0], tankLocation[1]);

        mouseText = new TextBox(this, mouseTextLocation[0], mouseTextLocation[1]);

        this.input.on('pointerdown', function (pointer) {
            this.setTankLocation(tank, mouseLocation);
        }, this);
    }

    update ()
    {
        mouseText.text = "pointer x: " + mouseLocation[0] + "\n" + "pointer y: " + mouseLocation[1];

        let tankAngle = Phaser.Math.Angle.Between(tank.x, tank.y, input.x, input.y);
        tank.setRotation(tankAngle + Math.PI/2);

        this.updateMouseLocation(input);
    }

    updateMouseLocation (inputObject)
    {
        mouseLocation[0] = inputObject.x;
        mouseLocation[1] = inputObject.y;
    }

    /**
    * @param {Array} targetCoords
    */

    setTankLocation (tankObject, targetCoords)
    {
        tankObject.x = targetCoords[0];
        tankObject.y = targetCoords[1];
    }
};
