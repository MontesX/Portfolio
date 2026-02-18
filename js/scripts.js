//variables seleccionando los elementos desde index
const toggleTheme = document.getElementById('toggle-theme');
const toggleIcon = document.getElementById('toggle-icon');
const toggleText = document.getElementById('toggle-text');
const toggleHobbies = document.getElementById('toggle-hobbies');

const toggleColors = document.getElementById('toggle-colors');
const buttonMono = document.getElementById('button-mono');
let isMonoActive = false; //variable para revisar si el boton monocromatico esta activo
const flagsElements = document.getElementById('idflags'); 

const rootStyles = document.documentElement.style;

    const textsToChange = document.querySelectorAll("[data-section]");

//-----------------------------------------------------------------------------------------//

//Agregar funcion de boton para cambiar idioma

//crea función para leer los archivos json y convertirlos en objetos para JS 
const changeLanguage = async (language) => {
    const requestJson = await fetch(`./languages/${language}.json`); 
    const texts = await requestJson.json();

    for (const textToChange of textsToChange){
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;

        textToChange.innerHTML = texts[section][value];
    }

}

//asigna la función al click en los botones de banderas mediante la variable asignada al id en el icono
flagsElements.addEventListener('click', (e) =>{
 changeLanguage(e.target.parentElement.dataset.language);
});

//-----------------------------------------------------------------------------------------//

//agregando método para que el botón reconozca el click y actúe como switch 
toggleTheme.addEventListener('click', ()=>{
    document.body.classList.toggle('light') //activa/desactiva el 'light' de la clase body 

     //Busca el archivo sun.svg y lo cambia por moon.svg, así como el texto 
    if (toggleIcon.src.includes('sun.svg')) {
        toggleIcon.src = "assets/icons/moon.svg";
        toggleText.textContent = "Dark Mode";

     //caso contrario mantiene el icono sun.svg y el texto igua
    } else {
        toggleIcon.src = "assets/icons/sun.svg";
        toggleText.textContent = "Light Mode"; 
    }

 //Busca el archivo hobbie.png y lo cambia por hobbieWhite.png, así como el texto 
    if (toggleHobbies.src.includes('hobbieWhite.png')) {
        toggleHobbies.src = "assets/images/hobbie.png";

    } else { //caso contrario mantiene el icono sun.png y el texto igual
        toggleHobbies.src = "assets/images/hobbieWhite.png"; 
    }


    if(isMonoActive == true){
        if(document.body.classList.contains('light')){
        rootStyles.setProperty('--primary-color', 'hsl(0, 0%, 15%)');
    } else {
        rootStyles.setProperty('--primary-color', 'hsl(0, 0%, 89%)');
    }
    } 
});


// Al dar click en los botones con colores primarios, el color primario se asigna al color del botón
toggleColors.addEventListener('click', (e) => {

    //condicional - si el click es cobre botón mono, regresa y no hagas nada en este evento
    if (e.target.classList.contains('colors__item--mono')) {
        return;
    }
    rootStyles.setProperty('--primary-color', e.target.dataset.color);
    isMonoActive = false;
});

//logica para el boton monocromático 
buttonMono.addEventListener('click', (e) =>{
    if(document.body.classList.contains('light')){
        rootStyles.setProperty('--primary-color', 'hsl(0, 0%, 15%)');
    } else {
        rootStyles.setProperty('--primary-color', 'hsl(0, 0%, 89%)');
    }
    isMonoActive = true; 
})
