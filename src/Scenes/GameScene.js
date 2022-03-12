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
var tileText;
var tileTextLocation = [600, 60];
var tankLocation = [100, 300];
var tankPath = new Phaser.Curves.Path();
var graphics;
var testPath;
var testCurve;
var map;

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }

    preload () {
        this.load.image("tiles1", "assets/tiles/tiles1.png");
        this.load.tilemapTiledJSON("map1", "assets/tiles/tiles1.json");
    }


    create () {

        // Use JSON from preload() to make tilemap
        // tileWidth and tileHeight refer to dimensions of Tiled tilemap
        // NOT tile px size
        const mapTilesWidth = 32;
        const mapTilesHeight = 32;
        var map = this.make.tilemap({key: "map1", tileWidth: mapTilesWidth, tileHeight: mapTilesHeight});

        // First parameter should be name of tileset as seen in Tiled tilesets list
        const tileset = map.addTilesetImage("tiles1", "tiles1");
        
        var groundLayer = map.createLayer("ground", tileset, 0, 0);
        var rocksLayer = map.getObjectLayer("rockObjects");

        var rocks = this.add.group();

        rocksLayer.objects.forEach(o => {
            rocks.add(new Rock(this, o.x, o.y));
        });

        input = this.input;
        graphics = this.add.graphics();

        // var r1 = this.add.rectangle(200, 200, 148, 148, 0xED1C24);
        // r1.depth = -1;

        tank = new Tank(this, tankPath, tankLocation[0], tankLocation[1], map);
        mouseText = new TextBox(this, mouseTextLocation[0], mouseTextLocation[1]);
        tileText = new TextBox(this, tileTextLocation[0], tileTextLocation[1]);

        this.input.on('pointerdown', function (pointer) {

            map.setLayer("ground");
            var tileAtMouseXY = map.getTileAtWorldXY(mouseLocation.x, mouseLocation.y);

            tileText.text = "tile x: " + map.getTileAtWorldXY(mouseLocation.x, mouseLocation.y).x + "\n" + "tile y: " + map.getTileAtWorldXY(mouseLocation.x, mouseLocation.y).y;

            tank.setTargetCoords(mouseLocation.x, mouseLocation.y);

            tank.makePath();

            this.generatePath();

            tank.startFollow({
                positionOnPath: true,
                rotateToPath: true,
                ease: 'Linear',
                duration: tank.pathTime
            });
            
        }, this);
    }

    update () {
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

    updateMouseLocation (inputObject) {
        mouseLocation.x = inputObject.x;
        mouseLocation.y = inputObject.y;
    }

    generatePath () {
        const queue = [];
        const parentForCell = {};

        let startTile = tank.getTileXY();

        queue.push(startTile);

        while (queue.length > 0) {
            const vec = queue.shift();

            let y = vec.y;
            let x = vec.x;

            const currentKey = `${y}x${x}`;
            const current = map.getTileAt(x, y);

            const neighbours = [
                { y: y - 1, x }, // Above
                { y, x: x + 1 }, // Right
                { y: y + 1, x }, // Below
                { y, x: x - 1 }  // Left
            ]

            console.log(neighbours);

            for (let i = 0; i < neighbours.length; ++i) {
                const nY = neighbours[i].y;
                const nX = neighbours[i].x;

                const key = `${nY}x${nX}`;

                if (key in parentForCell) {
                    continue;
                }

                parentForCell[key] = {
                    key: currentKey,
                    cell: current
                }
                
                queue.push(neighbours[i]);
            }

        }
        
    }
};
