const things = document.getElementById("things");
const THINGS = "_array_of_things_to_come_";

let data = localStorage.getItem(THINGS);
let thingData = data ? JSON.parse(data) : [];
for (let i = 0; i < thingData.length; i++) {
    let thing = document.createElement('div');
    thing.innerHTML = `
    <p class="thing-p">${thingData[i].input}</p>
    <button class="button-thing" data-add="${thingData[i].id}">+</button>
    <span>${thingData[i].count}</span>
    <button class="button-thing" data-subs="${thingData[i].id}">-</button>
    <button class="remove-thing" data-remove="${thingData[i].id}">remove</button>
    `;
    thing.classList.add("thing");
    things.appendChild(thing);
}

const inputField = document.getElementById("input-thing");
const inputButton = document.getElementById("add-button");
let id = thingData.reduce((max, elem) => max > elem.id ? mx : elem.id, 0) + 1;

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

        localStorage.setItem(THINGS, JSON.stringify(thingData));
    }
});

things.addEventListener("click", event => {
    let parent, child, buttId;

    if (event.target.classList.contains("remove-thing")) {
        buttId = event.path[0].dataset.remove;
        parent = document.querySelector(`[data-remove='${buttId}']`).parentNode.parentNode;
        child = document.querySelector(`[data-remove='${buttId}']`).parentNode;
        parent.removeChild(child);
        thingData = thingData.filter(thg => thg.id != buttId);

        localStorage.setItem(THINGS, JSON.stringify(thingData));
    }
    else if (event.target.classList.contains("button-thing")) {
        let operation = event.path[0].dataset.add ? '+' : '-';

        buttId = operation == '+' ? event.path[0].dataset.add : event.path[0].dataset.subs;
        parent = document.querySelector(`[data-${operation == '+' ? "add" : "subs"}='${buttId}']`).parentNode.parentNode;
        let index = thingData.findIndex(thg => (thg.id == buttId));
        thingData[index].count += operation == '+' ? 1 : -1;

        let span = Array.from(parent.getElementsByTagName("span"));
        span[index].innerText = thingData[index].count;

        localStorage.setItem(THINGS, JSON.stringify(thingData));
    }
});