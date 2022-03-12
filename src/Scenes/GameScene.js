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
        map = this.make.tilemap({key: "map1", tileWidth: mapTilesWidth, tileHeight: mapTilesHeight});

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

        tank = new Tank(this, tankPath, tankLocation[0], tankLocation[1], map);
        mouseText = new TextBox(this, mouseTextLocation[0], mouseTextLocation[1]);
        tileText = new TextBox(this, tileTextLocation[0], tileTextLocation[1]);

        this.input.on('pointerdown', function (pointer) {

            map.setLayer("ground");
            var tileAtMouseXY = map.getTileAtWorldXY(mouseLocation.x, mouseLocation.y);

            tileText.text = "tile x: " + map.getTileAtWorldXY(mouseLocation.x, mouseLocation.y).x + "\n" + "tile y: " + map.getTileAtWorldXY(mouseLocation.x, mouseLocation.y).y;

            tank.setTargetCoords(mouseLocation.x, mouseLocation.y);

            tank.makePath();

            this.generatePath(tank);

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

        graphics.clear();
        graphics.lineStyle(2, 0xffffff, 1);
    }

    updateMouseLocation (inputObject) {
        mouseLocation.x = inputObject.x;
        mouseLocation.y = inputObject.y;
    }

    generatePath (object) {
        const start = object.getLocationTile(); // Calls a function that there is no guarantee the object will have
        const end = object.getTargetTile();
        const path = [];

        console.log(start, end);

        const neighbors = {top: 0, bottom: 0, right: 0, left: 0};

        neighbors.top = end.y - 1;
        neighbors.bottom = end.y + 1;
        neighbors.right = end.x + 1;
        neighbors.left = end.x - 1;

        console.log(neighbors);


    }
};
