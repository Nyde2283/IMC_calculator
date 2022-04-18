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

var graph = document.getElementById('graph')
var pin = document.getElementById('pin')
var commentaire = document.getElementById('commentaire')

var hardware;



// ◤CREATION EVENEMENT

    var enter_press = new CustomEvent('enter_press');

    function test_enter(e) {
        if (e.code == 'Enter') {
            e.srcElement.dispatchEvent(enter_press);
        }
    }
    mass_el.input.addEventListener('keydown', test_enter);
    height_el.input.addEventListener('keydown', test_enter);

    function inputs_add_listener_enter(fct) {
        mass_el.input.addEventListener('enter_press', fct);
        height_el.input.addEventListener('enter_press', fct);
    }

    function inputs_remove_listener_enter(fct) {
        mass_el.input.removeEventListener('enter_press', fct);
        height_el.input.removeEventListener('enter_press', fct);
    }
// ◤



function form_check() {
    function verif(target, min, max) {
        // Vérifie si le champs est correctement remplis et le modifie en conséquence
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

    // Met le focus sur le 1er élément incorrecte
    if (!filled_mass) {
        mass_el.input.focus();
    } else if (!filled_height) {
        height_el.input.focus();
    }

    return filled_mass && filled_height;
}



// ◤ANIMATIONS ET DIMENSIONS DES SECTIONS + DEMARAGE DE LA PAGE

    function pc_launch() {
        // Lancement en paysage
        if (form_check()) {
            process()

            left_side.style.width = '40%';
            right_side.style.width = '60%';
            setTimeout(() => {
                right_side.style.transition = '0.5s cubic-bezier(0.5, 0, 0.5, 1)';
                left_side.style.boxShadow = 'black -20px 0px 20px';
                right_side.style.boxShadow = 'black 20px 0px 20px';
            }, 500);
            setTimeout(() => {
                right_side.style.display = 'flex';
            }, 1000);
            setTimeout(() => {
                right_side.style.opacity = 1;
            }, 1020);
            
            button.removeEventListener('click', pc_launch);
            inputs_remove_listener_enter(pc_launch)
            button.addEventListener('click', process)
            inputs_add_listener_enter(process)
            window.addEventListener('resize', update_size);
        }
    }

    function mobile_launch(){
        // Lancement en portrait
        if (form_check()) {
            process()

            top_side.style.height = '40%';
            bottom_side.style.height = '60%';
            setTimeout(() => {
                bottom_side.style.transition = '0.5s cubic-bezier(0.5, 0, 0.5, 1)';
                top_side.style.boxShadow = 'black 0px -15px 20px';
                bottom_side.style.boxShadow = 'black 0px 15px 20px';
            }, 500);
            setTimeout(() => {
                bottom_side.style.display = 'flex';
            }, 1000);
            setTimeout(() => {
                bottom_side.style.opacity = 1;
            }, 1020);
            
            button.removeEventListener('click', mobile_launch);
            inputs_remove_listener_enter(mobile_launch)
            button.addEventListener('click', process)
            inputs_add_listener_enter(process)
            window.addEventListener('resize', update_size);
        }
    }

    function update_size() {
        // Supprime les animations pour éviter un mauvais rendu
        del_anim();

        if (window.innerWidth > 1200 && hardware!='pc') {
            pc_resize();
            hardware = 'pc';
        } else if (window.innerWidth <= 1200 && hardware != 'mobile') {
            mobile_resize();
            hardware = 'mobile';
        }
    }

    function del_anim() {
        left_side.style.transition = 'none';
        right_side.style.transition = 'none';
    }

    function pc_resize() {
        left_side.style.width = '40%';
        right_side.style.width = '60%';
        left_side.style.height = '100%';
        right_side.style.height = '100%';
        left_side.style.boxShadow = 'black -20px 0px 20px';
        right_side.style.boxShadow = 'black 20px 0px 20px';
    }

    function mobile_resize() {
        top_side.style.width = '100%';
        bottom_side.style.width = '100%';
        top_side.style.height = '40%';
        bottom_side.style.height = '60%';
        top_side.style.boxShadow = 'black 0px -15px 20px';
        bottom_side.style.boxShadow = 'black 0px 15px 20px';
    }
// ◣


// ◤ANIMATION DU FORMULAIRE

    function input_selected(comment){
        comment.style.transform = 'translateX(10px) translateY(-48px) scale(0.6)';
        comment.style.color = '#5f6368';
    }

    function input_selected_red(comment) {
        comment.style.transform = 'translateX(10px) translateY(-48px) scale(0.6)';
        comment.style.color = 'red';
    }

    function input_deselected(comment){
        comment.style.transform = 'translateX(6px) translateY(-27px)';
        comment.style.color = '#5f6368';
    }

    function test_deselection(target) {
        if (target.input.value === '') {
            input_deselected(target.comment);
        } else if (target.input.value === '') {
            input_deselected(height_el.comment);
        }
    }

    function turn_input_wrong(target) {
        target.input.style.border = '1px solid red';
        if (target.input == input_mass) {
            target.alert.innerHTML = 'Saisissez une valeur entre 40 et 130'
        } else {
            target.alert.innerHTML = 'Saisissez une valeur 1,50 et 2,10'
        }

        target.input.removeEventListener('focus', function() {  input_selected(mass_el.comment)});
        target.input.addEventListener('focus', function(){  input_selected_red(target.comment)});
    }

    function turn_input_correct(target) {
        target.input.style.border = '1px solid #BCC0C7';
        target.comment.style.color = '#5f6368';
        target.alert.innerHTML = '';

        target.input.removeEventListener('focus', function() {  input_selected_red(target.comment)});
        target.input.addEventListener('focus', function() { input_selected(target.comment)});
    }
    // ◣
    
    
    
    // ◤RESULTAT
    
    function calcul() {
        let masse = mass_el.input.value
        let hauteur = height_el.input.value
        return (Math.round((masse / hauteur**2)*10))/10
    }

    function place_pin() {
        let masse = mass_el.input.value
        let taille = height_el.input.value
        
        let x = Math.round((taille*100 - 150)*10.75 - 306)
        let y = Math.round((masse - 40)*(-3.73) - 92)
        console.log(`x : ${x} | y : ${y}`)
        pin.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }

    function process() {
        if (form_check()) {
            var imc = calcul()
            place_pin()
            
            if (imc >= 40) {
                commentaire.innerHTML = `Votre IMC est de <b>${Math.round(imc)}<b>, elle correspond à une <b>obésité sévère</b>.
                <br><br>
                Nous vous conseillons de consulter un médecin dans les plus brefs délais si ce n’est pas déjà fait. 
                Si vous tombez malade vous avez de très grandes chances de subir des complications, soyez très vigilant sur votre alimentation et votre activité physique !`
            } else if (imc >= 35) {
                commentaire.innerHTML = `Votre IMC est de <b>${Math.round(imc)}</b>, elle correspond à une <b>obésité moyenne</b>.
                <br><br>
                Nous vous conseillons de consulter un médecin. 
                Si vous tombez malade vous avez de grandes chances de subir des complications, soyez vigilant sur votre alimentation et votre activité physique.`
            } else if (imc >= 30) {
                commentaire.innerHTML = `Votre IMC est de <b>${Math.round(imc)}</b>, elle correspond à une <b>faible obésité</b>.
                <br><br>
                Vous avez plus de chances de tomber malade que les autres personnes donc vous devriez faire attention à votre alimentation et votre activité physique.`
            } else if (imc >= 25) {
                commentaire.innerHTML = `Votre IMC est de <b>${Math.round(imc)}</b>, elle correspond à un <b>surpoids</b>.
                <br><br>
                Nous vous conseillons de faire attention à votre alimentation et votre activité physique même si cela n’est pas impératif.`
            } else if (imc >= 18.5) {
                commentaire.innerHTML = `Votre IMC est de <b>${Math.round(imc)}</b>, elle correspond à un poids <b>idéal</b>.
                <br><br>
                Tout va bien, rien à signaler.`
            } else if (imc >= 16.5) {
                commentaire.innerHTML = `Votre IMC est de <b>${Math.round(imc)}</b>, elle correspond à un <b>sous-poids</b>.
                <br><br>
                Vous devriez manger un peu plus, faire une activité physique ou consulter un médecin si cela est dû à une maladie.`
            } else {
                commentaire.innerHTML = `Votre IMC est de <b>${Math.round(imc)}</b>, elle correspond à une <b>sous nutrition</b>.
                <br><br>
                Il est urgent que vous alliez voir un médecin, votre état est aussi grave que celui d’une personne en obésité sévère !`
            }
        }
}
// ◣



// ◤PROGRAMME PRINCIPAL

    if (window.innerWidth > 1200) {
        // Détecte écran large
        right_side.style.height = '100%';
        hardware = 'pc';

        button.addEventListener('click', pc_launch);
        inputs_add_listener_enter(pc_launch)
    } else {
        // Détecte écran mince
        bottom_side.style.width = '100%';
        hardware = 'mobile';

        button.addEventListener('click', mobile_launch);
        console.log('button + mobile')
        inputs_add_listener_enter(mobile_launch)
    }

    input_selected(height_el.comment)
    test_deselection(height_el)
    input_selected(mass_el.comment);
    mass_el.input.addEventListener('focus', function() {input_selected(mass_el.comment)});
    mass_el.input.addEventListener('blur', function() {test_deselection(mass_el)});
    height_el.input.addEventListener('focus', function() {input_selected(height_el.comment)})
    height_el.input.addEventListener('blur', function() {test_deselection(height_el)});
// ◤