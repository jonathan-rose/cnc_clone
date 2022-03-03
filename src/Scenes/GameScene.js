import 'phaser';
import { Rectangle } from 'phaser/src/gameobjects';
import Tank from '../Objects/Tank';
import Button from '../Objects/Button';
import TextBox from '../Objects/TextBox';
import Phaser from 'phaser';
import { Path } from 'phaser/src/curves';
import { Linear } from 'phaser/src/math';
import Rock from '../Objects/Rock';

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

    preload () {
        this.load.image("tiles1", "assets/tiles/tiles1.png");
        this.load.tilemapTiledJSON("map1", "assets/tiles/tiles1.json");
    }


    create ()
    {

        // Use JSON from preload() to make tilemap
        // tileWidth and tileHeight refer to dimensions of Tiled tilemap
        // NOT tile px size
        const tileWidth = 10;
        const tileHeight = 10;
        this.map = this.make.tilemap({key: "map1", tileWidth: tileWidth, tileHeight: tileHeight});
        // First parameter should be name of tileset as seen in Tiled tilesets list
        const tileset = this.map.addTilesetImage("tiles1", "tiles1");
        const groundLayer = this.map.createLayer("ground", tileset, 0, 0);

        input = this.input;
        graphics = this.add.graphics();

        testPath = new Phaser.Curves.Path();
        testCurve = new Phaser.Curves.Line([0, 0, 500, 500]);

        testPath.add(testCurve);

        //  Add background
        var background = this.add.image(0, 0, 'background');

        background.displayHeight = this.sys.game.config.height;
        background.scaleX = background.scaleY;
        background.y = game.config.height / 2;
        background.x = game.config.width / 2;
        background.depth = -1;

        var r1 = this.add.rectangle(200, 200, 148, 148, 0xED1C24);
        r1.depth = -1;

        var rock = new Rock(this, 500, 300);

        tank = new Tank(this, tankPath, tankLocation[0], tankLocation[1]);
        mouseText = new TextBox(this, mouseTextLocation[0], mouseTextLocation[1]);

        this.input.on('pointerdown', function (pointer) {
            tank.setTargetCoords(mouseLocation.x, mouseLocation.y);

            tank.makePath();

            tank.startFollow({
                positionOnPath: true,
                rotateToPath: true,
                ease: 'Linear',
                duration: tank.pathTime
            });
            
        }, this);
    }

    update ()
    {
        mouseText.text = "pointer x: " + mouseLocation.x + "\n" + "pointer y: " + mouseLocation.y;
        this.updateMouseLocation(input);

        // let tankAngle = Phaser.Math.Angle.Between(tank.x, tank.y, input.x, input.y);
        // tank.setRotation(tankAngle + Math.PI/2);

        graphics.clear();
        graphics.lineStyle(2, 0xffffff, 1);

        // When the tank class is constructed, its default path is (0,0)
        // This might mean it is constantly drawing a 0-dimensional line in that location
        // tank.path.draw(graphics);
    }

    updateMouseLocation (inputObject)
    {
        mouseLocation.x = inputObject.x;
        mouseLocation.y = inputObject.y;
    }
};
