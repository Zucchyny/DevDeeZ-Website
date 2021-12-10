export default class Navbar {
    constructor() {
        let nav = document.querySelector('#nav-w');
        let gear = document.querySelector('#gear');
        let info = document.querySelector('#info');
        let portfolio = document.querySelector('#portfolio');

        let btnMenu = document.querySelector('.button-menu');
        let btnLobby = document.querySelector('#toAccueil');
        let btnInfo = document.querySelector('#toInfo');
        let btnPortfolio = document.querySelector('#toPortfolio');

        let headerOffset = 100;


        navHeight();
        gearRotate();

        console.log('init Navbar');

        window.addEventListener("resize",() => {navHeight();});
        window.addEventListener("scroll",() => {gearRotate();});

        btnMenu.addEventListener('click', () => {document.body.classList.toggle("menu-open");});
        
        btnLobby.addEventListener('click', () => {scroll('toLobby');});
        btnInfo.addEventListener('click', () => {scroll('toInfo');});
        btnPortfolio.addEventListener('click', () => {scroll('toPortfolio');});

        function navHeight () {
            let navheight = (window.innerHeight-100) ;
            nav.style.height = navheight ;
        } 
        
        function gearRotate() {
            let y = window.scrollY;
            gear.style.transform = 'rotateZ('+0+y/(Math.PI*318.25)*360+'deg)';
        }

        function scroll(scrollTo) {
            document.body.classList.toggle("menu-open");

            let elementPosition =0;
            let offsetPosition =0;

            
            setTimeout(() => {
                if(scrollTo == 'toLobby'){
                    elementPosition = 0;
                    offsetPosition = elementPosition - headerOffset - 50;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    }); 
                } else if (scrollTo == 'toInfo') {
                    let style= getComputedStyle(info);
                    elementPosition = parseInt(style.top);
                    offsetPosition = elementPosition - headerOffset - 50;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });                 
                } else if (scrollTo == 'toPortfolio') {
                    let style= getComputedStyle(portfolioContainer);
                    elementPosition = parseInt(style.top);
                    offsetPosition = elementPosition - headerOffset - 50;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });  
            }},700);
        }
    }
}
