export default class Navbar {
    constructor() {
        let nav = document.querySelector('#nav-w');
        let btn = document.querySelector('.button-menu');

        navHeight();

        console.log('init Navbar');

        window.addEventListener("resize",() => {navHeight();});

        btn.addEventListener('click', () => {
            document.body.classList.toggle("menu-open");
        });

        function navHeight () {
            let navheight = (window.innerHeight-100) ;
            nav.style.height = navheight ;
        }

        function display () {
            if (nav.style.display == 'none') {
                nav.style.display = 'flex';
            } else {
                nav.style.display = 'none';
            }
        }
        
    }

}
