const inputField = document.getElementById("input-thing");
const inputButton = document.getElementById("add-button");
const things = document.getElementById("things");
let thingData = [];
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
        thingData.push({ input, id, count: 0 });
        id++;
    }
});

things.addEventListener("click", event => {
    let parent, child, id;

    if (event.target.classList.contains("remove-thing")) {
        id = event.path[0].dataset.remove;
        parent = document.querySelector(`[data-remove='${id}']`).parentNode.parentNode;
        child = document.querySelector(`[data-remove='${id}']`).parentNode;
        parent.removeChild(child);
        thingData = thingData.filter(thg => thg.id != id);
    }
    else if (event.target.classList.contains("button-thing")) {
        let operation = event.path[0].dataset.add ? '+' : '-';

        id = operation == '+' ? event.path[0].dataset.add : event.path[0].dataset.subs;
        parent = document.querySelector(`[data-${operation == '+' ? "add" : "subs"}='${id}']`).parentNode.parentNode;
        let index = thingData.findIndex(thg => (thg.id == id));
        thingData[index].count += operation == '+' ? 1 : -1;

        let span = Array.from(parent.getElementsByTagName("span"));
        span[index].innerText = thingData[index].count;
    }
});