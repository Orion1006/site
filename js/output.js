let primarySum = 0;
let setsContainer = $("#menu");
let primarySumElements = document.getElementsByClassName("primarySum");
let totalButton = document.getElementById("openOrderModal");
let responseJSON = [];
let searchBtn = document.getElementById("searchObjects");
let api = "http://exam-2020-1-api.std-900.ist.mospolytech.ru";
let apiPath = "/api/data1";
let recordsArr;
let CafeTable = document.getElementById("rests").getElementsByTagName("tbody");
let CardsMenu = document.getElementsByClassName("card");
let search = document.getElementById("searchCafe");
let sets = [];
let ChoseCafe;

function downloadApi() {
  let url = new URL(apiPath, api);
  Request(url, "GET", function () {
    recordsArr = Array.from(this.response);
    fillSearchForm();
  });
}

function Request(url, method, onloadHandler, params) {
  let xhr = new XMLHttpRequest();
  xhr.onload = onloadHandler;
  xhr.open(method, url);
  xhr.responseType = "json";
  if (params) {
    xhr.send(params);
  } else {
    xhr.send();
  }
}

function PriceList() {
  CafeTable[0].querySelectorAll("tr").forEach(
    (row) =>
      (row.onclick = function () {
        sets = [];
        ChoseCafe = recordsArr.find((item) => item.id == row.id);
        for (let s = 1; s < 11; s++) {
          let cardAmount = CardsMenu[s - 1].querySelector("input");
          sets.push({
            name: "set_" + s,
            price: ChoseCafe["set_" + s],
            amount: parseInt(cardAmount.value),
          });
        }

        if (setsContainer.hasClass("d-none"))
          setsContainer.toggleClass("d-none");
        CardPrice();
        calcPrimary();

        let openModal = document.getElementById("openOrderModal");
        if (openModal.hasAttribute("disabled"))
          openModal.removeAttribute("disabled");
      })
  );
}

function CardPrice() {
  for (let cardID = 0; cardID < CardsMenu.length; cardID++) {
    let cardPrice = CardsMenu[cardID].querySelector(".price");
    cardPrice.innerText = sets[cardID].price + " rub";
  }
}

function recordPath(id) {
  return apiPath + "/" + id;
}



function fillSearchForm() {
  renderRecords(RateFilrer(recordsArr));
  search
    .querySelectorAll("select:not([name='socialPrivileges'])")
    .forEach((element) => {
      let options = recordsArr
        .filter((item) => item.rate != null)
        .map((record) => record[element.name])
        .filter(function (item, pos, arr) {
           return (
            arr.indexOf(item) == pos
          );
        });
      for (option of options) {
        element.innerHTML += "<option>" + option + "</option>";
      }
    });
}

downloadApi();

function searchObjects() {
  let searchOptions = [];
  search.querySelectorAll("select").forEach((select) => {
    let value;
    let selected = select.options[select.selectedIndex];
    if (selected.innerText == "Не выбрано") return;
    if (select.name == "socialPrivileges")
      value = selected.innerText == "Да" ? 1 : 0;
    else value = selected.innerText;
    searchOptions.push({ name: select.name, value: value });
  });
  let recordsRate = recordsArr
    .filter((item) => item.rate != null)
    .sort(function (prev, next) {
      return next.rate - prev.rate;
    });

  for (option of searchOptions) {
    recordsRate = recordsRate.filter((item) => {
      return item[option.name] == option.value;
    });
  }
  renderRecords(recordsRate.slice(0, 20));
  PriceList();
}

searchBtn.onclick = searchObjects;

function CafeFill(record) {
  let row = document.createElement("tr");
  row.id = record.id;
  row.innerHTML =
    "<td>" +
    record.name +
    "</td> <td class=''>" +
    record.typeObject +
    "</td> <td class=''>" +
    record.address +
    "</td>";
  CafeTable[0].appendChild(row);
  PriceList();
}

function renderRecords(records) {
  CafeTable[0].innerHTML = "";
  records.forEach((element) => {
    CafeFill(element);
  });
}
totalButton.onclick = function () {
  document.getElementById("modal_info_name").innerText = ChoseCafe.name;
  document.getElementById("modal_info_admArea").innerText = ChoseCafe.admArea;
  document.getElementById("modal_info_district").innerText = ChoseCafe.district;
  document.getElementById("modal_info_rate").innerText = ChoseCafe.rate;
  let containerModalSets = document.getElementById("modalSets");
  containerModalSets.innerHTML = "";
  for (let i = 0; i < sets.length; i++) {
    if (sets[i].amount != 0)
      containerModalSets.innerHTML +=
        '<div class="row set_modal d-flex flex-column flex-md-row mb-2 py-1"><div class="col d-flex justify-content-center align-items-center"><img src="' +
        CardsMenu[i].querySelector("img").src +
        '" width="60" alt=""/></div><div class="col set_name d-flex justify-content-center align-items-center text-center">' +
        CardsMenu[i].querySelector(".card-title").innerText +
        '</div><div class="col set_amount_price d-flex justify-content-center align-items-center"><span class="set_amount">' +
        sets[i].amount +
        'x</span><span class="set_price">' +
        sets[i].price +
        'rub</span></div><div class="col set_total_price d-flex justify-content-center align-items-center"> ' +
        sets[i].amount * sets[i].price +
        "rub</div></div>";
  }
};
function RateFilrer(arr) {
  return arr
    .filter((item) => item.rate != null)
    .sort(function (prev, next) {
      return next.rate - prev.rate;
    })
    .slice(0, 20);
}

function fillCard(menuCards, cardID) {
  let input = menuCards[cardID].querySelector("input");

  input.onchange = function () {
    if (input.value == "") input.value = 0;
    else {
      input.value = input.value.replace(/\D/g, "");
      if (!Number.isInteger(input.value)) input.value = parseInt(input.value);
    }
    if (isNaN(input.value)) input.value = 0;
    else {
      sets[cardID].amount = parseInt(input.value);
      calcPrimary();
    }
  };
}

for (let cardID = 0; cardID < CardsMenu.length; cardID++) {
  fillCard(CardsMenu, cardID);
}

function calcPrimary() {
  let sum = 0;
  for (item of sets) sum += item.price * item.amount;
  primarySum = sum;
  for (elem of primarySumElements) elem.value = primarySum + " rub";
}


