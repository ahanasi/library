const bookshelf = document.querySelector(".bookshelf");
const template = document.getElementById("card");
const modal = document.querySelector(".modal");
const modalBtns = document.querySelectorAll(".modal-toggle");
const submitBtn = document.querySelector(".submit-button");
const entryForm = document.getElementById("entryForm");
const checkbox = document.getElementById("hasRead");

modalBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    modal.classList.toggle("hidden");
    modal.classList.toggle("flex");
  });
});

let myLibrary = [
  { title: "Test", author: "Me", pages: 500, hasRead: true },
  { title: "Harry Potter", author: "J.K. Rowling", pages: 500, hasRead: true },
  { title: "Twilight", author: "Stephanie Meyer", pages: 200, hasRead: false },
  { title: "Rhythm of War", author: "Brandon Sanderson", pages: 900, hasRead: true },
  { title: "Name of the Wind", author: "Patrick Rothfuss", pages: 450, hasRead: true },
];

entryForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let formData = new FormData(entryForm);
  let book = new Book();

  for (var pair of formData.entries()) {
    book[pair[0]] = pair[1];
  }

  setCheckboxVal(book);
  addBookToLibrary(book);
  entryForm.reset();
  clearLibrary();
  showLibrary();
});

function setCheckboxVal(book) {
  return checkbox.checked ? (book.hasRead = true) : (book.hasRead = false);
}

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

function addBookToLibrary(book) {
  return myLibrary.push(book);
}

function clearLibrary() {
  while (bookshelf.firstChild) {
    bookshelf.removeChild(bookshelf.firstChild);
  }
}

function showLibrary() {
  myLibrary.forEach((book) => {
    if ("content" in document.createElement("template")) {
      let clone = template.content.cloneNode(true);
      let title = clone.querySelector("h2");
      title.textContent = book.title;

      let p = clone.querySelectorAll("p");
      p[0].textContent = book.author;
      p[1].textContent = `${book.pages} pages`;

      bookshelf.appendChild(clone);
    }
  });
}

showLibrary();
