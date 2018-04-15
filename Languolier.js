	/** 
	*constructeur de Languolier 
	*@param vitesse la vitesse de déplacement du languolier 
	*tableau le tableau dans lequel est placé le languolier
	*/
var Languolier = function(vitesse, tableau) {
	Personnage.call(this, vitesse, 0, 0, tableau);
	this.score=0;
	this.chemin = Array(2);
	this.chemin[0] = Array();
	this.chemin[1] = Array();
	this.faitChemin = false;
}

Languolier.prototype = new Personnage();
Languolier.prototype.constructor = Languolier;
/**Accesseurs**/
	/**
	*Accesseur au score de l'ennemi
	*@return - le score de l'ennemi
	*/
Languolier.prototype.getScore = function() {
	return this.score;
}

/** Modificateurs**/


	/**
	*Modificateur du score de l'ennemi
	*@param score nouvelle valeur du score de l'ennemi
	*/
Languolier.prototype.setScore = function(score) {
	this.score=score;
}

	/**
	*Méthode permettant d'enrengistrer le chemin du languolier
	*/
Languolier.prototype.ajoutCaseChemin = function(){
	this.chemin[0].push(this.getX());
	this.chemin[1].push(this.getY());
}

	/**
	*Méthode permettant de remettre a zéro le chemin du languolier
	*/
Languolier.prototype.resetChemin = function() {
	for(var i = 0 ; i < this.chemin[0].length ; i++) {
		this.chemin[0].shift();
		this.chemin[1].shift();
	}
}

	/**
	*Modificateur de la position X du languolier
	*@param x la nouvelle valeur de X du languolier
	*/
Languolier.prototype.setX = function(x) {
	if(x >= 0 && x < this.tableau.getLargeur() && this.tableau.etats[x][this.getY()] != 2) {
		this.x = x;
		return true;
	}
	return false;
}

	/**
	*Modificateur de la position Y du languolier
	*@param y la nouvelle valeur de Y du languolier
	*/
Languolier.prototype.setY = function(y) {
	if(y >= 0 && y < this.tableau.getHauteur() && this.tableau.etats[this.getX()][y] != 2) {
		this.y = y;
		return true;
	}
	return false;
}

	/**
	*Modificateur de la position du languolier
	*@param x,y la nouvelle position du languolier
	*/
Languolier.prototype.setPosition = function(x, y) {
	if(x >= 0 && x < this.tableau.getLargeur() && y >= 0 && y < this.tableau.getHauteur()) {
		this.x = x;
		this.y = y;
		return true;
	}
	return false;
}
	/**
	*Méthode permettant de verifier si le deplacement du languolier est possible
	*et de savoir si le languolier passe d'une case "manger" à "vide"
	*@param i la direction dans lequel le langolier cherche à se deplacer
	*/
Languolier.prototype.bouger = function(i) { 
	switch(i) {
	case 1:
		var x = this.getX();
		var y = this.getY()-1;
	break;

	case 2:
		var x = this.getX()+1;
		var y = this.getY();
	break;
	
	case 3:
		var x = this.getX();
		var y = this.getY()+1;
	break;
	
	case 4:
		var x = this.getX()-1;
		var y = this.getY();
	break;
	}	
	if(x >= 0 && x < this.tableau.getLargeur() && y >= 0 && y < this.tableau.getHauteur() && this.tableau.etats[x][y] != 2) {
		this.setPosition(x, y);
		
		if(this.tableau.etats[this.getY()][this.getX()] == 1 && this.tableau.etats[y][x] == 0)
			this.faitChemin = true; 
		else if(this.tableau.etats[this.getY()][this.getX()] == 2 && this.tableau.etats[y][x])
			this.faitChemin = false;
	}
}
