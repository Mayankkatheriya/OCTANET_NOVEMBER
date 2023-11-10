let scoreBoardContainer = document.querySelector(".scoreBoard-container");
let data= [];
if(localStorage.getItem("Tasks")){
    data = JSON.parse(localStorage.getItem('Tasks'));
    data.forEach(ele => {
        let scoreBoardElement = document.createElement("div");
        scoreBoardElement.classList.add("scoreboard");
        scoreBoardElement.innerHTML = `
        <div>
        <p class = "playerName"> ${ele.name}</p>
        <p class="main-time">${ele.time}</p>
        </div>
        <p class="player-task">Task: ${ele.task}</p>
        <div class="scoreboard-btn-container">
            <button>🗑️</button>
        </div>
        `;
        scoreBoardContainer.appendChild(scoreBoardElement);
        activateButton()
    });
}
document.querySelector("form").addEventListener("submit", (e)=>{
    e.preventDefault();
    let firstName = e.target.children[0].value;
    let lastName = e.target.children[1].value;
    let task = e.target.children[2].value;
    let errorMessage = document.querySelector(".errorMessage")
    errorMessage.style.display = "none"
    if(firstName==="" || lastName === "" || task===""){
        errorMessage.style.display = "block"
    }
    else{
        let scoreBoardElement = document.createElement("div");
        scoreBoardElement.classList.add("scoreboard");

        //todo get Date and time
        const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
        let d = new Date();
        function addZero(i) {
            if (i < 10) {i = "0" + i}
            return i;
          }
        let h = addZero(d.getHours());
        let m = addZero(d.getMinutes());
        let s = addZero(d.getSeconds());
        let time = h + ":" + m + ":" + s;

        let mon = month[d.getMonth()];
        let year = d.getFullYear();
        let da = addZero(d.getDate())
        let date = mon + " "+  da + ", " + year;

        scoreBoardElement.innerHTML = `
        <div>
        <p class = "playerName"> ${firstName} ${lastName}</p>
        <p class="main-time">${date}, ${time}</p>
        </div>
        <p class="player-task">Task: ${task}</p>
        <div class="scoreboard-btn-container">
            <button>🗑️</button>
        </div>
        `;
        let obj = {
            name : `${firstName} ${lastName}`,
            time: `${date}, ${time}`,
            task: `${task}`
        }
        data.push(obj);
        localStorage.setItem('Tasks', JSON.stringify(data));

        scoreBoardContainer.appendChild(scoreBoardElement);
        e.target.children[0].value = ""
        e.target.children[1].value = ""
        e.target.children[2].value = ""
        activateButton()
    }
})
//TODO Activate buttons
function activate(e) {
    let btnTarget = e.target.innerText;
    let scores = e.target.parentElement.parentElement.children[2];
    scores.style.transition = "0.5s ease-in-out"
    //! we have to give proper if else if condition otherwise it will give NaN problem
    if (btnTarget === "🗑️") {
        e.target.parentElement.parentElement.remove();
    }
}
//! call back function in click event should be global otherwise it will give error
function activateButton() {
    // This function activates the buttons in each scoreboard element.

    [...document.querySelectorAll(".scoreboard-btn-container")].map(el => {
        el.addEventListener("click", activate);
    });
}
function clearAll() {
    localStorage.clear()
    location.reload()
}