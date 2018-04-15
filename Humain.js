	/**
	*Constructeur par defaut
	*@param vitesse la vitesse de deplacement de l'humain, positionX la position X initiale de l'humain, 		*positionY la position Y initiale de l'humaine et tableau le tableau sur lequel est placé l'humain
	*/
var Humain = function(vitesse, positionX, positionY, tableau) {
	Personnage.call(this, vitesse, positionX, positionY, tableau);
	this.numTour = 0;
	this.direction = 0;
}

Humain.prototype = new Personnage();
Humain.prototype.constructor = Humain;


/** Modificateur **/
	/**
	*Modificateur de la position X de l'humain
	*@param x la nouvelle valeur de x de l'humain 
	*/
Humain.prototype.setX = function(x) {
	if(this.tableau.etats[x][this.getY()] != 1) {
		this.x = x;
		return true;
	}
	return false;
}
	/**
	*Modificateur de la position Y de l'humain
	*@param y la nouvelle valeur de Y de l'humain 
	*/
Humain.prototype.setY = function(y) {
	if(this.tableau.etats[this.getX()][y] != 1) {
		this.y = y;
		return true;
}
	return false;
}

	/**
	*Modificateur de la position de l'humain d'une unité vers le haut
	*/
Humain.prototype.haut = function() {
	return this.setY(this.y-1);
}

	/**
	*Modificateur de la position de l'humain d'une unité vers la droite
	*/
Humain.prototype.droite = function() {
	return this.setX(this.x+1);
}

	/**
	*Modificateur de la position de l'humain d'une unité vers la droite
	*/
Humain.prototype.bas = function() {
	return this.setY(this.y+1);
}

	/**
	*Modificateur de la position de l'humain d'une unité vers la droite
	*/
Humain.prototype.gauche = function() {
	return this.setX(this.x-1);
}
		  
	/** Méthode permettant les mouvement de l'humain
	*/
Humain.prototype.bouger = function() {
	if(this.tableau.etats[this.getX()+1][this.getY()+1] == 1
	&& this.tableau.etats[this.getX()+1][this.getY()-1] == 1
	&& this.tableau.etats[this.getX()-1][this.getY()+1] == 1
	&& this.tableau.etats[this.getX()-1][this.getY()-1] == 1
	) {return false;}
	if(this.numTour == 0) {
		this.numTour = Math.floor((Math.random()*10)+1);
		this.direction = Math.floor((Math.random()*4)+1);
	}
	switch(this.direction) {
	case 1 :
		if(!this.haut())
			this.direction = Math.floor((Math.random()*4)+1);
	break;
	
	case 2 :
		if(!this.droite())
			this.direction = Math.floor((Math.random()*4)+1);
	break;
	
	case 3 :
		if(this.bas())
			this.direction = Math.floor((Math.random()*4)+1);
	break;
	
	case 4 :
		if(!this.gauche())
			this.direction = Math.floor((Math.random()*4)+1);
	break;
	}
	this.numTour--;
}
