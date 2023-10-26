const menu = document.querySelector('.hamburguesa' );
const imagenes = document.querySelectorAll('img[data-src]');
const navegacion =document.querySelector('.navegacion');
const btnTodos = document.querySelector('.todos')
const btnEnsalada = document.querySelector('.ensalada')
const btnPasta = document.querySelector('.pasta')
const btnPizza = document.querySelector('.pizza')
const btnPostre = document.querySelector('.postre')
const contenedorPlatillos = document.querySelector('.platillos')
document.addEventListener('DOMContentLoaded',()=>{
    Eventos()
    platillos();
});

const Eventos = ()=>{
    menu.addEventListener('click', abrirMenu);

}
const abrirMenu = () =>{
    navegacion.classList.remove('ocultar');
    botonCerrar();
 
}
const botonCerrar = ()=>{
    const btnCerrar = document.createElement('p');
    const overlay = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length >0) return;
    body.appendChild(overlay)
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');
    navegacion.appendChild(btnCerrar);
    cerrarMenu(btnCerrar,overlay);
}
        ///MOSTRAR IMAGENES POR VISTA//
const observer = new IntersectionObserver((entries , observer)=>{
    entries.forEach(entry=>{

        if(entry.isIntersecting){
            const imagen = entry.target;
            imagen.src = imagen.dataset.src;
            observer.unobserve(imagen);
        }
    });

});


imagenes.forEach(imagen=>{

    observer.observe(imagen);
});

const cerrarMenu = (boton,overlay) =>{
    boton.addEventListener('click',()=>{
       navegacion.classList.add('ocultar');
       overlay.remove();
       boton.remove();
    })
    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');
        boton.remove();
    }
}
                /////    FILTRAR PLATILOS        /////////
const platillos = () =>{
    let platillosArreglo =[];
    const platillos = document.querySelectorAll('.platillo');
    platillos.forEach(platillo => platillosArreglo = [...platillosArreglo,platillo])
    const ensaladas = platillosArreglo.filter(ensalada => ensalada.getAttribute('data-platillo')=='ensalada');
    const pastas = platillosArreglo.filter(pasta => pasta.getAttribute('data-platillo')==='pasta');
    const pizzas = platillosArreglo.filter(pizza => pizza.getAttribute('data-platillo')==='pizza');
    const postres = platillosArreglo.filter(postre => postre.getAttribute('data-platillo')==='postre');
    mostrarPlatillos(ensaladas , pastas, pizzas, postres, platillosArreglo);
}

const mostrarPlatillos =(ensalada, pasta, pizza,postre, todos)=>{
    btnEnsalada.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        ensalada.forEach(ensalada=> contenedorPlatillos.appendChild(ensalada));
    });
    btnPizza.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        pizza.forEach(pizza=> contenedorPlatillos.appendChild(pizza));
    });
    btnPasta.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        pasta.forEach(pasta=> contenedorPlatillos.appendChild(pasta));
    });
    btnPostre.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        postre.forEach(postre=> contenedorPlatillos.appendChild(postre));
    });
    btnTodos.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        todos.forEach(todos=> contenedorPlatillos.appendChild(todos));
    });
  
  
    
}

const limpiarHtml= (contenedor)=>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}