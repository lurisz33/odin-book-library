document.addEventListener("DOMContentLoaded", function() {
    const addBookButton = document.getElementById("addBookButton");
    const closeDialogButton = document.querySelector("#closeDialogButton");
    const dialog = document.querySelector("dialog");
    const openDialogButton = document.querySelector("#open-dialog-button");
    const bookshelfContainer = document.getElementById("bookshelfContainer");
    const readCheckbox = document.getElementById("read");
    const pagesReadContainer  = document.getElementById("pagesRead-container");

    let bookLibrary = [];

    openDialogButton.addEventListener("click", () => {
        dialog.showModal();
        if (readCheckbox.checked) {
            pagesReadContainer.style.display = "none";
        } else {
            pagesReadContainer.style.display = "flex";
        }
    });

    closeDialogButton.addEventListener("click", () => {
        dialog.close();
    });

    readCheckbox.addEventListener("change", function () {
        if (this.checked) {
            pagesReadContainer.style.display = "none";
        } else {
            pagesReadContainer.style.display = "flex";
        }
    });

    addBookButton.addEventListener("click", function () {
        //Get the values from the input fields
        const author = document.getElementById("author").value;
        const title = document.getElementById("title").value;
        const numberOfPages = document.getElementById("numberOfPages").value;
        const read = document.getElementById("read").checked ? "Yes" : "No";
        const pagesRead = document.getElementById("pagesRead").value;

        //Create the book object
        const currentBook = new Book(author, title, numberOfPages, read, bookLibrary.length, pagesRead);

        //Add the created book to the library (array)
        bookLibrary.push(currentBook);

        //Refresh the container that shows every book
        refreshLibrary();

        //Close the input dialog from the currently added book
        dialog.close();

        //Clear the form input fields and hide the pagesRead input field
        document.getElementById("bookForm").reset();
        pagesReadContainer.style.display = "none";

    });

    function refreshLibrary() {
        bookshelfContainer.innerHTML = "";
        bookLibrary.forEach(book => {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");
            bookDiv.id = `book-${book.id}`;

            const titleP = document.createElement("p");
            titleP.innerHTML = `Title: <span class="bold">${book.title}</span>`;
            bookDiv.appendChild(titleP);

            const authorP = document.createElement("p");
            authorP.innerHTML = `Author: <span class="bold">${book.author}</span>`;
            bookDiv.appendChild(authorP);

            const pagesP = document.createElement("p");
            pagesP.innerHTML = `Number of pages: <span class="bold">${book.numberOfPages}</span>`;
            bookDiv.appendChild(pagesP);

            const readP = document.createElement("p");
            const progressBar = document.createElement("progress");
            progressBar.max = book.numberOfPages;

            if (book.read === "Yes") {
                progressBar.value = book.numberOfPages;
                readP.innerHTML = `Progress: ${progressBar.outerHTML} Completed`;
            } else {
                progressBar.value = book.pagesRead;
                const percentageRead = Math.min(100, Math.round((book.pagesRead / book.numberOfPages) * 100));
                readP.innerHTML = `Progress: ${progressBar.outerHTML} ${percentageRead}%`;
            }

            bookDiv.appendChild(readP);
            bookshelfContainer.appendChild(bookDiv);
        });
    }


    class Book {
        constructor(author, title, numberOfPages, read, id, pagesRead) {
            this.author = author;
            this.title = title;
            this.numberOfPages = numberOfPages;
            this.read = read;
            this.id = id;
            this.pagesRead = pagesRead;
        }
    }


});










