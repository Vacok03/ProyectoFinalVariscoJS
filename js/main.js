document.addEventListener("DOMContentLoaded", function() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function mostrarMensaje(mensaje, icono) {
        Swal.fire({
            title: mensaje,
            icon: icono || "info",
            showConfirmButton: false,
            timer: 1500
        });
    }

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
        // Actualizar el número de productos en el carrito en la interfaz si es necesario
    }

    function mostrarProductos(productos) {
        const contenedorProductos = document.getElementById("productos");
        if (!contenedorProductos) {
            // La función mostrarProductos solo se ejecutará si estamos en una página que contiene el contenedor de productos.
            return;
        }
        contenedorProductos.innerHTML = '';
        productos.forEach(producto => {
            const divProducto = document.createElement("div");
            divProducto.classList.add("product-card");
            divProducto.innerHTML = `
                <div class="product-card-thumbnail">
                    <a href="#"><img src="${producto.imagen}" alt="${producto.titulo}"/></a>
                </div>
                <h2 class="product-card-title">${producto.titulo}</h2>
                <span class="product-card-desc">${producto.descripcion}</span>
                <button class="add-to-cart-btn" data-id="${producto.id}" data-titulo="${producto.titulo}">Agregar al carrito</button>
            `;
            const botonAgregar = divProducto.querySelector(".add-to-cart-btn");
            botonAgregar.addEventListener("click", () => agregarAlCarrito(producto));
            contenedorProductos.appendChild(divProducto);
        });
    }

    function cargarProductos() {
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
    }

    function agregarAlCarrito(producto) {
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarMensaje("Producto agregado al carrito", "success");
        actualizarNumeroProductosEnCarrito();
        if (window.location.pathname.includes("pedido.html")) {
            actualizarListaProductosCarrito();
        }
    }

    function actualizarListaProductosCarrito() {
        const carritoContainer = document.getElementById("carrito-container");
        if (!carritoContainer) {
            console.error('No se encontró el contenedor del carrito');
            return;
        }
        carritoContainer.innerHTML = '';

        // Creamos un objeto para contar la cantidad de cada producto en el carrito
        const count = {};
        carrito.forEach(producto => {
            count[producto.titulo] = (count[producto.titulo] || 0) + 1;
        });

        // Creamos un array de productos únicos y su cantidad
        const uniqueProductos = [...new Set(carrito.map(producto => producto.titulo))];
        uniqueProductos.forEach(titulo => {
            const cantidad = count[titulo];
            const li = document.createElement("li");
            li.textContent = `${titulo} - Cantidad: ${cantidad}`;
            carritoContainer.appendChild(li);
        });
    }

    cargarProductos();
    if (window.location.pathname.includes("pedido.html")) {
        actualizarListaProductosCarrito();
    }

    // Agregar evento de clic al botón "Hacer Pedido"
    const hacerPedidoBtn = document.getElementById("hacer-pedido-btn");
    if (hacerPedidoBtn) {
        hacerPedidoBtn.addEventListener("click", () => {
            // Mostrar Sweet Alert
            Swal.fire({
                title: 'Pedido Realizado',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });

            // Borrar la lista del carrito en localStorage
            localStorage.removeItem('carrito');

            // Ocultar la lista del carrito
            const carritoContainer = document.getElementById("carrito-container");
            if (carritoContainer) {
                carritoContainer.style.display = "none";
            }
        });
    }
});
