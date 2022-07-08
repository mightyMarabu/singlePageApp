
const bike = document.getElementById('bike');
const obs = document.getElementById('obs');

//const speed_scale_increase = 0.00001
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")

document.addEventListener("keydown", handleStart, { once: true })

let score
let lastTime

function update(time){
    if (lastTime == 0) {
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }
    const delta = time -lastTime
    updateScore(delta)

    lastTime = time
    window.requestAnimationFrame(update)
}

function updateScore(delta) {
    score += delta * 0.01
    scoreElem.textContent = Math.floor(score)
}


function handleStart() {
    lastTime = null
    score = 0
    startScreenElem.classList.add("hide")
    document.getElementById('obs').style.animation = "block 1s infinite linear"
    window.requestAnimationFrame(update)
  }
// window.requestAnimationFrame(handleStart)

function handleLose() {
    setTimeout(() => {
      document.getElementById('obs').style.animation = "none"
      document.addEventListener("keydown", handleStart, { once: true })
      startScreenElem.classList.remove("hide")
    }, 0)
  }




function jump() {
    if (bike.classList != 'jump') {
        bike.classList.add('jump');
        setTimeout(function () {
            bike.classList.remove('jump');
        }, 400);
    }    
}

let isAlive = setInterval(function () {
    // get positions
    let bikeTop = parseInt(window.getComputedStyle(bike).getPropertyValue("top"));
    let obsLeft = parseInt(window.getComputedStyle(obs).getPropertyValue("left"));
    let highscore = 0
    // detect collision
    if  (obsLeft < 70 && obsLeft > 20 && bikeTop >= 140) {
        handleLose();
        highscore = score
        score = 0
        alert('You crashed!')
        let name = prompt("What's your name, rider?")
        console.log(name)
        console.log(highscore)
        saveStuff(name, highscore)
        location.reload()
    }
    
}, 10)

function saveStuff(paramOne, paramTwo) {
    let url = "/api/addScore/"+paramOne+"/"+paramTwo
        fetch(url)
        .then((response)=>response.json())
        .then((data) =>{
            console.log(data)
          }
        )
    confirm("data saved");
    //location.reload();
    };   

document.addEventListener('keydown', handleStart, {once: true})

document.addEventListener('keydown', function (event) {
    jump();
}

)