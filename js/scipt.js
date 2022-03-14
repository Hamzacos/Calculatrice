// var globale 
const memoireELT = document.querySelector("#memoire");
const ecranELT  = document.querySelector("#ecran");

let precedent = 0;
let affichage = "";
let operation = null;
let memoire;

window.onload = () =>{
    let touches = document.querySelectorAll("span");
    for(let touche of touches){
       touche.addEventListener("click",gererTouches);
    }
    document.addEventListener("keydown",gererTouches);
    memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) : 0;
    if(memoire != 0) memoireELT.style.display = "initiale";
}

function gererTouches(event){
    let touche;
    const listeTouches = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", ".", "Enter", "Escape"];
    if(event.type === "keydown"){
        if(listeTouches.includes(event.key)){
            event.preventDefault();
            touche = event.key;
        }
    }else{
        touche = this.innerText;
    } 
    if(parseFloat(touche) >= 0 ){
        affichage = (affichage === "") ? touche.toString() : affichage + touche.toString();
        ecranELT.innerText = affichage; 
    }else{
        switch(touche){
            case "C":
            case "Escape ":
                precedent = 0;
                affichage = "";
                operation = null;
                ecranELT.innerText = 0;
            break;
            case "+/-":
                affichage = affichage*(-1);
                ecranELT.innerText = affichage;
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                precedent = (precedent === 0) ? parseFloat(affichage) :
                calculer(precedent,parseFloat(affichage),operation);
                ecranELT.innerText = precedent;
                operation = touche;
                affichage = "";
                break;
            case "=":
            case "Enter":
                precedent  = (precedent === 0) ? parseFloat(affichage) :
                calculer(precedent,parseFloat(affichage),operation);
                ecranELT.innerText = precedent;
                affichage  = precedent
                precedent  = 0;
                break;
            case "M+":
                localStorage.memoire  = (localStorage.memoire) ?
                 parseFloat(localStorage.memoire) + parseFloat
                 (affichage) : parseFloat(affichage);
                 memoireELT.style.display = "initial";
                break;
            case "MC":
                localStorage.memoire = 0;
                memoireELT.style.display = "none";
                break;
            case "MR":
                memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire):0;
                affichage = memoire;
                ecranELT.innerText = memoire;
                break;
            case ".":
                if(!affichage.includes(".")){
                    affichage = affichage + ".";
                }
            ecranELT.innerText = affichage;
            break;
        }
    }
}
/**
 * Effectue le calcul
 * @param {number} nb1 
 * @param {number} nb2 
 * @param {string}  operation
 * @returns number
 */
function calculer(nb1,nb2,operation){
    nb1 = parseFloat(nb1);
    nb2 = parseFloat(nb2);
    if(operation === "+") return nb1 + nb2;
    if(operation === "-") return nb1 - nb2;
    if(operation === "*") return nb1 * nb2;
    if(operation === "/") return nb1 / nb2;
}