export default class Navbar {
    constructor() {
        let carousel = document.querySelector('.carouselContainer');
        let nbChild=carousel.getElementsByTagName('LI').length ;
        let mapElement = document.querySelector('.listMainDevice');
        var pSelected = 1;

        console.log('init Portfolio');     
        init();
        
        btnPortfolio1.addEventListener('click', () => {selection(1);});
        btnPortfolio2.addEventListener('click', () => {selection(2);});
        btnPortfolio3.addEventListener('click', () => {selection(3);});
        btnPortfolio4.addEventListener('click', () => {selection(4);});
        // btnPortfolio5.addEventListener('click', () => {selection(5);});
        // btnPortfolio6.addEventListener('click', () => {selection(6);});
        // btnPortfolio7.addEventListener('click', () => {selection(7);});
        // btnPortfolio8.addEventListener('click', () => {selection(8);});
        
        window.addEventListener("resize", function(e) {
            portfolioHeigh();
        });

        //-----------------------------<     Functions Library     >-------------------------------

        function init() {
            for(let i = 1; i < nbChild + 1 ; i++) {
                let selected = '#choix'+i;
                window['btnPortfolio'+i]=document.querySelector(selected);
            }
            selectedPortfolio(1);
        }

        function selection(i) {
            if(pSelected !== i ){
                selectedPortfolio(pSelected); 
                selectedPortfolio(i);
                pSelected = i;
            } 
        }

        function selectedPortfolio(i) {
            // ---- TOGGLE ON NAVIGATION ----- //
            let selectedNavigation = '#choix'+i;
            let elementNav = document.querySelector(selectedNavigation);
            elementNav.classList.toggle("selected");

            let selectedButton = '#visit'+i;
            let elementButton = document.querySelector(selectedButton);
            elementButton.classList.toggle("selected");


            // ---- TOGGLE ON MAIN DEVICE ----- //
            portfolioHeigh();
            let selectedMainDevice = '#site'+i;
            let elementMain = document.querySelector(selectedMainDevice);
            elementMain.classList.toggle("selected");

            // ---- TOGGLE ON SECONDARY DEVICE ----- //
            let j = i+8;
            let selectedSecondDevice = '#site'+j;
            let elementSecondary = document.querySelector(selectedSecondDevice);
            elementSecondary.classList.toggle("selected");

        }

        function portfolioHeigh(){
            if (window.innerWidth < 800) {
                mapElement.style.height = mapElement.offsetWidth * 1.628;
            }
            else if (window.innerWidth < 1000 && window.innerWidth > 799){
                mapElement.style.height = mapElement.offsetWidth * 1;
            }
            else {
                mapElement.style.height = mapElement.offsetWidth * 0.48;
            }
        }
    }
}