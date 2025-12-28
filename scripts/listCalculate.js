// -----------VARIABLES------------

let plankHeight = document.querySelector(".plank-height")
let plankQuantity = document.querySelector(".plank-quantity")
let btn = document.querySelector(".button")
let inputList = document.querySelector(".input-list")
let calcBtn = document.querySelector(".calculate-button")
let ordered = []




// -----------EVENTS-------------

btn.addEventListener("click", writeResult);

inputList.addEventListener("click", function (event) {
    if (event.target.type == "button") {
        event.target.parentElement.remove()
    }
})

calcBtn.addEventListener("click", showResult)
    

// -----------FUNCTIONS-------------

function writeResult(event) {
    createList(plankHeight, plankQuantity)
    plankHeight.value = ""
    plankQuantity.value = ""
    
}

function createList(height, qount) {
    let list = document.createElement("li")
    list.classList = "list-item"

    let paragraphHeight = document.createElement("span")
    paragraphHeight.classList = "detail"
    let paragraphqQantity = document.createElement("span")
    paragraphqQantity.classList = "qount"

    let delButton = document.createElement("button")
    delButton.type = "button"
    delButton.insertAdjacentHTML("beforeend", "Видалити")
   
    paragraphHeight.insertAdjacentHTML("beforeend", height.value + " мм - ")
    paragraphqQantity.insertAdjacentHTML("beforeend", qount.value +" шт")

    list.append(paragraphHeight)
    list.append(paragraphqQantity)
    list.append(delButton)
    inputList.append(list)
}

function showResult() {
    ordered = []
    let detailAll = [0]
    createZakaz()
    ordered.forEach(element => {
         for (let index = 0; index < element.qount; index++) {
            let listNew = true        
            for (let ls = 0; ls < detailAll.length; ls++) {
                if ( detailAll[ls]+element.cutting <= 1250) {
                     detailAll[ls] += element.cutting
                    listNew = false
                    break
                }               
            }
            if (listNew) {
                detailAll.push(element.cutting)               
            }           
        }       
    });
    let paragraphResult = document.querySelector(".paragraph-result")  
    paragraphResult.textContent = ""
    paragraphResult.insertAdjacentHTML("beforeend", `Вам знадобиться рівного листа -${detailAll.length} шт`)
}

function createZakaz() {
    let lists = document.querySelectorAll(".list-item")
    lists.forEach(element => {
        let listsDetail = parseInt(element.querySelector(".detail").textContent)
        let listsQount = parseInt(element.querySelector(".qount").textContent)
        ordered.push(new constrDeteil(listsDetail, listsQount))       
    });
    ordered.sort((a, b) => b.cutting - a.cutting);    
}

function constrDeteil(cutting, qount) {
    this.cutting = cutting,
    this.qount = qount
    
}