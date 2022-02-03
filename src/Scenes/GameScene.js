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
var tankPath = new Phaser.Curves.Path();
var graphics;
var testPath;
var testCurve;

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }


    create ()
    {
        // Get scene input
        // this.input gets Phaser.Input.InputPlugin
        // Subsequent references to x and y members of input will refer 
        // to current active Phaser.Input.Point object
        input = this.input;
        graphics = this.add.graphics();

        testPath = new Phaser.Curves.Path();
        testCurve = new Phaser.Curves.Line([0, 0, 500, 500]);

        testPath.add(testCurve);

        //  Add background
        this.add.image(400, 300, 'background');

        var r1 = this.add.rectangle(200, 200, 148, 148, 0xED1C24);

        tank = new Tank(this, tankLocation[0], tankLocation[1]);
        mouseText = new TextBox(this, mouseTextLocation[0], mouseTextLocation[1]);

        this.input.on('pointerdown', function (pointer) {
            tank.setTargetCoords(mouseLocation.x, mouseLocation.y);

            var clickCurve = new Phaser.Curves.Line([tank.x, tank.y, tank.currentTargetCoords.x, tank.currentTargetCoords.y]);
            var tankToBaseCurve = new Phaser.Curves.Line([tank.currentTargetCoords.x, tank.currentTargetCoords.y, r1.x, r1.y]);

            // Adding the tankPath object has to happen outside the pointerdown function
            // Otherwise it doesn't exist when the scene starts
            // Because nobody has clicked yet
            // tankPath = this.add.path();
            tankPath.add(clickCurve);
            tankPath.add(tankToBaseCurve);
            
            // console.log(tankPath);

            var tween = this.tweens.add({
                targets: tank,
                x: tank.currentTargetCoords.x,
                y: tank.currentTargetCoords.y,
                duration: 2000,
                ease: 'Power4',
            });

            // console.log(this.tweens);

        }, this);
    }

    update ()
    {
        mouseText.text = "pointer x: " + mouseLocation.x + "\n" + "pointer y: " + mouseLocation.y;
        this.updateMouseLocation(input);

        let tankAngle = Phaser.Math.Angle.Between(tank.x, tank.y, input.x, input.y);
        tank.setRotation(tankAngle + Math.PI/2);

        graphics.clear();
        graphics.lineStyle(2, 0xffffff, 1);

        tankPath.draw(graphics);
        console.log(tankPath);
        graphics.fillStyle(0xff0000, 1);
    }

    updateMouseLocation (inputObject)
    {
        mouseLocation.x = inputObject.x;
        mouseLocation.y = inputObject.y;
    }
};
