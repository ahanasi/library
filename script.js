const BOOKSHELF = document.querySelector(".bookshelf");
const TEMPLATE = document.getElementById("card");

let myLibrary = [
  { title: "Test", author: "Me", pages: 500, read: true },
  { title: "Harry Potter", author: "J.K. Rowling", pages: 500, read: true },
  { title: "Twilight", author: "Stephanie Meyer", pages: 200, read: false },
  { title: "Rhythm of War", author: "Brandon Sanderson", pages: 900, read: true },
  { title: "Name of the Wind", author: "Patrick Rothfuss", pages: 450, read: true },
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  return myLibrary.push(book);
}

function showLibrary() {
  myLibrary.forEach((book) => {
    if ("content" in document.createElement("template")) {
      let clone = TEMPLATE.content.cloneNode(true);
      let title = clone.querySelector("h2");
      title.textContent = book.title;

      let p = clone.querySelectorAll("p");
      p[0].textContent = book.author;
      p[1].textContent = `${book.pages} pages`;

      BOOKSHELF.appendChild(clone);

    }
  });
}

showLibrary();
