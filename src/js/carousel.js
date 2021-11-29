export default class Navbar {
    constructor() {
        let carousel = document.querySelector('.carouselContainer');
        let nbChild=carousel.getElementsByTagName('LI').length ;

        var pSelected = null;
        console.log(nbChild);
        init();
        

        btnPortfolio1.addEventListener('click', () => {selection(1);});
        // btnPortfolio2.addEventListener('click', () => {selection(2);});
        // btnPortfolio3.addEventListener('click', () => {selection(3);});
        // btnPortfolio4.addEventListener('click', () => {selection(4);});
        btnPortfolio5.addEventListener('click', () => {selection(5);});
        // btnPortfolio6.addEventListener('click', () => {selection(6);});
        // btnPortfolio7.addEventListener('click', () => {selection(7);});
        // btnPortfolio8.addEventListener('click', () => {selection(8);});

        function init() {
            for(let i = 1; i < nbChild + 1 ; i++) {
                let selected = '#choix'+i;
                window['btnPortfolio'+i]=document.querySelector(selected);
            }
        }

        function selection(i) {
            if(pSelected !== i & pSelected !== null){
                selectedPortfolio(pSelected);
            }
            if(pSelected == i ){
                pSelected = null;
            } else {
                pSelected = i;
            }
            selectedPortfolio(i);
        }

        function selectedPortfolio(i) {
            let selected = '#site'+i;
            let element = document.querySelector(selected);
            element.classList.toggle("selected");
        }
    }
}