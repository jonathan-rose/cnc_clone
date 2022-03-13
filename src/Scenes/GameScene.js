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
var tankLocation = [50, 50];
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
        
        var groundLayer = map.createLayer("terrain", tileset, 0, 0);
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

            map.setLayer("terrain");
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
        const tileValues = [];

        map.setLayer("terrain");
        // Fix these hardcoded numbers
        const neighborTiles = map.getTilesWithin(start.x - 1, start.y - 1, 3, 3);

        // for (let i = 0; i < neighborTiles.length; i++) {
            
        // }

        neighborTiles.forEach((e) => {
            let g = this.chebDistance(e, start); // g = distance
            let h = this.chebDistance(e, end); // h = heuristic (distance from end node)
            let f = g + h;                       // f = g + h (total cost)

            let tileValue = {g: g, h: h, f: f};

            tileValues.push(tileValue);
        });

        console.log(tileValues);
    }

    chebDistance (start, end) {
        let x = Math.abs(end.x - start.x);
        let y = Math.abs(end.y - start.y);

        let result = Math.max(x, y);

        return result;
    }
};
