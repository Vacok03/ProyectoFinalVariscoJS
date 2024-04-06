document.addEventListener("DOMContentLoaded", function() {
    const carritoContainer = document.getElementById("carrito-container");
    if (!carritoContainer) {
        console.error('No se encontró el contenedor del carrito');
    } else {
        console.log('Contenedor del carrito encontrado correctamente');
    }

   
    function mostrarMensaje(mensaje) {
        alert(mensaje);
    }

    
    let carrito = [];

  
    function obtenerNombreArchivo() {
        const ruta = window.location.pathname;
        const partesRuta = ruta.split("/");
        const nombreArchivo = partesRuta[partesRuta.length - 1];
        return nombreArchivo;
    }

    
    function obtenerCategoriaActual() {
        const nombreArchivo = obtenerNombreArchivo();
        switch (nombreArchivo) {
            case "gas.html":
                return "Gas";
            case "agua.html":
                return "Agua";
            case "cloaca.html":
                return "Cloaca";
            default:
                return "";
        }
    }

   
    function actualizarNumeroProductosEnCarrito() {
        const numeroProductosEnCarrito = carrito.length;
     
    }

    
    function actualizarListaProductosCarrito() {
        const carritoContainer = document.getElementById("carrito-container");
        if (!carritoContainer) {
            console.error('No se encontró el contenedor del carrito');
            return;
        }

       
        carritoContainer.innerHTML = '';

        
        const fragmento = document.createDocumentFragment();

        
        carrito.forEach(producto => {
            const li = document.createElement("li");
            li.textContent = producto.titulo;
            fragmento.appendChild(li);
        });

        
        carritoContainer.appendChild(fragmento);
    }

   
    function mostrarProductos(productos) {
        
        const contenedorProductos = document.getElementById("productos");
        if (!contenedorProductos) {
            console.error('No se encontró el contenedor de productos');
            return;
        }

        
        contenedorProductos.innerHTML = '';

        
        productos.forEach((producto, indice) => {
            
            const divProducto = document.createElement("div");
            divProducto.classList.add("product-card");

            
            divProducto.innerHTML = `
                <div class="product-card-thumbnail">
                    <a href="#"><img src="${producto.imagen}" alt="${producto.titulo}"/></a>
                </div>
                <h2 class="product-card-title">${producto.titulo}</h2>
                <span class="product-card-desc">${producto.descripcion}</span>
                <button class="add-to-cart-btn" onclick="agregarAlCarrito(${indice})">Agregar al carrito</button>
            `;

           
            contenedorProductos.appendChild(divProducto);
        });
    }

    
    fetch("../js/productos.json")
        .then(response => response.json())
        .then(data => {
            
            const categoriaActual = obtenerCategoriaActual();
            const productosCategoria = data.filter(producto => producto.categoria.nombre === categoriaActual);
            
            mostrarProductos(productosCategoria);
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });

    
    function agregarAlCarrito(indice) {
        
        const producto = productosCategoria[indice];
        
        carrito.push(producto);
        
        mostrarMensaje("Producto agregado al carrito");
        actualizarNumeroProductosEnCarrito();
        actualizarListaProductosCarrito();
    }
});
