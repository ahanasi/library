const bookshelf = document.querySelector(".bookshelf");
const template = document.getElementById("card");
const modal = document.querySelector(".modal");
const modalBtns = document.querySelectorAll(".modal-toggle");
const submitBtn = document.querySelector(".submit-button");
const entryForm = document.getElementById("entryForm");
const checkbox = document.getElementById("hasRead");

let myLibrary = [
  new Book("Test","Me",648,true),
  new Book("Harry Potter", "J.K. Rowling",500,true),
  new Book("Twilight","Stephanie Meyer",450,false),
  new Book("Rhythm of War","Brandon Sanderson",1000,true),
  new Book("Name of the Wind","Patrick Rothfuss", 1500, true)
];

modalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.classList.toggle("hidden");
    modal.classList.toggle("flex");
  });
});

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

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

Book.prototype.setReadStatus = function (status) {
  this.hasRead = status;
};

function deleteBook(btn) {
  myLibrary.splice(btn.dataset.index, 1);
  clearLibrary();
  showLibrary();
}

function toggleReadBtn(btn) {
  if (btn.textContent == "Read ✅") {
    myLibrary[btn.dataset.index].setReadStatus(true);
    btn.textContent = "Not Read ❌";
  } else {
    myLibrary[btn.dataset.index].setReadStatus(false);
    btn.textContent = "Read ✅";
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
      let clone = template.content.cloneNode(true);

      let delBtn = clone.querySelector("button.delete-book");
      let hasReadBtn = clone.querySelector("button.hasRead");
      delBtn.setAttribute("data-index", i);
      hasReadBtn.setAttribute("data-index", i);

      if (book.hasRead) {
        hasReadBtn.textContent = "Not Read ❌";
        hasReadBtn.classList.toggle("text-green-700");
        hasReadBtn.classList.toggle("text-red-700");
      } else {
        hasReadBtn.textContent = "Read ✅";
      }

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
