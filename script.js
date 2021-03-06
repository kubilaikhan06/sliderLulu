var cpt = 1;
var timerdiapo;
var fermer = document.getElementById("fermer");
var stop = document.getElementById("stop");
var play = document.getElementById("play");
var photo = document.getElementById("photo");
var play_stop = document.getElementById("play_stop");
var bool = true;

//permet de parcourir un répertoire d'images
//toutes les images se nomment "imgxx.jpg"
//la fonction reçoit en paramètres: le répertoire à visiter, le nombre d'images du répertoire, le sens AV ou ARR
function affiche (rep, maxi, sens)
{
    if (sens == "plus")
        { // on va en avant
            if (cpt == maxi) {cpt = 1;}
            else {cpt++;}; // on avance de 1 dans la limite du nb maxi d'images
        }
    else
        { //on va en arrière
            if(cpt==1)
                cpt = maxi;
            else
                cpt--; // on avance de -1 ou on repart au maxi            
        }
    src = rep + "/img" + cpt + ".jpg"; //concaténation de la valeur de la proppriété .src
    return src;
}

 //démarre le diaporama (appel fonctions affiche() et diapo())
function playdiaporama(img, rep, maxi)
{
    //passer de suite à l'image suivante
    photo.src = affiche(rep, maxi, "plus");
    //préparation de l'appel de la fonction par le timer
    var temp = "diapo('" + img + "', '" + rep + "', " + maxi +")";
    timerdiapo = window.setInterval(temp, 1700); //armement du timer    
}

// fonction appelée toutes les secondes pour afficher le diaporama en boucle (appel fonction affiche())
function diapo(img, rep, maxi) 
{
    photo.src = affiche(rep, maxi, "plus");
}

//fonction qui commande démarrage et arrêt du diaporama (appel la fonction playdiaporama())
function playStop()
{
    if (bool==true) //démarrage diapo
        {playdiaporama('photo', 'images', 24);
        fermer.disabled = true;
        play.style.display="none";
        stop.style.display="inline";
        document.getElementById('st1').style.display='none';
        document.getElementById('st2').style.display='block';
        return bool=false;
        }

        else //arrêt diapo
        {clearInterval(timerdiapo);
        fermer.disabled = false;
        play.style.display="inline";
        stop.style.display="none";
        document.getElementById('st1').style.display='block';
        document.getElementById('st2').style.display='none';
        return bool=true;
        };          
}

//démarrage et arrêt diapo avec le bouton play et stop
play_stop.onclick = function(){ playStop();};
//document.querySelectorAll(".activer")[0].onclick = function(){ playStop();};

//démarrage et arret diapo en cliquant sur l'image
photo.onclick = function(){ playStop();};
//démarrage et arret diapo en cliquant n'importe où sur la page
document.querySelector('body').ondblclick = function(){ playStop();};
//démarrage et arret diapo avec appui sur clavier
//document.querySelector('body').onkeypress = function(){playStop();}; 


//passer à l'image précédente avec clic sur bouton prev
document.getElementById("prev").onclick = function(){ photo.src=affiche('images', 24, 'moins');};

//passer à image suivante avec clic sur bouton next
document.getElementById("next").onclick = function(){ photo.src=affiche('images', 24, 'plus');};

//contrôle du diaporama avec clic sur les flèches du clavier et touches Enter/Echap
document.onkeydown = function handleKeyDown(e){
    switch(e.keyCode)
        {
            case 37://flèche gauche==> retour
                photo.src=affiche('images', 24, 'moins');
                break;
            case 39://flèche droite==> avance
                photo.src=affiche('images', 24, 'plus');
                break;
            case 13://touche enter==> play
                playStop();
                break;
            case 27://touche echap==> affiche la page d'animation JQuery
                location.assign('file:///C:/Users/R%C3%A9mi/Desktop/dossiers%20dans%20GIT/animationJquery/index.html');
        };
    //alert(e.keyCode);
};

//ferme la fenêtre avec clic sur bouton
fermer.onclick = function(){window.close();};

//effets sur le bouton fermer fenêtre
fermer.onmouseover = function(){ this.style.backgroundColor = 'red';
                               this.style.cursor = 'pointer';};
fermer.onmouseout = function(){ this.style.backgroundColor = 'transparent';};