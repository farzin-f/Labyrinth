//Fichier:		labyrinthe.js
//Auteur:	Melodie Diêu Thanh Verroeulst et Farzin Faridfar
//IFT1015 - Travail Pratique #1: Dessiner des labyrinthes



//Fonction iota(n)
function iota(n){
	var tab = Array(n);
	for (var i= 0; i < n; ++i){
		tab[i] = i;
	}
	return tab;
};
/*function tesTiota(){
assert (iota(0) == "");
assert (iota(5) == "0,1,2,3,4");
};
tesTiota();*/


//Fonction contient(tab, x) - V01
function contient(tab, x){
		var cont = false;
    for (var i = 0; i < tab.length; ++i){
		if (x == tab[i]){
			cont = true;
			break;
		}
	}
	return cont;
};
/*function tesTcontient(){
assert (contient([9,2,5], 2) == true);
assert (contient([9,2,5], 4) == false);
assert (contient([], 0) == false);
};
tesTcontient();*/


//Fonction ajouter(tab, x)
function ajouter(tab, x){
	if (contient(tab, x) == false){
		tab.push(x);
	}
	return tab;
};
/*function tesTajouter(){
assert(ajouter([9,2,5], 2) == "9,2,5");
assert(ajouter([9,2,5], 4) == "9,2,5,4");
assert(ajouter([], 0) == "0");
};
tesTajouter();*/


//Fonction retirer(tab, x)
function retirer(tab, x){
	if (contient(tab, x)){
		var tabResult = [];
		for (var i = 0; i < tab.length; ++i){
			if(tab[i] != x){
				tabResult.push(tab[i]);
			}
		}
	}else{
		tabResult = tab;
	}
	return tabResult;
};
/*function tesTretirer(){
assert(retirer([9,2,5], 2) == "9,5");
assert(retirer([9,2,5], 4) == "9,2,5");
assert(retirer([], 0) == "");
};
tesTretirer();*/


//Fonction voisins(x, y, nx, ny)
function voisins(x, y, nx, ny){
	var tabVoisin = [];
	if(y-1 >= 0){
		var voisinN = x + (y-1)*nx;
		tabVoisin.push(voisinN);
	}
    if(y+1 < ny){
		var voisinS = x + (y+1)*nx;
		tabVoisin.push(voisinS);
	}
    if(x-1 >= 0){
		var voisinO = x-1 + y*nx;
		tabVoisin.push(voisinO);
	}
    if(x+1 < nx){
		var voisinE = x+1 + y*nx;
		tabVoisin.push(voisinE);
	}
	return tabVoisin;
};
/*function tesTvoisins(){
assert(voisins(7, 2, 8, 4) == "15,31,22");
assert(voisins(0, 0, 8, 4) == "8,1");
assert(voisins(7, 3, 8, 4) == "23,30");
};
tesTvoisins();*/

//Fonction celltoCoord(n, nx): Cette fonction donne la coordonnée d'une cellule 
//en prenant le numéro de cellule et la largeur de la grille.
function celltoCoord(n, nx){
	
	var a = n % nx;
	var b = Math.floor(n / nx);
	var coord = {x: a, y: b};
	return coord;
};
/*function tesTcelltoCoord(){
	assert(celltoCoord(21, 8).x == "5");
	assert(celltoCoord(21, 8).y == "2");
    assert(celltoCoord(0, 8).x == "0");
	assert(celltoCoord(0, 8).y == "0");
};
tesTcelltoCoord();*/


//Fonction choixRan(tab): On se sert de cette fonction pour lancer les choix aléatoires.
function choixRan(tab){
	var choix = tab[Math.floor(tab.length * Math.random())];
	return choix;
};

//Fonction mursNS(n): Cette fonction retourne les murs du nord et du sud d'une cellule.
function mursNS(coord, nx){
	var murs = [];
	var N = coord.x + coord.y * nx;
    murs.push(N);
	var S = coord.x + (coord.y + 1) * nx;
    murs.push(S);
	
    return murs;
};
/*function mursNSTest(){
	assert(mursNS({x: 0, y: 0}, 8) == "0,8");
	assert(mursNS({x: 4, y: 2}, 8) == "20,28");
};
mursNSTest();*/


