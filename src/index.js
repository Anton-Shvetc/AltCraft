import "./styles.css";
const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const loader = document.getElementById("loader");
const box = document.getElementById("wrapperTable");

let passengers = [];
let filteredPassengers = [];
let page = 1;
const rowsPerPage = 10;

async function fetchData() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/altkraft/for-applicants/master/frontend/titanic/passengers.json"
    );
    const data = await response.json();
    passengers = data;
    filteredPassengers = passengers;
    renderTableRows();
  } catch (error) {
    console.log("Error fetching passengers:", error);
  }
}

function renderTableRows() {
  const start = (page - 1) * rowsPerPage;
  const end = page * rowsPerPage;
  const rows = filteredPassengers.slice(start, end);

  rows.forEach((passenger) => {
    const row = document.createElement("tr");
    row.innerHTML = `
	      <td>${passenger.id}</td>
      <td>${passenger.name}</td>
      <td>${passenger.gender}</td>
      <td>${Math.round(passenger.age)}</td>
      <td>${passenger.survived ? "Survived" : "Not Survived"}</td>
    `;
    tableBody.appendChild(row);
  });

  loader.classList.add("hidden");
}

function handleSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  filteredPassengers = passengers.filter((passenger) => {
    const lowerCaseName = passenger.name.toLowerCase();
    const lowerCaseGender = passenger.gender.toLowerCase();
    const lowerCaseAge = String(Math.round(passenger.age)).toLowerCase();
    const isSurvival = passenger.survived ? "survived" : "not";


    return (
      lowerCaseName.includes(searchTerm) ||
      lowerCaseGender === searchTerm ||
      lowerCaseAge.includes(searchTerm) ||
      isSurvival.includes(searchTerm)
    );
  });

  page = 1;
  tableBody.innerHTML = "";

  renderTableRows();
}

let isLoading = false;

box.addEventListener("scroll", async () => {
  const { scrollTop, scrollHeight, clientHeight } = box;

  if (
    !isLoading &&
    scrollTop + clientHeight >= scrollHeight - 5 &&
    filteredPassengers.length > page * rowsPerPage
  ) {
    isLoading = true;
    loader.classList.remove("hidden");
    await showLoader(2000);

    page++;

    renderTableRows();
    loader.classList.add("hidden");

    isLoading = false;
  }
});

function showLoader(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

loader.classList.add("hidden");

fetchData().then(() => {
  loader.classList.add("hidden");
  searchInput.addEventListener("input", handleSearch);
});
