/* ◢ DEFINITION DES VARIABLES */

var left_side = document.getElementById('left_side');
var right_side = document.getElementById('right_side');
var top_side = left_side;
var bottom_side = right_side;

var input_mass = document.getElementById('input_mass');
var input_comment_mass = document.getElementById('input_comment_mass');
var input_height = document.getElementById('input_height');
var input_comment_height = document.getElementById('input_comment_height');
var button = document.getElementById("button");
var alert_mass = document.getElementById('alert_mass');
var alert_height = document.getElementById('alert_height');
var mass_el = {'input': input_mass, 'comment': input_comment_mass, 'alert': alert_mass};
var height_el = {'input': input_height, 'comment': input_comment_height, 'alert': alert_height};

var graph = document.getElementById('graph');
var pin = document.getElementById('pin');
var commentaire = document.getElementById('commentaire');

var hardware;
/* ◥ */



/* ◢ CREATION D'UN EVENEMENT POUR LA TOUCHE ENTER */

var enter_press = new CustomEvent('enter_press');

function test_enter(e) {
    /* Déclanche l'événement 'enter press' si 'e.srcElement' est la touche enter
    'e' doit être un KeyboardEvent */
    if (e.code === 'Enter') {
        e.srcElement.dispatchEvent(enter_press);
    }
}
mass_el.input.addEventListener('keydown', test_enter);
height_el.input.addEventListener('keydown', test_enter);

function inputs_add_listener_enter(fct) {
    /* Ajoute l'événement 'enter_press' qui déclenche 'fct' aux 2 inputs
    'fct' doit être une fonction */
    mass_el.input.addEventListener('enter_press', fct);
    height_el.input.addEventListener('enter_press', fct);
}

function inputs_remove_listener_enter(fct) {
    /* Enlève l'événement 'enter_press' des 2 inputs
    'fct' doit être une fonction */
    mass_el.input.removeEventListener('enter_press', fct);
    height_el.input.removeEventListener('enter_press', fct);
}
/* ◥ */



/* ◢RESULTAT */

function form_check() {
    /* Vérifie si le formulaire est correctement rempli */
    function verif(target, min, max) {
        /* Vérifie si la valeur du champs 'target.input' est comprise entre 'min' et 'max' et modifie son affichage en conséquence
        'target' doit être le dictionnaire 'mass_el' ou 'height_el'
        'min' et 'max' doivent être un nombre */
        if (target.input.value === '' || target.input.value < min || target.input.value > max) {
            turn_input_wrong(target);

            return false;
        } else {
            turn_input_correct(target);

            return true;
        }
    }

    var filled_mass = verif(mass_el, 40, 130);
    var filled_height = verif(height_el, 1.5, 2.1);

    /* Met le focus sur le 1er élément incorrecte */
    if (!filled_mass) {
        mass_el.input.focus();
    } else if (!filled_height) {
        height_el.input.focus();
    }

    return filled_mass && filled_height;
}

function calcul() {
    /* Calcul l'IMC */
    let masse = mass_el.input.value;
    let hauteur = height_el.input.value;
    return (Math.round((masse / Math.pow(hauteur)) * 10)) / 10;
}

function place_pin() {
    /* Place le pin sur le graphique */
    let masse = mass_el.input.value;
    let taille = height_el.input.value;

    let x = Math.round((taille * 100 - 150) * 10.75 - 306);
    let y = Math.round((masse - 40) * (-3.73) - 92);
    pin.style.transform = `translateX(${x}px) translateY(${y}px)`;
}