//Fonction mursEO(n): Cette fonction retourne les murs de l'est et de l'ouest d'une cellule.
function mursEO(coord, nx){
	
	var murs = [];
	var E = 1 + coord.x + coord.y * (nx + 1);
    murs.push(E);
	var O = coord.x + coord.y * (nx + 1);
    murs.push(O);
	
    return murs;
};
/*function mursEOTest(){
	assert(mursEO({x: 0, y: 0}, 8) == "1,0");
	assert(mursEO({x: 4, y: 2}, 8) == "23,22");
};
mursEOTest();*/

//Fonction mursHdessin(tab, nx, pas): Cette fonction dessine les murs horizontaux.
function mursHdessin(tab, nx, pas){
	for(i = 0; i < tab.length; ++i){
		coord = mursHtoCoord(tab[i], nx);

		pu(); rt(90); fd(coord.x*pas);
		rt(90); fd(coord.y*pas); lt(90);
		pd(); fd(pas); pu();
		bk(pas); rt(90); bk(coord.y*pas);
		lt(90); bk(coord.x*pas); lt(90);
		pd();
	}
};

//Fonction mursVdessin(tab, nx, pas): Cette fonction dessine les murs verticaux
function mursVdessin(tab, nx, pas){
	for(i = 0; i < tab.length; ++i){
		coord = mursVtoCoord(tab[i], nx);
		
		pu(); rt(90); fd(coord.x*pas);
		rt(90); fd(coord.y*pas);
		pd(); fd(pas); pu();
		bk(pas); bk(coord.y*pas);
		lt(90); bk(coord.x*pas); lt(90);
		pd();
	}
};

//Fonction mursHtoCoord(m, nx): Cette fonction donne la coordonnée d'une cellule 
	//en prenant le numéro d'un mur horizontal et la largeur de la grille.
	function mursHtoCoord(mH, nx){
		
		var a = mH % nx;
		var b = Math.floor(mH / nx);
		var coord = {x: a, y: b};
		return coord;
	};
	/*function tesTmursHtoCoord(){						
		assert(tesTmursHtoCoord(21, 8).x == "5");
		assert(tesTmursHtoCoord(21, 8).y == "2");
		assert(tesTmursHtoCoord(0, 8).x == "0");
		assert(tesTmursHtoCoord(0, 8).y == "0");
	};
	tesTmursHtoCoord();*/

	//Fonction mursHtoCoord(m, nx): Cette fonction donne la coordonnée d'une cellule 
	//en prenant le numèro d'un mur vertical et la largeur de la grille.
	function mursVtoCoord(mV, nx){
		
		var a = mV % (nx+1);
		var b = Math.floor(mV / (nx+1));
		var coord = {x: a, y: b};
		return coord;
	};
	/*function tesTmursVtoCoord(){		
		assert(tesTmursVtoCoord(23, 8).x == "5");
		assert(tesTmursVtoCoord(23, 8).y == "2");
		assert(tesTmursVtoCoord(0, 8).x == "0");
		assert(tesTmursVtoCoord(0, 8).y == "0");
	};
	tesTmursVtoCoord();*/

