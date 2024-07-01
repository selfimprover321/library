document.addEventListener("DOMContentLoaded", () => {
    let myLibrary = [];
    let button = document.querySelector("#add-book");
    let modal = document.querySelector("#modal");
    let submit = document.querySelector("#submit");
    let form = document.querySelector("form");
    let container = document.querySelector('.books-container');
    const toggleSwitch = document.querySelector("#checkbox-input");
    const bookIndexField = document.querySelector("#book-index");
    toggleSwitch.value = "off";

    function Book(title, author, numOfPages, read){
        this.title = title;
        this.author = author;
        this.pages = numOfPages;
        this.read = read;
    }

    function addBookToLibrary(){
        let title = document.querySelector("#title-input").value;
        let author = document.querySelector("#author-input").value;
        let pages = document.querySelector("#pages-input").value;
        let readValue = toggleSwitch.checked ? "Read" : "Unread";
        console.log(title, author, pages, readValue);
        let newBook = new Book(title, author, pages, readValue);
        myLibrary.push(newBook);
        displayBooks();
    }

    function updateBookInLibrary(index){
        let title = document.querySelector("#title-input").value;
        let author = document.querySelector("#author-input").value;
        let pages = document.querySelector("#pages-input").value;
        let readValue = toggleSwitch.checked ? "Read" : "Unread";
        myLibrary[index].title = title;
        myLibrary[index].author = author;
        myLibrary[index].pages = pages;
        myLibrary[index].read = readValue;
        displayBooks();
    }

    toggleSwitch.addEventListener("input", () => {
        toggleSwitch.value = toggleSwitch.checked ? "on" : "off";
    });

    button.addEventListener("click", () => {
        modal.style.display = "block";
        form.reset();
        bookIndexField.value = '';
        toggleSwitch.checked = false;
    });

    submit.addEventListener("click", (submitting) => {
        submitting.preventDefault();
        if (bookIndexField.value === '') {
            addBookToLibrary();
        } else {
            updateBookInLibrary(Number(bookIndexField.value));
        }
        form.reset();
        toggleSwitch.checked = false;
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if(event.target == modal){
            modal.style.display = "none";
            form.reset();
        }
    });

    function displayBooks(){
        container.innerHTML = '';
        myLibrary.forEach((book, index) => {
            const bookElement = document.createElement('div');
            bookElement.classList.add("book");
            bookElement.setAttribute("id", `${index}`);
            bookElement.innerHTML = `
                <h3>Title: ${book.title}</h3>
                <h3>Author: ${book.author}</h3>
                <h3>Number of Pages: ${book.pages}</h3>
                <button class="toggle-read">${book.read}</button>
                <div class="extra-buttons">
                    <button class="edit">Edit</button>
                    <button class="delete">X</button>
                </div>`;
            container.appendChild(bookElement);
        });
        addRemoveListeners();
        addEditListeners();
        changeButton();
    }

    function addRemoveListeners(){
        let removeBooks = document.querySelectorAll("button.delete");
        removeBooks.forEach((removeButton) => {
            removeButton.addEventListener("click", () => {
                let bookIndex = Number(removeButton.parentNode.parentNode.id);
                myLibrary.splice(bookIndex, 1);
                displayBooks();
            });
        });
    }

    function addEditListeners(){
        let editButtons = document.querySelectorAll("button.edit");
        editButtons.forEach((editButton) => {
            editButton.addEventListener("click", () => {
                let bookIndex = Number(editButton.parentNode.parentNode.id);
                let book = myLibrary[bookIndex];
                document.querySelector("#title-input").value = book.title;
                document.querySelector("#author-input").value = book.author;
                document.querySelector("#pages-input").value = book.pages;
                toggleSwitch.checked = book.read === "Read";
                bookIndexField.value = bookIndex;
                modal.style.display = "block";
            });
        });
    }
    function changeButton(){
        let changeReadButtons = document.querySelectorAll('.toggle-read');
        changeReadButtons.forEach((readButton) => {
            readButton.addEventListener("click", () => {
                let isRead = readButton.textContent;
                let bookIndex = Number(readButton.parentNode.parentNode.id);
                let book = myLibrary[bookIndex];
                if(isRead == "Read"){
                    readButton.textContent = "Unread";
                    book.read = "Unread"
                }
                else{
                    readButton.textContent = "Read";
                    book.read = "Read";
                }
            })
        })
    }
});

