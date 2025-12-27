// -----------VARIABLES------------

let plankHeight = document.querySelector(".plank-height")
let plankQuantity = document.querySelector(".plank-quantity")
let btn = document.querySelector(".button")
let inputList = document.querySelector(".input-list")
let calcBtn = document.querySelector(".calculate-button")



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
    delButton.insertAdjacentHTML("beforeend", "DELETE")
   
    paragraphHeight.insertAdjacentHTML("beforeend", height.value + " мм - ")
    paragraphqQantity.insertAdjacentHTML("beforeend", qount.value +" шт")

    list.append(paragraphHeight)
    list.append(paragraphqQantity)
    list.append(delButton)
    inputList.append(list)
}

function showResult() {
    let lists = document.querySelectorAll(".list-item")
    let detailAll = [0]

    lists.forEach(element => {
        let listsDetail = parseInt(element.querySelector(".detail").textContent)
        let listsQount = parseInt(element.querySelector(".qount").textContent)

        for (let index = 0; index < listsQount; index++) {
            let listNew = true
            
            for (let ls = 0; ls < detailAll.length; ls++) {
                if ( detailAll[ls]+listsDetail <= 1250) {
                     detailAll[ls] += listsDetail
                    listNew = false
                    break
                }               
            }

            if (listNew) {
                detailAll.push(listsDetail)               
            }           
        }
        console.log(detailAll);
        
    });
    let paragraphResult = document.createElement("p")   
    paragraphResult.insertAdjacentHTML("beforeend", `Вам знадобиться ріного листа -${detailAll.length} шт`)
    calcBtn.parentElement.append(paragraphResult)
}