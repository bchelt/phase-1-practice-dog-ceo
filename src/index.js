//console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    const dropdown = document.getElementById('breed-dropdown');
    
    
    fetch(imgUrl)
    .then(res => res.json())
    .then(data => addImg(data.message));

    getBreeds(breedUrl, dropdown.value);

    dropdown.addEventListener('change', (event) => {
        console.log(dropdown.value);
        deleteChildren();
        getBreeds(breedUrl, dropdown.value);
    })

    

    
})

function getBreeds(breedUrl, dropdown) {
    fetch(breedUrl)
    .then(res => res.json())
    .then(data => listBreeds(data.message, dropdown));
}

function addImg(imgArray) {
    const imgContainer = document.getElementById('dog-image-container');
    imgArray.forEach(img => {
        const element = document.createElement('img');
        element.src = img;
        imgContainer.appendChild(element);
    });
}

function listBreeds(breeds, filter) {
    console.log(breeds);
    
    const ul = document.getElementById('dog-breeds');
    for (const breed in breeds) {
        if (breed[0] === filter || filter === '') {
            if (breeds[breed].length > 0) {
                const element = document.createElement('li');
                element.textContent = breed;
                const types = document.createElement('ul');
                for (const type of breeds[breed]) {
                    const name = document.createElement('li');
                    name.textContent = type;
                    types.appendChild(name);
                    addEvents(name);
                }
                element.appendChild(types);
                ul.appendChild(element);
                addEvents(element);
            }
            else {
                const element = document.createElement('li');
                element.textContent = breed;
                ul.appendChild(element);
                addEvents(element);
            }
        }
    }
}

function addEvents(element) {
    element.addEventListener('click', (event) => {
        event.target.style.color = 'red';
        if (event.target.children.length > 0)
            event.target.children[0].style.color = 'black';
    })
}

function deleteChildren() {
    const element = document.getElementById('dog-breeds');
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}