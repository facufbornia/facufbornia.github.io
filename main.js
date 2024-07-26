let dialog = document.getElementById("dialog");
let continuar = document.getElementById("continuar");
let backg = document.getElementById("background-dialog");

function modal(){
    window.continuar.addEventListener("click", () =>{
        window.dialog.close()
    });

    window.continuar.addEventListener("click", () =>{
        backg.classList.add("hide");
    });
}; 

modal();