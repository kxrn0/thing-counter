const inputField = document.getElementById("input-thing");
const inputButton = document.getElementById("add-button");
const things = document.getElementById("things");
let thingCount = [];
let id = 0;

inputButton.addEventListener("click", () => {
    let input = inputField.value;

    if (input) {
        inputField.value = '';
        let thing = document.createElement('div');
        thing.innerHTML = `
        <p class="thing-p">${input}</p>
        <button class="button-thing" data-add="${id}">+</button>
        <span>0</span>
        <button class="button-thing" data-subs="${id}">-</button>
        <button class="remove-thing" data-remove="${id}">remove</button>
        `;
        thing.classList.add("thing");
        things.appendChild(thing);
        thingCount.push(0);
        id++;
    }
});

things.addEventListener("click", event => {
    let child, parent, id;
    if (event.target.classList.contains("remove-thing")) {
        let parent;
        id = event.path[0].dataset.remove;
        parent = document.querySelector(`[data-remove='${id}']`).parentNode.parentNode;
        child = document.querySelector(`[data-remove='${id}']`).parentNode;
        parent.removeChild(child);
    }
    else if (event.target.classList.contains("button-thing")) {
        let operation = event.path[0].dataset.add ? '+' : '-';
        if (operation == '+') {
            id = event.path[0].dataset.add;
            parent = document.querySelector(`[data-add='${id}']`).parentNode.parentNode;
            thingCount[id]++;
        }
        else {
            id = event.path[0].dataset.subs;
            parent = document.querySelector(`[data-subs='${id}']`).parentNode.parentNode;
            thingCount[id]--;
        }
        let span = Array.from(parent.getElementsByTagName("span"));
        span[id].innerText = thingCount[id];
    }
});