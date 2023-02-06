export default class Loader {
    constructor() {
        var loader = document.getElementById("loader");
        
        window.addEventListener("load", function(){
            loader.classList.add("loaded");
            setTimeout(() => {
                loader.style.display="none";
            }, 5000);
        });

        setTimeout(() => {
            loader.classList.add("loaded"); 
        }, 500);
        setTimeout(() => {
            loader.style.display="none";
        }, 9000);

        
    }
}