function labyrinthe(nx, ny, pas){
	
	var mursH = iota(nx * (ny+1));
	var mursV = iota((nx+1) * ny);
	var cellTotal = (nx-1) + (ny-1) * nx + 1; 			//Le nombre total des cellules d'une grille.
	var front = iota(cellTotal);
	var cave = [];


	var cell = choixRan(front);							//Choisir la première cellule de la cavité.
	front = retirer(front, cell);
	cave = ajouter(cave, cell);
	var coord = celltoCoord(cell, nx);
	var voisinCave = voisins(coord.x, coord.y, nx, ny);		//Définir les cellule voisines de la cellule 
															//choisie.
	var mursNScave = mursNS(coord, nx);						
	var mursEOcave = mursEO(coord, nx);

	for (var j = 1; j < cellTotal; ++j){				//La boucle finit dès que toutes les cellues du 
														//front entrent dans la cavité.
			
		cell = choixRan(voisinCave);				//Nouvelle cellule choisie de manière aléatoire.
		voisinCave = retirer(voisinCave, cell);
		coord = celltoCoord(cell, nx);
		var nouvVoisin = voisins(coord.x, coord.y, nx, ny);	//On définit les voisins de cette nouvelle 
		                                                    //cellule
		for (i = 0; i < nouvVoisin.length; ++i){			//On ajoute ces voisins aux voisins de la 
															//cavités s'ils ne sont pas déjà membres de 
			if (contient(cave, nouvVoisin[i]) == false){	//de la cavité.
				voisinCave = ajouter(voisinCave, nouvVoisin[i]);
			}
		}
		
		var nouvMursNS = mursNS(coord, nx);			//On obtient les murs N et S de la nouvelle cellule.
		var nouvMursEO = mursEO(coord, nx);			//On obtient les murs E et W de la nouvelle cellule.
		
		//Avec les deux boucles au-dessous, on élimine le mur commun entre la cavité et la nouvelle cellule.
		
		
		for (var i = 0; i < 2; ++i){
			
			/*dans le cas où la nouvelle cellue aura l'intersection avec un mur vertical et un mur horizontal de la cavité, le code exécute l'une des boucle suivant en utilisant un nombre aléatoire (rand) qui détérmine quelle instruction à faire*/
			
			if(contient(mursEOcave, nouvMursEO[i]) && 
			contient(mursNScave, nouvMursNS[i])){			
					
				var rand = Math.random();
				
				if(rand < 0.5){
					
				var murIntH = nouvMursNS[i];				//mur de l'intersection
				mursNScave = retirer(mursNScave, murIntH);	//Retirer murInt des murs de la cavité.
				nouvMursNS = retirer(nouvMursNS, murIntH);	//Retirer murInt des murs de lui-même.
				mursH = retirer(mursH, murIntH);			//Retirer murInt des murs de murs horizontaux	
				
				break;
				
				}else{
				var murIntV = nouvMursEO[i];
				mursEOcave = retirer(mursEOcave, murIntV);	//Retirer murInt des murs de cavité
				nouvMursEO = retirer(nouvMursEO, murIntV);	//Retirer murInt des murs de soimême
				mursV = retirer(mursV, murIntV);			//Retirer murInt des murs de murs verticaux
				
				break;	
				}
			}else if (contient(mursNScave, nouvMursNS[i])){	//Élimination, si le mur est horizontal.
			
				var murIntH = nouvMursNS[i];				//Mur de l'intersection.
				mursNScave = retirer(mursNScave, murIntH);	//Retirer ce mur des murs de la cavité.
				nouvMursNS = retirer(nouvMursNS, murIntH);	//Retirer ce mur des murs de lui-même.
				mursH = retirer(mursH, murIntH);			//Retirer ce mur des murs de murs horizontaux.	
				
				break;
			}else if(contient(mursEOcave, nouvMursEO[i])){ 	//Élimination, si le mur est vertical.
		
				var murIntV = nouvMursEO[i];
				mursEOcave = retirer(mursEOcave, murIntV);	//Retirer ce mur des murs de la cavité.
				nouvMursEO = retirer(nouvMursEO, murIntV);	//Retirer ce mur des murs de lui-même.
				mursV = retirer(mursV, murIntV);			//Retirer ce mur des murs de murs verticaux.
				break;
			}
		}
		
		//Ajouter les autres murs de la nouvelle cellule aux murs de la cavité dépendamment de sa position horizontale ou vertiale.
		
		for (i = 0; i < nouvMursNS.length; ++i){			
			mursNScave.push(nouvMursNS[i]);
		}
			
		for (i = 0; i < nouvMursEO.length; ++i){
			mursEOcave.push(nouvMursEO[i]);
		}

		front = retirer(front, cell);
		cave = ajouter(cave, cell);
	}
	mursH = retirer(mursH, 0);							//Retirer le mur d'entrée du labyrinthe.
	mursH = retirer(mursH, nx*(ny+1)-1);				//Retirer le mur de sortie du labyrinthe.


	//Ici on dessine le labyrinthe à l'aide de la tortue et les murs qu'il reste encore dans les tableaux des mursH et mursV
	pu();lt(90); fd(nx/2*pas); rt(90); fd(ny/2*pas); pd();

	mursHdessin(mursH, nx, pas);
	
	mursVdessin(mursV, nx, pas);
	
	ht();
};

labyrinthe(16,9,20);