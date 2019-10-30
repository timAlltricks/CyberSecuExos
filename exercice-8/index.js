'use strict';

/**
 * naval generator
 * @constructor
 * @param {number} map
 */
var NavalGenerator = function NavalGenerator(map) {
    this.yAxis = map.length; //row quantity
    this.xAxis = map[0].length; //column quantity
    this.map = map;
    this.ships = [["boat-xs", false, 2], ["boat-sm", false, 3], ["boat-md", false, 4], ["boat-lg", false, 5], ["boat-lg", false, 5]];
    this.shipsId = "boatsState";
}

/**
 * render
 */
NavalGenerator.prototype.render = function() {
  this.renderGrid();
  this.showShipsState();
}

/**
 * NavalGenerator
 */
NavalGenerator.prototype.renderGrid = function() {
    var A = 65;
    var elBody = document.querySelector('body');
    var elTable = document.createElement('table');
    var globalObject = this;
    for (var i = 0; i <= this.xAxis; i += 1) {
        var elTr = document.createElement('tr');
        for (var j = 0; j <= this.yAxis; j += 1) {
            var elTd = document.createElement('td');
            let x = i;
            let y = j;
            if(i === 0) elTd.innerHTML = String.fromCharCode(A + j);
            else if(i > 0 && j === 0) elTd.innerHTML = i;
            elTd.addEventListener("click", function(){globalObject.casePress(this, x - 1, y - 1);});
            elTd.style.width = '40px';
            elTd.style.height = '40px';
            elTd.style.border = "1px solid black";
            elTr.appendChild(elTd);
        }
        elTable.appendChild(elTr);
    }
    elBody.appendChild(elTable);
    var ships = document.createElement("div");
    ships.id = this.shipsId;
    elBody.appendChild(ships);
}

/**
 * click Case
 */
NavalGenerator.prototype.casePress = function(elm, x, y) {
    if(this.map[y][x] > 0){
        elm.style.backgroundColor = "red";
        this.saveShip(x, y);
    } else if (this.map[y][x] === 0){
        elm.style.backgroundColor = "blue";
    }
}

/**
 * save ships
 */
NavalGenerator.prototype.saveShip = function(x,y) {
    var boatRef = this.map[y][x].valueOf();
    this.map[y][x] = -boatRef;
    this.ships[boatRef - 1].push(boatRef);
    var gap = 3;
    var sizeRef = 2;
    if(this.ships[boatRef - 1].length - gap === this.ships[boatRef - 1][sizeRef]) {
        this.ships[boatRef - 1][1] = true;
        alert(this.ships[boatRef - 1][0] + " à été coulé"); // this.ships[x].length - gap --> boat name = this.ships[x][0] && isDead = this.ships[x][1]
        var elm = document.querySelector("#" + this.shipsId + " label:nth-child(" + boatRef + ")");
        elm.style.textDecoration = "line-through";
        var i = 0;
        while(i < this.ships.length && this.ships[i][1] === true) i++;
        if(i === this.ships.length) alert("vous avez gagné");
    }
}

/**
 * show ship's state
 */
NavalGenerator.prototype.showShipsState = function() {
    var elm = document.getElementById(this.shipsId);
    this.ships.forEach(element => {
        var ship = document.createElement("label");
        ship.innerHTML = element[0];
        elm.appendChild(ship);
    });
}

var gridGenerator = new NavalGenerator([
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
    [0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 4, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]);

gridGenerator.render();