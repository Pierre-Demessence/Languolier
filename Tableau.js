/**
 * Classe Tableau permettant de générer un tableau HTML.
 */
var Tableau = function(largeur, hauteur, id, epaisseurBordures, margeInterieure, periode) {
	(largeur) ? this.setLargeur(largeur) : this.largeur = 10;
	(hauteur) ? this.setHauteur(hauteur) : this.hauteur = 10;
	(epaisseurBordures) ? this.setEpaisseurBordures(epaisseurBordures) : this.epaisseurBordures = 4;
	(margeInterieure) ? this.setMargeInterieure(margeInterieure) : this.margeInterieure = 10;
	(periode) ? this.periode = periode : this.periode = 500;
	(id) ? this.setId(id) : this.id = null;
	this.classes = new Array();
	for(x=0 ; x<this.getLargeur(); x++)
		this.classes[x] = new Array();
}

/* ========================= ========================= ========================= *
 * 									Accesseurs									 *
 * ========================= ========================= ========================= */

/**
 * Récupère la largeur du tableau.
 */
Tableau.prototype.getLargeur = function() {
	return this.largeur;
}

/**
 * Récupère la hauteur du tableau.
 */
Tableau.prototype.getHauteur = function() {
	return this.hauteur;
}

/**
 * Récupère l'id dans lequel le tableau va être déssiné.
 */
Tableau.prototype.getId = function() {
	return this.id;
}

/* ========================= ========================= ========================= *
 * 									Modificateurs								 *
 * ========================= ========================= ========================= */

/**
 * Modifie la largeur du tableau.
 */
Tableau.prototype.setLargeur = function(largeur) {
	if(largeur > 3)
	this.largeur = largeur;
	else
		return false;
	return true;
}

/**
 * Modifie la hauteur du tableau.
 */
Tableau.prototype.setHauteur = function(hauteur) {
	if(hauteur > 3)
		this.hauteur = hauteur;
	else
		return false;
	return true;
}

/**
 * Modifie la bordure extérieur du tableau.
 */
Tableau.prototype.setEpaisseurBordures = function(epaisseurBordures) {
	if(epaisseurBordures > 0)
		this.epaisseurBordures = epaisseurBordures;
	else
		return false;
	return true;
}

/**
 * Modifie la marge intérieur du tableau.
 */
Tableau.prototype.setMargeInterieure = function(margeInterieure) {
	if(margeInterieure > 0)
		this.margeInterieure = margeInterieure;
	else
		return false;
	return true;
}

/**
 * Modifie l'id du div dans lequel dessiner le tableau.
 */
Tableau.prototype.setId = function(id) {
	if(typeof(id)=='string')
		this.id = id;
	else
		return false;
	return true;
}

/* ========================= ========================= ========================= *
 * 									Méthodes									 *
 * ========================= ========================= ========================= */

/**
 * Dessine le tableau HTML.
 */
Tableau.prototype.dessinerTableau = function() {
	var conteneur = document.getElementById(this.id);
	conteneur.innerHTML = "";
	
	var tableau = document.createElement("TABLE");
	tableau.setAttribute("border", this.epaisseurBordures);
	tableau.style.borderCollapse="collapse";
	var ligne = document.createElement("TR");

	for(var x = 0 ; x < this.getLargeur() ; x++) {
		var ligne = document.createElement("TR");
		for(var y = 0 ; y < this.getHauteur() ; y++) {
			var box=document.createElement("TD");
			box.appendChild(document.createTextNode(""));
			box.style.padding=this.margeInterieure+"px";
			if (this.classes[x][y])
				box.className=this.classes[x][y];
			ligne.appendChild(box);
		}
		tableau.appendChild(ligne);	
	}
	conteneur.appendChild(tableau);
}

/**
 * 
 * @param 
 * @return 
 */
Tableau.prototype.setClass = function(x, y, className) {
	this.classes[y][x]=className;
}

/**
 * Récupère la classe html d'une classe du tableau.
 * @param x La coordonnée X de la case.
 * @param y La coordonnée Y de la case.
 * @return La classe de la case demandée.
 */
Tableau.prototype.getClass = function(x, y) {
	return this.classes[y][x];
}

/**
 * Remet les classes à zéro.
 */
Tableau.prototype.resetClasses = function() {
	for(i=0 ; i<this.getLargeur() ; i++) {
		for(j=0 ; j<this.getHauteur() ; j++) {
			this.classes[i][j]=null;
		}
	}
}

/**
 * Affiche le debug des classes.
 */
Tableau.prototype.debugClasses = function() {
	var txt = '';
	for(i=0 ; i<this.getLargeur() ; i++) {
		for(j=0 ; j<this.getHauteur() ; j++) {
			if(this.classes[i][j])
				txt += this.classes[i][j];
			else
				txt += 'X';
			txt += ' ';
		}
		txt += "\n";
	}
	alert(txt);
}

/**
 * Destructeur
 */
Tableau.prototype.destruct=function() {
	for(prop in this) {
		this[prop]=null;
	}
}

/* ========================= ========================= ========================= *
 * 								Quelques fonctions								 *
 * ========================= ========================= ========================= */

/*
 * Fonction permettant de générer un nombre entre deux nombres.
 */
function random(from, to)
{
    return Math.floor(Math.random()*(to-from+1)+from);
}

/**
 * Fonction qui debug un array en l'affichant proprement dans un alert.
 */
function debugArray(array) {
	var txt = '';
	for(i=0 ; i<array.length ; i++) {
		for(j=0 ; j<array[i].length ; j++) {
			if(array[i][j])
				txt += array[i][j];
			else
				txt += 'X';
			txt += ' ';
		}
		txt += "\n";
	}
	alert(txt);
}

/**
 * Demande un pseudo et envois le score en ajax.
 */
function envoyerScore(score) {
	var verif = false;
	do {
		var pseudo = prompt("Entrez votre pseudo :");
		
		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200)
				verif = xhr.responseText;
		}

		pseudo = encodeURIComponent(pseudo);

		xhr.open('GET', 'score.php?pseudo='+pseudo+'&score='+score);

		xhr.send(null);
		if(verif == false)
			alert("Le pseudo est déjà utilisé.");
	} while(verif == false);
	
	return true;
}