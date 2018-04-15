	/**
	*Constructeur de personnage
	*@param vitesse la vitesse du personnage x,y la position du personnage  
	*tableau le tableau dans lequel le personnage est affiché
	*/
var Personnage = function(vitesse, x, y, tableau) {
	this.vitesse = vitesse;
	this.x = x;
	this.y = y;
	this.tableau=tableau;
}
/** Accesseurs**/
	/**
	*Accesseur à la vitesse du personnage
	*@return - la vitesse du personnage
	*/
Personnage.prototype.getVitesse = function() {
	return this.vitesse;
}

	/**
	*Accesseur à la position X du personnage
	*@return - la position X du personnage
	*/
Personnage.prototype.getX = function() {
	return this.x;
}

	/**
	*Accesseur à la position Y du personnage
	*@return - la position Y du personnage
	*/
Personnage.prototype.getY = function() {
	return this.y; 
}

/** modificateurs**/
	/**
	*Modificateur de la vitesse du personnage
	*@param vitesse la nouvelle vitesse du personnage
	*/
Personnage.prototype.setVitesse = function(vitesse) {
	if(nouvVitesse >= 0) {	
		this.vitesse = vitesse;
		return true;
	}
	return false;
}

	/**
	*Modificateur de la position X du personnage
	*@param x la nouvelle position X du personnage
	*/
Personnage.prototype.setX = function(x) {
	if(x >= 0 && x < this.tableau.getLargeur()) {
		this.x = x;
		return true;
	}
	return false;
}

	/**
	*Modificateur de la position Y du personnage
	*@param y la nouvelle position Y du personnage
	*/
Personnage.prototype.setY = function(y) {
	if(y >= 0 && y < this.tableau.getHauteur()) {
		this.y = y;
		return true;
	}
	return false;
}
   
/** Méthodes de déplacement**/

	/**
	*Modificateur de la position de l'humain d'une unité vers le haut
	*/
Personnage.prototype.haut = function() {
	return this.setY(this.y-1);
}

	/**
	*Modificateur de la position de l'humain d'une unité vers la droite
	*/
Personnage.prototype.droite = function() {
	return this.setX(this.x+1);
}

	/**
	*Modificateur de la position de l'humain d'une unité vers le bas
	*/
Personnage.prototype.bas = function() {
	return this.setY(this.y+1);
}

	/**
	*Modificateur de la position de l'humain d'une unité vers la gauche
	*/
Personnage.prototype.gauche = function() {
	return this.setX(this.x-1);
}
	/**
	*Destucteur du personnage
	*/
Personnage.prototype.destruct=function() {
	for(prop in this) {
		this[prop]=null;
	}
}