function process() {
    /* Création des résultats */
    if (form_check()) {
        var imc = calcul();
        place_pin();

        if (imc >= 40) {
            commentaire.innerHTML = `Votre IMC est de <b>${Math.round(imc)}<b>, elle correspond à une <b>obésité sévère</b>.
            <br><br>
            Nous vous conseillons de consulter un médecin dans les plus brefs délais si ce n’est pas déjà fait. \
            Si vous tombez malade vous avez de très grandes chances de subir des complications, soyez très vigilant sur votre alimentation et votre activité physique !`;
        } else if (imc >= 35) {
            commentaire.innerHTML = `Votre IMC est de <b>${Math.round(imc)}</b>, elle correspond à une <b>obésité moyenne</b>.
            <br><br>
            Nous vous conseillons de consulter un médecin. \
            Si vous tombez malade vous avez de grandes chances de subir des complications, soyez vigilant sur votre alimentation et votre activité physique.`;
        } else if (imc >= 30) {
            commentaire.innerHTML = `Votre IMC est de <b>${Math.round(imc)}</b>, elle correspond à une <b>faible obésité</b>.
            <br><br>
            Vous avez plus de chances de tomber malade que les autres personnes donc vous devriez faire attention à votre alimentation et votre activité physique.`;
        } else if (imc >= 25) {
            commentaire.innerHTML = `Votre IMC est de <b>${Math.round(imc)}</b>, elle correspond à un <b>surpoids</b>.
            <br><br>
            Nous vous conseillons de faire attention à votre alimentation et votre activité physique même si cela n’est pas impératif.`;
        } else if (imc >= 18.5) {
            commentaire.innerHTML = `Votre IMC est de <b>${Math.round(imc)}</b>, elle correspond à un poids <b>idéal</b>.
            <br><br>
            Tout va bien, rien à signaler.`;
        } else if (imc >= 16.5) {
            commentaire.innerHTML = `Votre IMC est de <b>${Math.round(imc)}</b>, elle correspond à un <b>sous-poids</b>.
            <br><br>
            Vous devriez manger un peu plus, faire une activité physique ou consulter un médecin si cela est dû à une maladie.`;
        } else {
            commentaire.innerHTML = `Votre IMC est de <b>${Math.round(imc)}</b>, elle correspond à une <b>sous nutrition</b>.
            <br><br>
            Il est urgent que vous alliez voir un médecin, votre état est aussi grave que celui d’une personne en obésité sévère !`;
        }
    }
}
/* ◥ */



/* ◢ANIMATIONS ET DIMENSIONS DES SECTIONS + DEMARAGE DE LA PAGE */

function pc_launch() {
    /* Lancement en paysage */
    if (form_check()) {
        process();

        /* Décalage des sections */
        left_side.style.width = '40%';
        right_side.style.width = '60%';
        /* Affichage de l'ombre en décalé pour qu'elle apparaisse en étant immobile */
        setTimeout(() => {
            right_side.style.transition = '0.5s cubic-bezier(0.5, 0, 0.5, 1)';
            left_side.style.boxShadow = 'black -20px 0px 20px';
            right_side.style.boxShadow = 'black 20px 0px 20px';
        }, 500);
        /* Affichage des résultats */
        setTimeout(() => {
            right_side.style.display = 'flex';
        }, 1000);
        setTimeout(() => {
            right_side.style.opacity = 1;
        }, 1020);

        button.removeEventListener('click', pc_launch);
        inputs_remove_listener_enter(pc_launch);
        button.addEventListener('click', process);
        inputs_add_listener_enter(process);
        window.removeEventListener('resize', prepare_before_launch);
        window.addEventListener('resize', update_size);
    }
}

function mobile_launch() {
    /* Lancement en portrait */
    if (form_check()) {
        process();

        /* Décalage des sections */
        top_side.style.height = '40%';
        bottom_side.style.height = '60%';
        /* Affichage de l'ombre en décalé pour qu'elle apparaisse en étant immobile */
        setTimeout(() => {
            bottom_side.style.transition = '0.5s cubic-bezier(0.5, 0, 0.5, 1)';
            top_side.style.boxShadow = 'black 0px -15px 20px';
            bottom_side.style.boxShadow = 'black 0px 15px 20px';
        }, 500);
        /* Affichage des résultats */
        setTimeout(() => {
            bottom_side.style.display = 'flex';
        }, 1000);
        setTimeout(() => {
            bottom_side.style.opacity = 1;
        }, 1020);

        button.removeEventListener('click', mobile_launch);
        inputs_remove_listener_enter(mobile_launch);
        button.addEventListener('click', process);
        inputs_add_listener_enter(process);
        window.removeEventListener('resize', prepare_before_launch);
        window.addEventListener('resize', update_size);
    }
}

function prepare_before_launch() {
    if (window.innerWidth > 1200) {
        /* Détecte un écran large */
        right_side.style.height = '100%';
        hardware = 'pc';

        button.removeEventListener('click', mobile_launch);
        inputs_remove_listener_enter(mobile_launch);
        button.addEventListener('click', pc_launch);
        inputs_add_listener_enter(pc_launch);
    } else {
        /* Détecte un écran mince*/
        bottom_side.style.width = '100%';
        hardware = 'mobile';

        button.removeEventListener('click', pc_launch);
        inputs_remove_listener_enter(pc_launch);
        button.addEventListener('click', mobile_launch);
        inputs_add_listener_enter(mobile_launch);
    }
}

