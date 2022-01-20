import 'phaser';
import { Rectangle } from 'phaser/src/gameobjects';
import Tank from '../Objects/Tank';
import Button from '../Objects/Button';
import TextBox from '../Objects/TextBox';
import Phaser from 'phaser';

var tank;
var input;
var mouseLocation = new Phaser.Math.Vector2();
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
            this.moveTankToLocation(tank, mouseLocation);
        }, this);
    }

    update ()
    {
        mouseText.text = "pointer x: " + mouseLocation.x + "\n" + "pointer y: " + mouseLocation.y;

        let tankAngle = Phaser.Math.Angle.Between(tank.x, tank.y, input.x, input.y);
        tank.setRotation(tankAngle + Math.PI/2);

        console.log(tank.currentTarget);
        this.updateMouseLocation(input);
    }

    updateMouseLocation (inputObject)
    {
        mouseLocation.x = inputObject.x;
        mouseLocation.y = inputObject.y;
    }

    /**
    * @param {Vector2} targetCoords
    */

    setTankLocation (tankObject, targetCoords)
    {
        tankObject.x = targetCoords.x;
        tankObject.y = targetCoords.y;
    }

    moveTankToLocation (tankObject, targetCoords)
    {
        tankObject.currentTarget = targetCoords;
        this.physics.moveTo(tankObject, targetCoords.x, targetCoords.y, 100);       
    }
};
