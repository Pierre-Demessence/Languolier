	/**
	*Constructeur du tableauLanguolier
	*@param largeur, hauteur les dimensions du tableau 
	*epaisseurBordures l'épaisseur des bordures du tableau
	*margeInterieure la taille des marges interieures du tableau
	*periode la durée des periodes du tableau
	*/

var TableauLanguolier = function(largeur, hauteur, epaisseurBordures, margeInterieure, id, periode) {
	Tableau.call(this, largeur, hauteur, id, epaisseurBordures, margeInterieure, periode);
	
	this.niveau = 1;
	this.objectif = 50;
	this.languolier = null;
	this.ennemis = Array();
	this.timeout = null;
	this.interval = null;
	this.touche = 0;
	this.tour = 0;
	this.initialisationTableaux();
	
}
TableauLanguolier.prototype = new Tableau();
TableauLanguolier.prototype.constructor = TableauLanguolier;

/** Accesseur **/

	/**
	*Accesseur à la position des ennemis
	*@return - les positions des ennemis
	*/
TableauLanguolier.prototype.getEnnemi = function(x, y) {
	for(i in this.ennemis) {
		if (this.ennemis[i].getX() == x && this.ennemis[i].getY() == y) {
			return this.ennemis[i];
		}
	}
	return false;
}
	/**
	*Méthode permettant d'initiliser le tableau
	*/
TableauLanguolier.prototype.initialisationTableaux = function() {
	this.etats = null;
	
	this.etats = new Array(this.largeur);
	for(var i=0 ; i<this.hauteur ; i++)
		this.etats[i]= new Array();
	
	for(var i = 0 ; i < this.largeur ; i++) {
		for(var j = 0; j < this.hauteur ; j++) {
			if(i == 0 || j == 0 || j == this.largeur-1 || i == this.hauteur-1)
				this.etats[i][j] = 1;
			else
				this.etats[i][j] = 0;
		}
	}
	this.classes = new Array();
	for(x=0 ; x<this.getLargeur(); x++)
		this.classes[x] = new Array();
	return true;
}

	/**
	*Méthode permettant de crée le niveau suivant et de le lancer
	*/
TableauLanguolier.prototype.rejouer = function() {
	this.languolier.resetChemin();
	this.largeur += (this.largeur<25) ? 5 : 0;
	this.hauteur += (this.hauteur<25) ? 5 : 0;
	this.initialisationTableaux();
	this.tour=0;
	this.timeout = null;
	this.interval = null;
	this.touche = 0;
	
	
	this.positionnerLanguolier();
	
	
	this.detecterTouches();
	
	this.supprimerEnnemis();
	

	this.niveau++;
	this.objectif += (this.objectif<95) ? 5 : 0;
	this.dessinerObjets();
	
	for(var i=1 ; i<=this.niveau ; i++) {
		this.ajouterEnnemi();
	}
	
	this.jouer();
}


	/**
	*Méthode permettant d'ajouter un ennemi sur le tableau
	*@param vitesse la vitesse de l'ennemi
	*/
TableauLanguolier.prototype.ajouterEnnemi = function(vitesse) {
	do {
		var x = Math.floor((Math.random()*this.getLargeur()));
		var y = Math.floor((Math.random()*this.getHauteur()));
	} while (this.classes[y][x]!="vide");
	var v = (vitesse) ? Math.max(1, 11-vitesse) : 11-Math.min(Math.max(random(this.niveau-2, this.niveau+1), 1), 10);
	this.ennemis.push(new Humain(v, x, y, this));
	this.setClass(x, y, "nourriture");
}

	/**
	*Méthode permettant de supprimer un ennemi
	*@param x,y la case sur laquelle on désire supprimer un eventuel ennemi
	*/
TableauLanguolier.prototype.supprimerEnnemi = function(x, y) {
	for(i in this.ennemis) {
		if (this.ennemis[i].getX() == x && this.ennemis[i].getY() == y) {
			delete this.ennemis[i];
			return true;
		}
	}
	return false;
}

	/**
	*Méthode permettant de supprimer la totalité des ennemis
	*/
TableauLanguolier.prototype.supprimerEnnemis = function() {
	for(i in this.ennemis) 
		delete this.ennemis[i];
}

	/**
	*Méthode permettant d'affecter un languolier au tableau
	*@param languolier le languolier que l'on desire placer
	*/
TableauLanguolier.prototype.setLanguolier = function(languolier) {
	this.languolier = languolier;
}
	/**
	*Méthode permettant d'enrengistrer le chemin effectué par le languolier
	*/
TableauLanguolier.prototype.tracerChemin = function() {
	this.languolier.ajoutCaseChemin();
	this.etats[this.languolier.getX()][this.languolier.getY()] = 2;
}

	/**
	*Méthode permettant de placer aleatoirement le languolier sur l'un des bords 
	*/
