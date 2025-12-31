// -----------VARIABLES------------

let plankHeight = document.querySelector(".plank-height");
let plankQuantity = document.querySelector(".plank-quantity");
let btn = document.querySelector(".button");
let inputList = document.querySelector(".input-list");
let calcBtn = document.querySelector(".result-button");
let ordered = [];
let listCuts = [];
let detailAll = [0];

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

// -----------FUNCTIONS-DISPLAY------------

function writeResult(event) {
  createList(plankHeight, plankQuantity);
  plankHeight.value = "";
  plankQuantity.value = "";
}

function createList(height, qount) {
  let list = document.createElement("li");
  list.classList = "list-item";

  let paragraphHeight = document.createElement("span");
  paragraphHeight.classList = "detail";
  let paragraphqQantity = document.createElement("span");
  paragraphqQantity.classList = "qount";

  let delButton = document.createElement("button");
  delButton.type = "button";
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

  let paragraphResult = document.querySelector(".result-paragraph");
  paragraphResult.textContent = "";
  paragraphResult.insertAdjacentHTML(
    "beforeend",
    `Вам знадобиться рівного листа -${detailAll.length} шт`
  );
  showDetalsCutting();
}

function showDetalsCutting() {
  let resultList = document.querySelector(".result-details-list");
  resultList.innerHTML = "";

  for (let index = 0; index < listCuts.length; index++) {
    const element = listCuts[index];
    let resultListItem = document.createElement("li");
    let paragraphListCuts = document.createElement("div");
    paragraphListCuts.insertAdjacentHTML("beforeend", `Лист ${index + 1}: `);

    element.forEach((cut) => {
      paragraphListCuts.insertAdjacentHTML("beforeend", `${cut} мм - `);
    });

    let paragraphListRemainder = document.createElement("div");
    paragraphListRemainder.insertAdjacentHTML(
      "beforeend",
      `Залишок: ${1250 - detailAll[index]} мм`
    );

    resultListItem.append(paragraphListCuts);
    resultListItem.append(paragraphListRemainder);
    resultList.append(resultListItem);
  }
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

function createZakaz() {
  let lists = document.querySelectorAll(".list-item");
  lists.forEach((element) => {
    let listsDetail = parseInt(element.querySelector(".detail").textContent);
    let listsQount = parseInt(element.querySelector(".qount").textContent);
    ordered.push(new constrDeteil(listsDetail, listsQount));
  });
  ordered.sort((a, b) => b.cutting - a.cutting);
}

function constrDeteil(cutting, qount) {
  (this.cutting = cutting), (this.qount = qount);
}
