function index() {
  fetch("./blog.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((post) => {
        const articulos = document.getElementById("articulos");
        const articulo = document.getElementById("plantilla").cloneNode(true);
        articulo.id = "post_" + post.id;
        const titulo = articulo.querySelector("#titulo");
        titulo.innerHTML = post.titulo;
        var enlace = `post.html?${post.id}`;
        articulo.onclick = () => (window.location = enlace);
        const publicacion = articulo.querySelector("#publicacion");
        publicacion.innerHTML = `Publicado por ${post.usuario.nombre
          } el ${new Date(post.modificado).toLocaleDateString()}`;
        if (post.imagen || "" != "") {
          const imagen = articulo.querySelector("#imagen");
          imagen.src = post.imagen;
        }
        const contenido = articulo.querySelector("#contenido");
        contenido.innerHTML = post.contenido;
        articulos.appendChild(articulo);
        articulo.hidden = false;
      });
    });
}

function post() {
  // Nos saltamos la interrogación de los parámetros para quedarnos con el número de la entrada a mostrar
  var entradaBuscada = window.location.search.substring(1);
  fetch("./blog.json")
    .then((response) => response.json())
    .then((data) => {
      var id = data.findIndex((entrada) => entrada.id == entradaBuscada);
      var previo = document.getElementById("previo");
      var siguiente = document.getElementById("siguiente");
      if (id >= 0) {
        var post = data[id];
        // Modificamos el contenido de los elementos HTML para mostrar la información del post
        document.title = post.titulo;
        var descripcion = document.getElementById("descripcion");
        descripcion.innerHTML = post.descripcion;
        var publicacion = document.getElementById("publicacion");
        publicacion.innerHTML = `Publicado por ${post.usuario.nombre
          } el ${new Date(post.modificado).toLocaleDateString()}`;
        if (post.imagen || "" != "") {
          const imagen = document.getElementById("imagen");
          imagen.src = post.imagen;
        }
        var contenido = document.getElementById("contenido");
        contenido.innerHTML = post.contenido;
      }
      if (id > 0) {
        previo.href = `post.html?${data[id - 1].id}`;
        habilitarSigue(previo);
      } else {
        previo.href = `#`;
        deshabilitarSigue(previo);
      }
      if ((id >= 0) & (id < data.length - 1)) {
        siguiente.href = `post.html?${data[id + 1].id}`;
        habilitarSigue(siguiente);
      } else {
        siguiente.href = `#`;
        deshabilitarSigue(siguiente);
      }
    });
}

function deshabilitarSigue(nodo) {
  nodo.classList.remove("seguirEnlace");
  nodo.classList.add("sinEnlace");
}
function habilitarSigue(nodo) {
  nodo.classList.remove("sinEnlace");
  nodo.classList.add("seguirEnlace");
}
