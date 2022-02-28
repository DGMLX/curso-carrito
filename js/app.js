const carrito = document.getElementById("carrito");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
const listaCursos = document.getElementById("lista-cursos");
const contenedorCursos = document.querySelector("#lista-carrito tbody");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    listaCursos.addEventListener("click",seleccionarCurso);
    carrito.addEventListener("click",eliminarCurso);
    vaciarCarritoBtn.addEventListener("click",vaciarCarrito);
}

function seleccionarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains("agregar-carrito")){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerInfoCurso(cursoSeleccionado);
    }
}

function leerInfoCurso(curso){
    const infoCurso = {
        imagen:curso.querySelector("img").src,
        nombre:curso.querySelector("h4").textContent,
        precio:curso.querySelector(".precio span").textContent,
        cantidad:1,
        id:curso.querySelector("a").getAttribute("data-id"),
    }
    
    const existe = articulosCarrito.some(curso=> curso.id === infoCurso.id)
    if(existe){
        const cursos = articulosCarrito.map(curso=>{
            if(curso.id===infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        articulosCarrito = [...cursos];
        })
    }else{
        articulosCarrito = [...articulosCarrito,infoCurso];
    }

    carritoHTML();
}

function carritoHTML(){
    limpiarHTML()
    articulosCarrito.forEach((curso)=>{
        const {imagen,nombre,precio,cantidad,id} = curso
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
        `
        contenedorCursos.appendChild(row);
    })
}

function limpiarHTML(){
    while(contenedorCursos.firstChild){
        contenedorCursos.removeChild(contenedorCursos.firstChild);
    }
}

function eliminarCurso(e){
    e.preventDefault();
    const cursoId = e.target.getAttribute("data-id");
    const cursosFiltrados = articulosCarrito.filter(curso => cursoId !== curso.id);
    articulosCarrito = [...cursosFiltrados];
    carritoHTML();
}

function vaciarCarrito(){
    articulosCarrito = [];
    limpiarHTML();
}