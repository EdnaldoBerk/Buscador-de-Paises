let allCountries = [];

async function searchCountries(value) {
  try {
    let reply = await fetch("https://restcountries.com/v3.1/" + value);
    let data = await reply.json();
    allCountries = data;
    renderCountries(allCountries);
  } catch (error) {
    console.error("Erro ao buscar países:", error);
  }
}

function renderCountries(allCountries) {
  const container = document.querySelector(".allCountries");
  container.innerHTML = "";
  document.querySelector("#qt").innerHTML = allCountries.length;

  if (allCountries.length === 0) {
    container.innerHTML = "<p>Nenhum país encontrado.</p>";
    return;
  }

  for (let country of allCountries) {
    let card = document.createElement("div");
    card.classList.add("country");

    card.innerHTML = `
      <img
        width="200"
        src="${country.flags?.png || ''}"
        alt="${country.flags?.alt || 'Bandeira'}"
      />
      <span>${country.name?.common || 'Desconhecido'}</span>
    `;

    container.appendChild(card);
  }
}

function filterCountries(input) {
  searchCountries(input.value);
}

function localSearch(input) {
  const searchedCountries = [];
  const name = input.value.toLowerCase();

  for (let country of allCountries) {
    let c = country.translations?.por?.common?.toLowerCase() || "";
    if (c.includes(name)) {
      searchedCountries.push(country);
    }
  }

  renderCountries(searchedCountries);
}

searchCountries("all");
