const bookshelf = document.querySelector(".bookshelf");
const template = document.getElementById("card");
const modal = document.querySelector(".modal");
const modalBtns = document.querySelectorAll(".modal-toggle");
const entryForm = document.getElementById("entryForm");
const checkbox = document.getElementById("hasRead");

class Book {
  constructor(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
  }

  setReadStatus(status) {
    this.hasRead = status;
  }
}

const myLibrary = [
  new Book("Test", "Me", 648, true),
  new Book("Harry Potter", "J.K. Rowling", 500, true),
  new Book("Twilight", "Stephanie Meyer", 450, false),
  new Book("Rhythm of War", "Brandon Sanderson", 1000, true),
  new Book("Name of the Wind", "Patrick Rothfuss", 1500, true),
];

function toggleReadBtn(btn) {
  const readBtn = btn;
  if (readBtn.textContent === "Read ✅") {
    myLibrary[btn.dataset.index].setReadStatus(false);
    readBtn.textContent = "Not Read ❌";
  } else {
    myLibrary[readBtn.dataset.index].setReadStatus(true);
    readBtn.textContent = "Read ✅";
  }

  btn.classList.toggle("text-green-700");
  btn.classList.toggle("text-red-700");
}

function setCheckboxVal(book) {
  book.setReadStatus(checkbox.checked);
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
  myLibrary.forEach((book, i) => {
    if ("content" in document.createElement("template")) {
      const clone = template.content.cloneNode(true);

      const delBtn = clone.querySelector("button.delete-book");
      const hasReadBtn = clone.querySelector("button.hasRead");
      delBtn.setAttribute("data-index", i);
      hasReadBtn.setAttribute("data-index", i);

      if (book.hasRead) {
        hasReadBtn.textContent = "Read ✅";
        hasReadBtn.classList.toggle("text-green-700");
        hasReadBtn.classList.toggle("text-red-700");
      } else {
        hasReadBtn.textContent = "Not Read ❌";
      }

      const title = clone.querySelector("h2");
      title.textContent = book.title;

      const p = clone.querySelectorAll("p");
      p[0].textContent = book.author;
      p[1].textContent = `${book.pages} pages`;

      bookshelf.appendChild(clone);
    }
  });
}

function deleteBook(btn) {
  myLibrary.splice(btn.dataset.index, 1);
  clearLibrary();
  showLibrary();
}

modalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.classList.toggle("hidden");
    modal.classList.toggle("flex");
  });
});

document.body.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-book")) {
    deleteBook(event.target);
  } else if (
    event.target.classList.contains("hasRead") &&
    event.target.type === "submit"
  ) {
    toggleReadBtn(event.target);
  }
});

entryForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(entryForm);
  const book = new Book();

  // for (const pair of formData.entries()) {
  //   book[pair[0]] = pair[1];
  // }

  [...formData.entries()].forEach((pair) => {
    const [key, value] = pair;
    book[key] = value;
  });

  setCheckboxVal(book);
  addBookToLibrary(book);
  entryForm.reset();
  clearLibrary();
  showLibrary();
});

showLibrary();
