// global variable for the project

let uneCible = document.querySelector('#create');

let démarrer = document.querySelector('#start');

let terrain = document.querySelector('#terrain');

let nbCibles = document.querySelector('#nbtargets');

let cibleRestante = document.querySelector('#remaining');


// variable concernant le fonctionnement des cibles
let cible = document.getElementsByClassName('target on');

let cibleToucher = document.getElementsByClassName('target on hit');

let compteur = [];          // recupere les cibles creer


let compteurCibleToucher = [];      // recupere les cibles toucher

// variable global concernant le timer

let millisecond = document.getElementById('tenth'); 

let second = document.getElementById('seconds');

let minute = document.getElementById('minutes');

let timer = document.querySelector('#chrono');

let seconds =0;

let minutes =0;

// default initial width and heigth for the target
var TARGET_WIDTH = 40;
var TARGET_HEIGHT = 40;

// chrono management
// value of time in tenth of seconds
var time = 0;
// timer variable 
var chronoTimer = null;

// YOUR CODE BELOW

let stopChrono = ()=>{

    millisecond.textContent = 0;
    time = 0;

    second.textContent = 00;
    seconds =0;
    
    minute.textContent = 0;
    minutes =0;
}

let chrono = ()=>{

    chronoTimer  = setInterval(() => {

        millisecond.textContent = time++;

            if(time > 9){ 
                time =0;               
                second.textContent = seconds++;              
            }
            if(seconds  > 60){               
                second.textContent = 00;
                
                minute.textContent = minutes++;                
            }
    }, 100);
}; 


let random = ()=>{              // permet de generer une position aleatoire

    for(let i=0;i<cible.length;i++){
        let Hmax = terrain.clientHeight - TARGET_HEIGHT;
        let Lmax = terrain.clientWidth  - TARGET_WIDTH;

        cible[i].style.top = Math.floor(Math.random()* Hmax) + "px";
        cible[i].style.left = Math.floor(Math.random()* Lmax) + "px";
                
    };

}



let ajoutCibleUnique = ()=>{      //creer UNE div et la fait apparaitre 

    for(let i =0; i<1;i++){
        if(terrain.innerHTML = " "){

        let cibleUnique = document.createElement('div');
        cibleUnique.className = 'target';
        cibleUnique.classList.add('on');
        cibleUnique.style.cursor = 'pointer';
    
        compteur.push(cibleUnique);
        terrain.appendChild(cibleUnique);
        random();

        }
    }
    nbCibles.value = 1;         
};

let ajoutMultiCibles = () =>{
    if(terrain.innerHTML = " "){
        

        for(let j = 0; j<nbCibles.value; j++){

            let createCible = document.createElement('div');
            createCible.className = 'target';
            createCible.classList.add('on');
            createCible.style.cursor = 'pointer';

            compteur.push(createCible);
            terrain.prepend(createCible);
            random();            
        };        
    };
}; 

let toucherCible = () =>{                 

    for(let i=0;i<=compteur.length;i++){ 

        compteur[i].addEventListener('click',()=>{        

            compteur[i].classList.add('hit');              
            
            if(compteur[i].classList == 'target on hit'){     

                setTimeout(() => {
                    compteur[i].remove()                   // supprime la div 
                }, 1000);

                compteurCibleToucher.push(compteur[i]);
                console.log(compteurCibleToucher.length);

                cibleRestante.textContent = nbCibles.value - compteurCibleToucher.length;

                if(compteurCibleToucher.length == nbCibles.value){

                    alert("Vous avez gagné avec un temps de : " + minute.textContent + ' mn ' + ' : '+ second.textContent 
                    + ' s ' + ' : ' + millisecond.textContent + ' ms ' + ' ! ' );
                    clearInterval(chronoTimer);
                }
                
            } 
                
                                                        
        });
            
    };


};



démarrer.addEventListener('click',()=>{ 

    compteur.splice(0); //reset le compteur de cible
    
    stopChrono();                   // reset le timer
    clearInterval(chronoTimer);     //permet d'arreter le timer
    chrono();
    
    ajoutMultiCibles();
    compteurCibleToucher.splice(0);     // reset le Nb de cibletoucher

    cibleRestante.textContent = nbCibles.value;     //reset le compteur de cible
    toucherCible();
}); 
    
uneCible.addEventListener('click',()=>{
    compteur.splice(0);
    cibleRestante.textContent = 1;          // nb de cible restant sera toujorus egal a 1
    ajoutCibleUnique();

    compteurCibleToucher.splice(0);
    toucherCible();
});

