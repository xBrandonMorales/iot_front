document.addEventListener("DOMContentLoaded", function () {
    // Obtén el parámetro del ID de la URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    // Obtén el formulario y los campos
    const editContactForm = document.getElementById("edit-contact-form");
    const idInput = document.getElementById("id");
    const deviceInput = document.getElementById("device");
    const valueInput = document.getElementById("value");

    // Realiza una solicitud para obtener detalles del dispositivo con el ID proporcionado
    fetch(`https://8000-xbrandonmorales-iotback-9rm8evlawma.ws-us106.gitpod.io/editar/${encodeURIComponent(id)}`)
        .then(response => response.json())
        .then(data => {
            // Llena los campos del formulario con los detalles del dispositivo
            idInput.value = data.id;
            deviceInput.value = data.device;  // Asumiendo que el campo es 'device', ajusta según tu modelo de datos
            valueInput.value = data.value;  // Asumiendo que el campo es 'value', ajusta según tu modelo de datos
        })
        .catch(error => console.error("Error al obtener detalles del dispositivo:", error));
});

function actualizar() {
    // Obtén los nuevos valores de los campos
    const nuevoDevice = document.getElementById("device").value;
    const nuevoValue = document.getElementById("value").value;

    // Obtén el parámetro del ID de la URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    // Realiza una solicitud PUT para actualizar el dispositivo en el backend
    fetch(`https://8000-xbrandonmorales-iotback-9rm8evlawma.ws-us106.gitpod.io/editar/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            device: nuevoDevice,
            value: nuevoValue,
        }),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(`Error al actualizar el dispositivo. Código de estado: ${response.status}. Detalles: ${JSON.stringify(error)}`);
            });
        }
        return response.json();
    })
    .then(data => {
        // Muestra el mensaje de éxito en la página
        const mensajeElemento = document.getElementById("mensaje");
        mensajeElemento.innerHTML = `Dispositivo actualizado con éxito: ${data.id}, ${data.device}, ${data.value}`;

        // Limpia el mensaje de error si estaba presente
        const errorMensajeElemento = document.getElementById("error-mensaje");
        errorMensajeElemento.innerHTML = "";

        // Redirige a la página principal después de una edición exitosa
        window.location.href = "/";
    })
    .catch(error => {
        // Muestra el mensaje de error en la página
        const errorMensajeElemento = document.getElementById("error-mensaje");
        errorMensajeElemento.innerHTML = `Error al actualizar el dispositivo: ${error.message}`;

        // Limpia el mensaje de éxito si estaba presente
        const mensajeElemento = document.getElementById("mensaje");
        mensajeElemento.innerHTML = "";
    });
}
