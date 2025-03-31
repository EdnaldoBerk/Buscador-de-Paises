async function loadCountryDetails() {
    const countryCode = localStorage.getItem("selectedCountry");
    if (!countryCode) {
      document.body.innerHTML = "<h2>País não encontrado.</h2>";
      return;
    }
  
    try {
      let response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      let [country] = await response.json();
      
      document.getElementById("name").innerText = country.name.common;
      document.getElementById("officialName").innerText = country.name.official;
      document.getElementById("flag").src = country.flags.png;
      document.getElementById("flag").alt = country.flags.alt || "Bandeira";
      document.getElementById("capital").innerText = country.capital?.[0] || "Desconhecida";
      document.getElementById("language").innerText = Object.values(country.languages || {}).join(", ") || "Desconhecida";
      document.getElementById("currency").innerText = Object.values(country.currencies || {}).map(c => c.name).join(", ") || "Desconhecida";
      document.getElementById("continent").innerText = country.continents?.[0] || "Desconhecido";
      document.getElementById("population").innerText = country.population.toLocaleString("pt-BR");
      document.getElementById("area").innerText = country.area.toLocaleString("pt-BR");
      document.getElementById("mapsLink").href = country.maps.googleMaps;
    } catch (error) {
      console.error("Erro ao carregar detalhes do país:", error);
      document.body.innerHTML = "<h2>Erro ao carregar os dados.</h2>";
    }
  }
  
  function goBack() {
    window.history.back();
  }
  
  loadCountryDetails();

  document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Verifica se há uma configuração salva no localStorage
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        themeToggle.textContent = "😎"; // Ícone de sol para modo claro
    }

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        // Salva a preferência no localStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "😎"; // Muda para modo claro
        } else {
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "😴"; // Muda para modo escuro
        }
    });
});

  