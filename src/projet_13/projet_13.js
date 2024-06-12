let dataArray;

async function getUsers() {
  try {
    const response = await fetch(
      "https://randomuser.me/api/?nat=fr&results=50"
    );
    const { results } = await response.json();
    orderList(results);
    dataArray = results;
    createUserList(dataArray);
  } catch (error) {
    console.log(error);
  }
}

getUsers();

function orderList(data) {
  data.sort((a, b) => {
    if (a.name.last < b.name.last) {
      return -1;
    } else if (a.name.last > b.name.last) {
      return 1;
    } else {
      return 0;
    }
  });
}

const tableResults = document.querySelector(".table-results");

function createUserList(array) {
  array.forEach((user) => {
    const listItem = document.createElement("div");
    listItem.classList =
      "table-item flex flex-col items-center space-y-3 py-4 lg:py-2 lg:flex-row lg:space-y-0 justify-between bg-gray-200 lg:even:bg-white p-2 drop-shadow-md lg:drop-shadow-none rounded-md lg:rounded-none";
    listItem.innerHTML = `
      <p class="main-info flex items-center justify-start">
        <img
          src=${user.picture.thumbnail}
          alt="avatar picture" class="rounded-full size-10 mr-2"
        />
        <span>${user.name.last} ${user.name.first}</span>
      </p>
      <p class="email">${user.email}</p>
      <p class="phone">${user.phone}</p>
    `;
    tableResults.appendChild(listItem);
  });
}

const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", filterData);

function filterData(e) {
  tableResults.textContent = "";

  const searchedString = e.target.value.toLowerCase().replace(/\s/g, "");
  const filteredArr = dataArray.filter(userData => searchForOccurences(userData))

  function searchForOccurences(userData){
    const searchTypes = {
      firstname : userData.name.first.toLowerCase(),
      lastname : userData.name.last.toLowerCase(),
      firstAndLast : `${userData.name.first + userData.name.last}`.toLowerCase(),
      LastAndFirst : `${userData.name.last + userData.name.first}`.toLowerCase(),
    }
    for(const prop in searchTypes){
      if(searchTypes[prop].includes(searchedString)){
        return true
      }
    }
  }

  createUserList(filteredArr)
}

