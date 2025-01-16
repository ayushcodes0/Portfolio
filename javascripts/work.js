document.querySelectorAll('.nav-middle .nav-button').forEach((button) => {
    button.addEventListener('click', function (e) {
        e.preventDefault(); 

        const navToggle = document.querySelector('.nav-toggle');
        const targetPage = this.getAttribute('href');

        if (!targetPage) {
            console.error("Target page is undefined or null.");
            return;
        }

        if (this.id === 'info') {
            const infoRect = this.getBoundingClientRect();
            const containerRect = navToggle.offsetParent.getBoundingClientRect();
            navToggle.style.position = "absolute";
            navToggle.style.left = `${infoRect.left - containerRect.left}px`;
            navToggle.style.top = `${infoRect.top - containerRect.top}px`;
        } else if (this.id === 'work') {
            const workRect = this.getBoundingClientRect();
            const containerRect = navToggle.offsetParent.getBoundingClientRect();
            navToggle.style.position = "absolute";
            navToggle.style.left = `${workRect.left - containerRect.left}px`;
            navToggle.style.top = `${workRect.top - containerRect.top}px`;
        }

        setTimeout(() => {
            window.location.href = targetPage;
        }, 600); 
    });
});

window.addEventListener('load', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const currentPage = window.location.pathname;

    const infoButton = document.getElementById('info');
    const workButton = document.getElementById('work');

    if (currentPage.includes('info.html') && infoButton) {
        const infoRect = infoButton.getBoundingClientRect();
        const containerRect = navToggle.offsetParent.getBoundingClientRect();
        navToggle.style.position = "absolute";
        navToggle.style.left = `${infoRect.left - containerRect.left}px`;
        navToggle.style.top = `${infoRect.top - containerRect.top}px`;
    } else if (currentPage.includes('work.html') && workButton) {
        const workRect = workButton.getBoundingClientRect();
        const containerRect = navToggle.offsetParent.getBoundingClientRect();
        navToggle.style.position = "absolute";
        navToggle.style.left = `${workRect.left - containerRect.left}px`;
        navToggle.style.top = `${workRect.top - containerRect.top}px`;
    }
});

const atTheRate = document.getElementById("at-the-rate");
const drawer = document.getElementById("drawer");
const icon = document.getElementById("icon");

var flag = false;

atTheRate.addEventListener("click", function(){
    if(!flag){
        icon.style.transform = "rotate(-360deg)"
        drawer.style.scale = "1";
        drawer.style.display = "flex";
        drawer.style.flexDirection = "column";
        drawer.style.alignItems = "center";
        drawer.style.justifyContent = "space-between";
        icon.className = "fa-solid fa-xmark";
        flag = true;
    }
    else{
        icon.style.transform = "rotate(360deg)"
        drawer.style.scale = "0";
        drawer.style.display = "none";
        icon.className = "fa-solid fa-at";
        flag = false;
    }
})