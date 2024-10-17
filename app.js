const apiKey = '5c21f251a88542f4ac6145602241710'; // Insira sua chave da API aqui

function getWeather() {
    const city = document.getElementById('city').value;

    // Se a cidade estiver vazia, não faz a requisição
    if (!city) {
        document.getElementById('weatherInfo').innerHTML = 'Por favor, insira o nome de uma cidade.';
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no&lang=pt`;

    fetchWeather(url);
}

function fetchWeather(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('weatherInfo').innerHTML = 'Cidade não encontrada.';
            } else {
                const weatherCondition = data.current.condition.text.toLowerCase(); // Obtém a condição do tempo em minúsculas
                console.log("Condição do tempo:", weatherCondition); // Debugging
                updateBackground(weatherCondition); // Chama a função para atualizar o fundo

                const weather = `
                    <h2>${data.location.name}, ${data.location.country}</h2>
                    <p><img src="${data.current.condition.icon}" alt="${data.current.condition.text}"></p>
                    <p><strong>Temperatura:</strong> ${data.current.temp_c}°C / ${data.current.temp_f}°F</p>
                    <p><strong>Clima:</strong> ${data.current.condition.text}</p>
                    <p><strong>Humidade:</strong> ${data.current.humidity}%</p>
                    <p><strong>Pressão:</strong> ${data.current.pressure_mb} hPa</p>
                    <p><strong>Vento:</strong> ${data.current.wind_kph} km/h</p>
                `;
                document.getElementById('weatherInfo').innerHTML = weather;
            }
        })
        .catch(error => {
            document.getElementById('weatherInfo').innerHTML = 'Ocorreu um erro ao buscar os dados.';
            console.error(error);
        });
}

function updateBackground(condition) {
    let backgroundUrl;

    if (condition.includes('sunny') || condition.includes('clear')) {
        backgroundUrl = 'sol.jpg'; // Adapte o caminho para onde você colocou as imagens
    } else if (condition.includes('rain') || condition.includes('chuva')) {
        backgroundUrl = 'chuva.jpg';
    } else if (condition.includes('cloud') || condition.includes('nublado')) {
        backgroundUrl = 'nublado.jpg';
    } else if (condition.includes('snow') || condition.includes('neve')) {
        backgroundUrl = 'neve.jpg';
    } else {
        backgroundUrl = 'default.jpg'; // Imagem padrão
    }

    console.log("Imagem de fundo:", backgroundUrl); // Debugging
    document.body.style.backgroundImage = `url(${backgroundUrl})`;
}

// Função para obter a localização atual
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no&lang=pt`;
            fetchWeather(url);
        }, () => {
            document.getElementById('weatherInfo').innerHTML = 'Não foi possível obter sua localização.';
        });
    } else {
        document.getElementById('weatherInfo').innerHTML = 'Geolocalização não é suportada por este navegador.';
    }
}
