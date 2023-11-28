document.addEventListener('DOMContentLoaded', function () {
    const deviceList = document.getElementById('deviceList');

    // Función para obtener la lista de dispositivos desde el backend
    async function obtenerDispositivos() {
        const response = await fetch('https://8000-aldojesusma-iotdevicesb-3qwmkddg76d.ws-us106.gitpod.io/iot');
        const dispositivos = await response.json();

        // Limpia la lista de dispositivos antes de actualizarla
        deviceList.innerHTML = '';

        // Recorre la lista de dispositivos y los agrega a la lista HTML
        dispositivos.forEach(device => {
            const li = document.createElement('li');
            li.textContent = `ID: ${device.id}, Dispositivo: ${device.device}, Valor: ${device.value}`;
            deviceList.appendChild(li);
        });
    }

    // Llama a la función para obtener dispositivos cuando la página se carga
    obtenerDispositivos();
});
