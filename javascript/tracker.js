const hamburgerBtn = document.querySelector('.hamburger');
const navigationLinks = document.querySelector('.nav-links');

if (hamburgerBtn && navigationLinks) {
  hamburgerBtn.addEventListener('click', function () {
    navigationLinks.classList.toggle('show');
  });
}

let books = JSON.parse(localStorage.getItem('trackedBooks')) || [];

document.addEventListener('DOMContentLoaded', function () {
  const savedProgress = JSON.parse(localStorage.getItem('readingProgress'));
  if (savedProgress) {
    showResults(savedProgress);
  }

  renderBooks();

  const addBookForm = document.getElementById('add-book-form');
  if (addBookForm) {
    addBookForm.addEventListener('submit', addBook);
  }
});

function addBook(event) {
  event.preventDefault();

  books.push({
    id: Date.now(),
    title: document.getElementById('book-title').value,
    author: document.getElementById('book-author').value,
    pages: parseInt(document.getElementById('book-pages').value)
  });

  localStorage.setItem('trackedBooks', JSON.stringify(books));
  renderBooks();
  event.target.reset();
}

function renderBooks() {
  const list = document.getElementById('books-list');
  if (!list) return;

  let html = '';
  for (let book of books) {
    html += `
      <div class="book-item">
        <div class="book-info">
          <h3>${book.title}</h3>
          <p>${book.author}</p>
          <p>${book.pages} pages</p>
        </div>
        <button onclick="deleteBook(${book.id})">Delete</button>
      </div>
    `;
  }
  list.innerHTML = html || '<p>No books added yet</p>';
}

window.deleteBook = function (id) {
  books = books.filter(function (b) {
    return b.id !== id;
  });
  localStorage.setItem('trackedBooks', JSON.stringify(books));
  renderBooks();
};

let latestData = null; // saving last calculated data for Save Progress button

const progressForm = document.getElementById('progress-form');
if (progressForm) 
{
  progressForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const totalPages = parseInt(document.getElementById('total-pages').value);
    const read = parseInt(document.getElementById('pages-read').value);
    const speed = parseInt(document.getElementById('reading-speed').value);

    if (totalPages > 0 && read >= 0 && speed > 0 && read <= totalPages) {
      const percent = Math.round((read / totalPages) * 100);
      const daysLeft = Math.ceil((totalPages - read) / speed);

      let finish;
      if (daysLeft > 0) 
      {
        finish = "Estimated finish: " + daysLeft + " day(s)";
      } 
      else 
      {
        finish = "You've finished!";
      }
      
      const data = { total: totalPages, read: read, speed: speed, percent: percent, finish: finish };

      showResults(data);
    } else {
      alert("Please enter valid numbers.");
    }
  });
}

function showResults(data) {
  latestData = data; // store latest progress so Save button can use it

  document.getElementById('progress-results').style.display = 'block';
  document.getElementById('progress-fill').style.width = data.percent + '%';
  document.getElementById('percent-completed').textContent = `Completed: ${data.percent}%`;
  document.getElementById('estimated-finish').textContent = data.finish;
}

const saveBtn = document.getElementById('save-progress');
if (saveBtn) {
  saveBtn.addEventListener('click', function () {
    if (latestData === null) {
      alert('Please click Calculate first!');
      return;
    }

    localStorage.setItem('readingProgress', JSON.stringify(latestData));
    alert('Progress saved!');
  });
}

const newsletterForm = document.getElementById('newsletter-form');
const newsletterEmailInput = document.getElementById('newsletter-email');

if (newsletterForm && newsletterEmailInput) {
  newsletterForm.addEventListener('submit', function (event) {
    event.preventDefault();

    let email = newsletterEmailInput.value; // getting email

    if (email !== "") {
      localStorage.setItem("newsletterEmail", email);

      alert("Subscribed successfully!");

      newsletterEmailInput.value = ""; // making the value empty again
    }
  });
}
