class MyMorpionXO {
    /**
     * Morpion
     * @constructor
     */
    constructor() {
        this.init();
    }

    /**
     * init
     */
    init(){
        this.player1 = new Player("BlueMan", "blue");
        this.player2 = new Player("RedMan", "red");
        this.actualPlayer = this.player1;
        this.map = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ];
        this.id = "morpion";
        this.maxPoints = 3;
        this.appendGrid();
    }

    /**
     * makegrid
     */
    makeGrid(){
        var globalObject = this;
        var elTable = document.createElement('table');

        for (var i = 0; i < this.map[0].length; i += 1) {
            var elTr = document.createElement('tr');

            for (var j = 0; j < this.map.length; j += 1) {
                var elTd = document.createElement('td');
                elTd.style.width = '40px';
                elTd.style.height = '40px';
                elTd.style.backgroundColor = "white";
                elTd.style.border = "1px solid black";
                let x = i;
                let y = j;
                elTd.addEventListener("click", function(){
                    globalObject.addPawn(this, x, y);
                })
                elTr.appendChild(elTd);
            }

            elTable.appendChild(elTr);
        }
        return elTable;
    }

    /**
     * append Grid
     */
    appendGrid(){
        var body = document.querySelector('body');
        var container = document.createElement('div');
        container.id = this.id;
        var p1 = document.createElement("label");
        p1.id = this.player1.getName();
        container.appendChild(p1);
        var p2 = document.createElement("label");
        p2.id = this.player2.getName();
        var ap = document.createElement("label");
        ap.id = this.actualPlayer.getName();
        container.appendChild(p2);
        container.appendChild(this.makeGrid());
        body.appendChild(container);
        this.displayScore();
    }

    /**
     * add pawn
     */
    addPawn(elm, x, y){
        if(elm.style.backgroundColor === "white"){
            elm.style.backgroundColor = this.actualPlayer.getColor();
            this.map[y][x] = this.actualPlayer.getName().charAt(0);
            this.actualPlayer = this.getNextPlayer();
            this.handleWinner();
        }
    }

    /**
     * get next player
     * @return {Player} player
     */
    getNextPlayer(){
        if(this.actualPlayer == this.player1) return this.player2;
        return this.player1;
    }

    /**
     * new game
     */
    newGame(){
        this.player1.newGame();
        this.player2.newGame();
        this.map = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ];
        let morpion = document.getElementById(this.id);
        morpion.querySelector('table').remove();
        morpion.appendChild(this.makeGrid());
    }

    /**
     * verif win
     */
    verifWin(){
        for(var i = 0; i < this.map.length; i++){
            for(var j = 1; j < this.map.length; j++){
                if(this.map[i][j]  != this.map[i][j - 1]) break;
                else if(this.map[i][j]  === this.map[i][j - 1] && j === this.map.length - 1) return this.map[i][j];
            }
            for(var j = 1; j < this.map.length; j++){
                if(this.map[j][i]  != this.map[j - 1][i]) break;
                else if(this.map[j][i]  === this.map[j - 1][i] && j === this.map.length - 1) return this.map[j][i];
            }
        }
        for(var i = 0; i < this.map.length; i++){
            if(i > 0 && this.map[i][this.map.length - i - 1]  != this.map[i - 1][this.map.length - i]) break;
            else if(i === this.map.length - 1 && this.map[i][this.map.length - i - 1]  === this.map[i - 1][this.map.length - i]) return this.map[i][this.map.length - i - 1];
        }
        for(var i = 0; i < this.map.length; i++){
            if(i > 0 && this.map[i][i]  != this.map[i - 1][i - 1]) break;
            else if(i === this.map.length -1 && this.map[i][i]  === this.map[i - 1][i - 1]) return this.map[i][i];
        }
        return false;
    }

    /**
     * handle winner
     */
    handleWinner(letter){
        var globalObject = this;
        var letter = this.verifWin();
        var winner;
        if(letter){     
            if(this.player1.getName().charAt(0) === letter){
                winner = this.player1;
                alert(winner.getName() + " won this set");
            }
            else if(this.player2.getName().charAt(0) === letter){
                winner = this.player2;
                alert(winner.getName() + " won this set");
            }
            winner.addPoint();
            this.displayScore();
            if(winner.getPoints() === this.maxPoints){
                alert(winner.getName() + " won the whole game !");
                this.restart();
            } else {
                this.newGame();
            }
        } else if(this.isFull()){
            alert("this is a draw !")
            this.newGame();
        }
    }

    /**
     * is full
     * @return {boolean} isfull
     */
    isFull(){
        for(var i = 0; i < this.map.length; i++){
            for(var y = 0; y < this.map.length; y++) if(this.map[i][y] === 0) return false;
        }
        return true;
    }

    /**
     * display score
     */
    displayScore(){
        var p1 = document.getElementById(this.player1.getName());
        p1.innerHTML = this.player1.getName() + " : " + this.player1.getPoints() + " points"
        var p2 = document.getElementById(this.player2.getName());
        p2.innerHTML = this.player2.getName() + " : " + this.player2.getPoints() + " points"
    }

    /**
     * restart game
     */
    restart(){
        document.getElementById(this.id).remove();
        this.init();
    }
}

class Player {
    constructor(name, color) {
        this.points = 0;
        this.color = color;
        this.name = name;
        this.pawns = new Array();
    }

    /**
     * get color
     * @return {String} color
     */
    getColor(){
        return this.color;
    }

    /**
     * get name
     * @return {String} name
     */
    getName(){
        return this.name;
    }

    /**
     * new game
     */
    newGame(){
        this.pawns = new Array();
    }

    /**
     * add point
     */
    addPoint(){
        this.points += 1;
    }

    /**
     * get points
     * @return {Integer} points
     */
    getPoints(){
        return this.points;
    }
}

class Pawn {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let morpion = new MyMorpionXO();