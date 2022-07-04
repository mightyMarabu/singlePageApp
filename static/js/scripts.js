
const bike = document.getElementById('bike');

function jump() {
    if (bike.classList != 'jump') {
        bike.classList.add('jump');
        setTimeout(function () {
            bike.classList.remove('jump');
        }, 400);
    }    
}

document.addEventListener('keydown', function (event) {
    jump();
}

)