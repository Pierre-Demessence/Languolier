<?php
require_once '';  
public function envoyerScore($score,$idPage,$pseudo){
   $req=<<<SQL
    INSERT INTO score 
    values (,$idPage,$score,$pseudo);
SQL;

    Connexion::requete($req);
	return true;
}

public function verifierPseudo($pseudo) {
	$req=<<<SQL
	Select *
	FROM utilisateurs
	where pseudoUtilisateur=$pseudo;
SQL;
	$res=Connexion::requete($req);
	if(mysql_fetch_assoc($res))
		return false;
	return true;
}

if(isset($_GET['score'], $_GET['pseudo'])) {
	if(verifierPseudo($_GET['pseudo'])){
		echo envoyerScore($_GET['score'], $_SESSION['idPage'], $_GET['pseudo']);
	}
	else
		echo false;
}