import { EqualStencilFunc } from "three";

export default class Navbar {
    constructor() {
        let nav = document.querySelector('#nav-w');
        let gear = document.querySelector('#gear');
        let info = document.querySelector('#anchor-info');
        let portfolio = document.querySelector('#anchor-portfolio');
        let contact = document.querySelector('#anchor-contact');

        let btnMenu = document.querySelector('.button-menu');

        let btnUp = document.querySelector('#up');
        let btnDown = document.querySelector('#down');

        let btnLobby = document.querySelector('#goAccueil');
        let btnInfo = document.querySelector('#goInfo');
        let btnPortfolio = document.querySelector('#goPortfolio');
        let btnContact = document.querySelector('#goContact');

        let cursor = 1;

        navHeight();
        gearRotate();

        console.log('init Navbar');

        window.addEventListener("resize",() => {navHeight();});
        window.addEventListener("scroll",() => {gearRotate();});

        btnMenu.addEventListener('click', () => {document.body.classList.toggle("menu-open");});

        btnUp.addEventListener('click', () => {
            if(cursor > 0){
                console.log("u");
                scroll(cursor - 1);
                cursor -=1;
            }
        });
        btnDown.addEventListener('click', () => {
            if(cursor < 4){
                console.log("d");
                scroll(cursor + 1);
                cursor +=1;
            }
        });
        
        btnLobby.addEventListener('click', () => {scroll(1);});
        btnInfo.addEventListener('click', () => {scroll(2);});
        btnPortfolio.addEventListener('click', () => {scroll(3);});
        btnContact.addEventListener('click', () => {scroll(4);});

        function navHeight () {
            let navheight = 0;
            if (window.innerWidth < 600) {
                navheight = (window.innerHeight-120) ;
            }
            else {
                navheight = (window.innerHeight-100) ;
            }

            nav.style.height = navheight ;


        } 
        
        function gearRotate() {
            let y = window.scrollY;
            gear.style.transform = 'rotateZ('+0+y/(Math.PI*318.25)*360+'deg)';
        }

        function scroll(scrollTo) {
            setTimeout(() => {
                if(scrollTo == 1){
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    }); 
                } else if (scrollTo == 2) {
                    info.scrollIntoView({
                        behavior: "smooth"
                    });
                    
                } else if (scrollTo == 3) {
                    portfolio.scrollIntoView({
                        behavior: "smooth"
                    });
                } else if (scrollTo == 4) {
                    contact.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            },700);
        }
    }
}
