// -----------VARIABLES------------

let plankHeight = document.querySelector(".plank-height");
let plankQuantity = document.querySelector(".plank-quantity");
let btn = document.querySelector(".button");
let inputList = document.querySelector(".input-list");
let calcBtn = document.querySelector(".result-button");
let priceBtn = document.querySelector(".price-button");
let ordered = [];
let listCuts = [];
let detailAll = [0];

let inputPrice = document.querySelector(".price-input-price");
let inputKoef = document.querySelector(".price-input-koef");

// -----------EVENTS-------------
btn.addEventListener("click", writeResult);

plankQuantity.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    writeResult();
  }
});

inputList.addEventListener("click", (event) => {
  if (event.target.type == "button") {
    event.target.parentElement.remove();
  }
});

calcBtn.addEventListener("click", showResult);

priceBtn.addEventListener("click", priceTable);

// -----------FUNCTIONS-DISPLAY------------

function writeResult(event) {
  createList(plankHeight, plankQuantity);
  plankHeight.value = "";
  plankQuantity.value = "";
}

function createList(height, qount) {
  let list = document.createElement("li");
  list.classList = "list-item section-subtitle";

  let paragraphHeight = document.createElement("span");
  paragraphHeight.classList = "detail";
  let paragraphqQantity = document.createElement("span");
  paragraphqQantity.classList = "qount";

  let delButton = document.createElement("button");
  delButton.type = "button";
  delButton.classList = "dashboard-button";
  delButton.insertAdjacentHTML("beforeend", "Видалити");

  paragraphHeight.insertAdjacentHTML("beforeend", height.value + " мм - ");
  paragraphqQantity.insertAdjacentHTML("beforeend", qount.value + " шт");

  list.append(paragraphHeight);
  list.append(paragraphqQantity);
  list.append(delButton);
  inputList.append(list);
}

function showResult() {
  calculateResult();

  let paragraphResult = document.querySelector(".result-value");
  paragraphResult.textContent = "";
  paragraphResult.insertAdjacentHTML("beforeend", `${detailAll.length}`);
  showDetalsCutting();
}

function showDetalsCutting() {
  let resultList = document.querySelector(".result-details-list");
  resultList.innerHTML = "";

  for (let index = 0; index < listCuts.length; index++) {
    const element = listCuts[index];
    let resultListItem = document.createElement("li");
    resultListItem.classList = "result-list-item";
    let paragraphListCuts = document.createElement("div");
    paragraphListCuts.insertAdjacentHTML("beforeend", `Лист ${index + 1}: `);

    element.forEach((cut) => {
      paragraphListCuts.insertAdjacentHTML("beforeend", `${cut} мм - `);
    });

    let paragraphListRemainder = document.createElement("div");
    paragraphListRemainder.classList = "result-list-remainder";
    paragraphListRemainder.insertAdjacentHTML(
      "beforeend",
      `Залишок: ${1250 - detailAll[index]} мм`
    );

    resultListItem.append(paragraphListCuts);
    resultListItem.append(paragraphListRemainder);
    resultList.append(resultListItem);
  }
}

function priceTable() {
  let table = document.querySelector(".price-table");

  let oldRow = document.querySelectorAll(".table-row");
  oldRow.forEach((element) => {
    element.remove();
  });

  let tableSumm = 0;

  ordered.forEach((element) => {
    let row = document.createElement("tr");
    row.classList = "table-row";
    for (const key in element) {
      const dateCell = element[key];
      let cell = document.createElement("td");
      cell.textContent = dateCell;
      row.append(cell);
    }

    let priceOne = document.createElement("td");
    let priceOneValue =
      (inputPrice.value * 2.5 * inputKoef.value) / element.listPies();
    priceOne.insertAdjacentHTML("beforeend", `${priceOneValue.toFixed(2)} грн`);

    let priceAll = document.createElement("td");
    let priceAllValue = priceOneValue * element.qount;
    tableSumm += priceAllValue;
    priceAll.insertAdjacentHTML("beforeend", `${priceAllValue.toFixed(2)} грн`);

    row.append(priceOne);
    row.append(priceAll);

    table.append(row);
  });

  let tableSumCell = document.querySelector(".table-sum");
  tableSumCell.innerHTML = "";
  tableSumCell.insertAdjacentHTML("beforeend", `${tableSumm.toFixed(2)} грн`);
}

// -----------FUNCTIONS-LOGIC------------

function calculateResult() {
  ordered = [];
  listCuts = [];
  detailAll = [0];
  createZakaz();
  ordered.forEach((element) => {
    for (let index = 0; index < element.qount; index++) {
      let listNew = true;
      for (let ls = 0; ls < detailAll.length; ls++) {
        if (listCuts[ls] == undefined) {
          listCuts[ls] = [];
        }
        if (detailAll[ls] + element.cutting <= 1250) {
          detailAll[ls] += element.cutting;
          listCuts[ls].push(element.cutting);
          listNew = false;
          break;
        }
      }
      if (listNew) {
        detailAll.push(element.cutting);
        listCuts.push([element.cutting]);
      }
    }
  });
}

class constrDeteil {
  constructor(cutting, qount) {
    this.name = "Планка спеціальна";
    this.cutting = cutting;
    this.qount = qount;
  }

  listPies() {
    return Math.floor(1250 / this.cutting);
  }
}

function createZakaz() {
  let lists = document.querySelectorAll(".list-item");
  lists.forEach((element) => {
    let listsDetail = parseInt(element.querySelector(".detail").textContent);
    let listsQount = parseInt(element.querySelector(".qount").textContent);
    ordered.push(new constrDeteil(listsDetail, listsQount));
  });
  ordered.sort((a, b) => b.cutting - a.cutting);
}
