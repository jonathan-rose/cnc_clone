import 'phaser';
import Phaser from 'phaser';

export default class Tank extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, x, y, map, texture) {
        super(scene, path, x, y, "Tank");
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.speed = 50;
        this.currentTargetCoords = new Phaser.Math.Vector2(x, y);
        this.currentMap = map;
        this.startTile = map.getTileAtWorldXY(x, y);

        this.path = new Phaser.Curves.Path(0, 0);
        this.pathLength = 0;
        this.pathTime = 0;
       
        this.setInteractive();
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
    }

    setLocation (x, y) {
        this.x = x;
        this.y = y;
    }

    setTargetCoords (x, y) {
        this.currentTargetCoords.set(x, y);
    }

    setPathTime () {
        this.pathLength = this.path.getLength();
        this.pathTime = (this.pathLength / this.speed) * 100;
    }

    makePath () {
        var path = new Phaser.Curves.Line([this.x, this.y, this.currentTargetCoords.x, this.currentTargetCoords.y]);
        this.setPath(path);
        this.setPathTime();
    }

    getLocationTile () {
        var tile = this.currentMap.getTileAtWorldXY(this.x, this.y);
        return tile;
    }

    getLocationTileXY () {
        var tile = this.currentMap.getTileAtWorldXY(this.x, this.y);
        var vec = new Phaser.Math.Vector2();
        vec.x = tile.x;
        vec.y = tile.y;
        return vec;     
    }

    getTargetTile () {
        var tile = this.currentMap.getTileAtWorldXY(this.currentTargetCoords.x, this.currentTargetCoords.y);
        return tile;
    }

    getTargetTileXY () {
        var tile = this.currentMap.getTileAtWorldXY(this.currentTargetCoords.x, this.currentTargetCoords.y);
        var vec = new Phaser.Math.Vector2();
        vec.x = tile.x;
        vec.y = tile.y;
        return vec;  
    }
}