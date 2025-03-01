document.addEventListener('DOMContentLoaded', function() {
    const nombreClienteContainer = document.getElementById('nombreClienteContainer');
    const tipoComentarioRadios = document.querySelectorAll('input[name="tipoComentario"]');

    // Mostrar u ocultar el campo del nombre del cliente según la selección
    tipoComentarioRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'publico') {
                nombreClienteContainer.style.display = 'block';
            } else {
                nombreClienteContainer.style.display = 'none';
            }
        });
    });

    // Manejar el envío del formulario
    document.getElementById('comentarioForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe

        // Obtener el valor del comentario
        const comentarioTexto = document.getElementById('comentario').value;

        // Obtener el tipo de comentario (anónimo o público)
        const tipoComentario = document.querySelector('input[name="tipoComentario"]:checked').value;

        // Obtener el nombre del cliente si es un comentario público
        const nombreCliente = tipoComentario === 'publico' ? document.getElementById('nombreCliente').value : 'Anónimo';

        // Crear un nuevo elemento de comentario
        const nuevoComentario = document.createElement('div');
        nuevoComentario.classList.add('comentario');

        // Agregar la fecha y hora actual
        const fechaHora = new Date().toLocaleString();
        nuevoComentario.innerHTML = `
            <p><strong>${nombreCliente}, ${fechaHora}</strong></p>
            <p class="texto-comentario">${comentarioTexto}</p>
            <button onclick="editarComentario(this)">Editar</button>
            <button onclick="eliminarComentario(this)">Eliminar</button>
        `;

        // Agregar el comentario a la lista
        document.getElementById('comentariosLista').appendChild(nuevoComentario);

        // Limpiar el campo de texto y el nombre del cliente
        document.getElementById('comentario').value = '';
        if (tipoComentario === 'publico') {
            document.getElementById('nombreCliente').value = '';
        }
    });
});

function eliminarComentario(boton) {
    // Eliminar el comentario al que pertenece el botón
    const comentario = boton.parentElement;
    comentario.remove();
}

function editarComentario(boton) {
    // Obtener el comentario que se va a editar
    const comentario = boton.parentElement;
    const textoComentario = comentario.querySelector('.texto-comentario');

    // Crear un campo de texto para editar el comentario
    const inputTexto = document.createElement('textarea');
    inputTexto.value = textoComentario.innerText;
    inputTexto.rows = 4;
    inputTexto.cols = 50;

    // Reemplazar el texto del comentario con el campo de texto
    textoComentario.replaceWith(inputTexto);

    // Cambiar el botón de "Editar" a "Guardar"
    boton.innerText = 'Guardar';
    boton.onclick = function() {
        guardarEdicionComentario(boton, inputTexto);
    };
}

function guardarEdicionComentario(boton, inputTexto) {
    // Obtener el comentario que se está editando
    const comentario = boton.parentElement;

    // Crear un nuevo elemento de texto con el comentario editado
    const nuevoTextoComentario = document.createElement('p');
    nuevoTextoComentario.classList.add('texto-comentario');
    nuevoTextoComentario.innerText = inputTexto.value;

    // Reemplazar el campo de texto con el nuevo texto del comentario
    inputTexto.replaceWith(nuevoTextoComentario);

    // Cambiar el botón de "Guardar" de vuelta a "Editar"
    boton.innerText = 'Editar';
    boton.onclick = function() {
        editarComentario(boton);
    };
}