TableauLanguolier.prototype.positionnerLanguolier = function() {
	if(Math.floor(Math.random()*2) == 0) {
		this.languolier.setX( (Math.floor(Math.random()*2) ? 0 : this.getLargeur()-1) );
		this.languolier.setY(Math.floor(Math.random()*this.getHauteur()));
	} else {
		this.languolier.setX(Math.floor(Math.random()*this.getHauteur()));
		this.languolier.setY( (Math.floor(Math.random()*2) ? 0 : this.getLargeur()-1) );
	}
}

	/**
	*Méthode permettant de changer l'état des cases "en cours" à "pleine"
	*/
TableauLanguolier.prototype.solidifierChemin = function() {
	for(var i = 0 ; i<this.languolier.chemin[0].length ; i++) {
		this.etats[this.languolier.chemin[0][i]][this.languolier.chemin[1][i]]=1;
		this.remplirZonesLibres(this.languolier.chemin[0][i],this.languolier.chemin[1][i], 0, 1, 3);
	}
}

	/**
	*Méthode permettant d'affecter, de positionner et de dessiner le languolier sur le tableau
	* et d'ajouter des ennemis en fonction du niveau
	*/
TableauLanguolier.prototype.init = function(languolier) {
	this.setLanguolier(languolier);
	this.positionnerLanguolier();
	this.dessinerObjets();
	
	this.detecterTouches();
	this.jouer();
	
	for(var i=1 ; i<=this.niveau ; i++) {
		this.ajouterEnnemi();
	}
}
	/**
	*Méthode permettant de lancer une partie
	*et de dessiner les objets
	*/
TableauLanguolier.prototype.jouer = function() {
	this.tour++;
	this.dessinerObjets();
	this.dessinerTableau(this.id);
	if(this.perdu()) {
		alert("You lost ! Your did "+this.languolier.getScore()+" points.");
		//envoyerScore(this.languolier.getScore());
		return false;
	}
	else if(this.gagne()) {
		alert("You won ! Going to level "+(this.niveau+1)+".");
		this.languolier.setScore(this.languolier.getScore()+this.getPourc()*this.niveau);
		this.rejouer();
		return false;
	}
	
	if(this.tour % this.languolier.getVitesse() == 0)
		this.bouger();
	
	if(this.etats[this.languolier.getX()][this.languolier.getY()]==0)
		this.tracerChemin();
	
	for(i in this.ennemis) {
		if(this.tour % this.ennemis[i].getVitesse() == 0)
			this.ennemis[i].bouger();
	}
	if (this.etats[this.languolier.getX()][this.languolier.getY()]==1) {
		if (this.languolier.chemin[0].length>0) {	
			this.solidifierChemin();
			this.languolier.resetChemin();
		}
	}
	
	this.debug();
	
	var oThis=this;
	this.timeout = setTimeout(function() { oThis.jouer(); }, this.periode);
	this.touche = 0;
}

	/**
	*Méthode permettant de dessiner le tableau et de placer les ennemis et le languolier dans le tableau
	*/
TableauLanguolier.prototype.dessinerObjets = function() {
	this.resetClasses();
	
	for(var i = 0 ; i < this.largeur ; i++) {
		for(var j = 0; j < this.hauteur ; j++) {
			switch(this.etats[i][j]) {
			case 0:
				this.setClass(i, j, "vide");
			break;
			case 1:
				this.setClass(i, j, "plein");
			break;
			case 2:
				this.setClass(i, j, "encours");
			break;
			case 3:
				this.setClass(i, j, "infection");
			break;
			}
		}	
	}
	
	for(i in this.ennemis)
		this.setClass(this.ennemis[i].getX(), this.ennemis[i].getY(), "humain");
	
	this.setClass(this.languolier.getX(), this.languolier.getY(), "languolier");
}

	/**
	*Méthode permettant de remplir la zone libre lors de la fin d'un tracé de chemin
	*/
TableauLanguolier.prototype.remplirZoneLibre = function(x, y, target, remplacement, intermediaire){
	if (this.presenceEnemiZone(x, y, target, intermediaire))
	{
		this.remplirZones(x, y, intermediaire, target);
	}
	this.remplirZones(x, y, intermediaire, remplacement);
}

	/**
	*Méthode permettant de remplir une zone libre si aucun ennemi n'est present
	*/
TableauLanguolier.prototype.remplirZonesLibres = function(x, y, target, remplacement, intermediaire){
	var i = 0;
	this.remplirZoneLibre(x+1, y, target,remplacement, intermediaire);
	this.remplirZoneLibre(x-1, y, target,remplacement, intermediaire);
	this.remplirZoneLibre(x, y-1, target,remplacement, intermediaire);
	if (this.etats[x][y+1]!=remplacement)
		this.remplirZoneLibre(x, y+1, target, remplacement, intermediaire);
}
	/**
	*Méthode permettant de détecter la presence d'un ennemi dans une zone
	*/
