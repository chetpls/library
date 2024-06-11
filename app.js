const myLibrary = [];

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        const readStatus = this.read ? "already read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
    };
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks(); // Update the display whenever a new book is added
}

function displayBooks() {
    const bookContainer = document.querySelector('.book-container');
    bookContainer.innerHTML = ''; // Clear the container before updating

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        const title = document.createElement('p');
        title.textContent = book.title;
        bookCard.appendChild(title);

        const author = document.createElement('p');
        author.textContent = book.author;
        bookCard.appendChild(author);

        const pages = document.createElement('p');
        pages.textContent = `${book.pages} pages`;
        bookCard.appendChild(pages);

        const readStatus = document.createElement('button');
        readStatus.textContent = book.read ? "Read" : "Not Read";
        readStatus.classList.add(book.read ? 'read-status' : 'not-read-status');
        readStatus.addEventListener('click', () => {
            book.read = !book.read;
            displayBooks(); // Update the display after toggling read status
        });
        bookCard.appendChild(readStatus);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            displayBooks(); // Update the display after removal
        });
        bookCard.appendChild(removeButton);

        bookContainer.appendChild(bookCard);
    });
}

// Show popup form
const addBookIcon = document.getElementById('addBookIcon');
const popupForm = document.getElementById('popupForm');
const closePopup = document.getElementById('closePopup');

addBookIcon.addEventListener('click', () => {
    popupForm.style.display = 'flex';
});

closePopup.addEventListener('click', () => {
    popupForm.style.display = 'none';
});

// Handle form submission
const addBookForm = document.getElementById('addBookForm');
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;

    const newBook = new Book(title, author, pages);
    addBookToLibrary(newBook);

    // Reset form and hide popup
    addBookForm.reset();
    popupForm.style.display = 'none';
});

// Initial display of books
displayBooks();