function del_anim() {
    /* Supprime les animations des sections */
    left_side.style.transition = 'none';
    right_side.style.transition = 'none';
}

function pc_resize() {
    /* Arrange les sections pour un affichage en paysage */
    left_side.style.width = '40%';
    right_side.style.width = '60%';
    left_side.style.height = '100%';
    right_side.style.height = '100%';
    left_side.style.boxShadow = 'black -20px 0px 20px';
    right_side.style.boxShadow = 'black 20px 0px 20px';
}

function mobile_resize() {
    /* Arrange les sections pour un affichage en portrait */
    top_side.style.width = '100%';
    bottom_side.style.width = '100%';
    top_side.style.height = '40%';
    bottom_side.style.height = '60%';
    top_side.style.boxShadow = 'black 0px -15px 20px';
    bottom_side.style.boxShadow = 'black 0px 15px 20px';
}

function update_size() {
    /* Réarange les sections pour s'adapter à la fenêtre (ne marche pas si la fenêtre est trop petite)
    Supprime les animations des sections pour éviter un mauvais rendu */
    del_anim();

    if (window.innerWidth > 1200 && hardware !== 'pc') {
        pc_resize();
        hardware = 'pc';
    } else if (window.innerWidth <= 1200 && hardware !== 'mobile') {
        mobile_resize();
        hardware = 'mobile';
    }
}
/* ◥ */


/* ◢ANIMATION DU FORMULAIRE */

function input_selected(comment) {
    /* Modifie l'affiche du 'comment' d'un input comme sélectionné
    'comment' doit être l'objet 'mass_el.comment' ou 'height_el.comment' */
    comment.style.transform = 'translateX(10px) translateY(-48px) scale(0.6)';
    comment.style.color = '#5f6368';
}

function input_selected_red(comment) {
    /* Modifie l'affiche du 'comment' d'un input comme sélectionné avec une mauvaise valeur
    'comment' doit être l'objet 'mass_el.comment' ou 'height_el.comment' */
    comment.style.transform = 'translateX(10px) translateY(-48px) scale(0.6)';
    comment.style.color = 'red';
}

function input_deselected(comment) {
    /* Modifie l'affiche du 'comment' d'un input comme désélectionné
    'comment' doit être l'objet 'mass_el.comment' ou 'height_el.comment' */
    comment.style.transform = 'translateX(6px) translateY(-27px)';
    comment.style.color = '#5f6368';
}

function test_deselection(target) {
    /* Vérifie si le 'target.input' peut être affiché comme désélectionné (si il est vide)
    'target' doit être le dictionnaire 'mass_el' ou 'height_el' */
    if (target.input.value === '') {
        input_deselected(target.comment);
    }
}

function turn_input_wrong(target) {
    /* Modifie le style de 'target.input' pour indiquer que se valeur est incorrecte */
    target.input.style.border = '1px solid red';
    if (target.input === input_mass) {
        target.alert.innerHTML = 'Saisissez une valeur entre 40 et 130';
    } else {
        target.alert.innerHTML = 'Saisissez une valeur 1,50 et 2,10';
    }

    target.input.removeEventListener('focus', function () {
        input_selected(mass_el.comment);
    });
    target.input.addEventListener('focus', function () {
        input_selected_red(target.comment);
    });
}

function turn_input_correct(target) {
    /* Modifie le style de 'target.input' pour indiquer que se valeur est correcte */
    target.input.style.border = '1px solid #BCC0C7';
    target.comment.style.color = '#5f6368';
    target.alert.innerHTML = '';

    target.input.removeEventListener('focus', function () {
        input_selected_red(target.comment);
    });
    target.input.addEventListener('focus', function () {
        input_selected(target.comment);
    });
}
/* ◥ */



/* ◢PROGRAMME PRINCIPAL */

/* Firefox sauvegarde les valeurs rentrées même après avoir recharger la page, il faut donc vérifier que le comment est affiché correctement */
input_selected(height_el.comment);
test_deselection(height_el);
input_selected(mass_el.comment);

mass_el.input.addEventListener('focus', function () {
    input_selected(mass_el.comment);
});
mass_el.input.addEventListener('blur', function () {
    test_deselection(mass_el);
});
height_el.input.addEventListener('focus', function () {
    input_selected(height_el.comment);
});
height_el.input.addEventListener('blur', function () {
    test_deselection(height_el);
});

prepare_before_launch();
window.addEventListener('resize', prepare_before_launch);
/* ◥ */