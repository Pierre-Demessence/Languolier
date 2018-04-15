<?php
include_once("../recup_params.php");
$_SESSION['idPage'] = (isset($_GET['page']) && is_numeric($_GET['page'])) ? htmlentities($_GET['page']) : 0;
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Languolier</title>
		<!--<link rel="stylesheet" href="style.css" />-->
		<style type="text/css">

			body {

				background : <?php echo $params['couleur de fond']; ?>
			}

			.languolier {
				background-color: <?php echo $params['couleur du languolier']; ?>
			}

			.humain {
				background-color: <?php echo $params['couleur des ennemis']; ?>
			}

			.plein {
				background-color: <?php echo $params['couleur de remplissage']; ?>
			}

			.vide {
				background-color: <?php echo $params['couleur de vide']; ?>
			}

			.encours {
				background-color: <?php echo $params['couleur de encours']; ?>
			}

			.infection {
				background-color: <?php echo $params['couleur de infection']; ?>
			}
			</style>
   	 </head>

    <body onload="lancerPartie()">
    
	    <div style="float:left;" id="languolier"></div>
	    
	    <div style="float:left;padding-left:5px;" id="infos">
	    <table>
	    <tr><td>Niveau : </td><td><span id="languolier_niveau"></span></td></tr>
	    <tr><td>Score : </td><td><span id="languolier_score"></span></td></tr>
	    <tr><td></td><td></td></tr>
	    <tr><td>Pourcentage : </td><td><span id="languolier_pourcentage"></span></td></tr>
	    <tr><td>Objectif : </td><td><span id="languolier_objectif"></span></td></tr>
	    <tr><td>Cases restantes : </td><td><span id="languolier_casesObjectifs"></span></td></tr>
	    </table>
	    </div>
	    
		<center style="clear:both;"><hr><input type="button" value="Jouer" onclick="lancerPartie();"></center>
		
    </body>
    
    <script src="Personnage.js"></script>
	<script src="Languolier.js"></script>
	<script src="Humain.js"></script>
	<script src="Tableau.js"></script>
	<script src="TableauLanguolier.js"></script>
	
	<script>
		var monQix;
		var monPerso;
		function lancerPartie() {
			if(monQix && monPerso) {
				monQix.destruct();
				monPerso.destruct();
			}
			// Paramètres : Largeur, Hauteur, Taille Bordures, Marge Cases, Id du DIV.
			monQix = new TableauLanguolier(10, 10, 4, 7, "languolier", 30);
			// Paramètres : Vitesse Depart, Reference Tableau.
			monPerso = new Languolier(1, monQix);
			monQix.init(monPerso);
		}
	</script>
	
</html>