TableauLanguolier.prototype.presenceEnemiZone = function(x, y, target, remplacement){
	this.remplirZones(x, y, target, remplacement);
	
	for(i in this.ennemis) {
		if(this.etats[this.ennemis[i].getX()][this.ennemis[i].getY()] == remplacement) {
			return true;
		}
	}
	return false;
}

	/**
	*Méthode permettant de remplir une zone apres le tracé d'un languolier
	*/
TableauLanguolier.prototype.remplirZones = function(x,y,target,remplacement){
	if( x < 0 || x >= this.largeur || y < 0 || y >=this.largeur || this.etats[x][y] != target)
	return null;
	
	this.etats[x][y] = remplacement;
	
	this.remplirZones(x+1, y, target, remplacement);
	this.remplirZones(x-1, y, target, remplacement);
	this.remplirZones(x ,y+1, target, remplacement);
	this.remplirZones(x ,y-1, target, remplacement);
}

	/**
	*Méthode permettant de gerer la perte du jeu
	*@return - true si perdu, false sinon
	*/
TableauLanguolier.prototype.perdu = function() {
	for(i in this.ennemis) {
		if(this.ennemis[i].getX() == this.languolier.getX() && this.ennemis[i].getY() == this.languolier.getY())
			return true;
		if(this.etats[this.ennemis[i].getX()][this.ennemis[i].getY()] == 2)
			return true;
	}
	if(this.languolier.getX() != 0
	&& this.languolier.getX() != this.largeur-1
	&& this.languolier.getY() != 0
	&& this.languolier.getY() != this.hauteur-1
	&& this.etats[this.languolier.getX()+1][this.languolier.getY()] == 2
	&& this.etats[this.languolier.getX()-1][this.languolier.getY()] == 2
	&& this.etats[this.languolier.getX()][this.languolier.getY()+1] == 2
	&& this.etats[this.languolier.getX()][this.languolier.getY()-1] == 2
	)
		return true;
	return false;
}
	/**
	*Méthode permettant de gerer la victoire d'un niveau
	*@return - true si gagné,false sinon
	*/
TableauLanguolier.prototype.gagne = function() {
	if(this.getPourc() >= this.objectif)
		return true;
	return false;
}
	/**
	*Méthode permettant de faire se gerer les deplacement du languolier
	*/
TableauLanguolier.prototype.bouger = function() {
	switch(this.touche)	{
		// Gauche
		case 37:
			this.languolier.bouger(4);
		break;
		
		// Haut
		case 38:
			this.languolier.bouger(1);
		break;
		
		// Droite
		case 39:
			this.languolier.bouger(2);
		break;
		
		// Bas
		case 40:
			this.languolier.bouger(3);
		break;
	}
}
	/**
	*Méthode permettant de detecter les touches appuyées par le joueurs
	*/
TableauLanguolier.prototype.detecterTouches = function() {
	oThis = this;
	document.onkeydown = function(event) {
		var keyCode;
		if(event == null)
			keyCode = window.event.keyCode; 
		else
			keyCode = event.keyCode; 
		oThis.touche = keyCode
	}
}
	/**
	*Méthode retournant le pourcentage du terrain "mangé" par le languolier
	*@return - Le pourcentage de terrain "mangé"
	*/
TableauLanguolier.prototype.getPourc = function() {
	return Math.floor(this.compterCasesOccupees()*100/((this.largeur*this.hauteur - ((this.largeur-1)*2+(this.hauteur-1)*2))-this.ennemis.length));
}
	/**
	*Méthode permettant de debug
	*/
TableauLanguolier.prototype.debug = function() {
	document.getElementById(this.id+"_niveau").innerHTML = this.niveau;
	document.getElementById(this.id+"_score").innerHTML = this.languolier.getScore();
	
	document.getElementById(this.id+"_pourcentage").innerHTML = this.getPourc()+"%";
	document.getElementById(this.id+"_objectif").innerHTML = this.objectif+"%";
	document.getElementById(this.id+"_casesObjectifs").innerHTML = Math.max(0, (Math.ceil(this.objectif/100*(((this.largeur*this.hauteur - ((this.largeur-1)*2+(this.hauteur-1)*2)))-this.ennemis.length)))-this.compterCasesOccupees());
}
	/**
	*Méthode retournant le nombre de cases occupees (mangées)
	*return - le nombre de cases mangées
	*/
TableauLanguolier.prototype.compterCasesOccupees = function() {
	var nb = 0;
	for(var i=1 ; i<this.largeur-1 ; i++) {
		for(var j=1 ; j<this.largeur-1 ; j++) {
			if (this.etats[i][j] == 1)
				nb++;
		}
	}
	return nb;
}
	/**
	*Destructeur du tableau languolier
	*/
TableauLanguolier.prototype.destruct=function() {
	clearInterval(this.interval);
	clearTimeout(this.timeout);
	for(prop in this) {
		this[prop]=null;
	}
}
