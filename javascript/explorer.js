const hamburgerBtn = document.querySelector('.hamburger');
const navigationLinks = document.querySelector('.nav-links');

if (hamburgerBtn && navigationLinks) 
{
  hamburgerBtn.addEventListener('click', function() 
  {
    navigationLinks.classList.toggle('show');
  });
}

const books = 
[
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", rating: 4.5 },
  { id: 2, title: "The Man Who Tasted Words", author: "Dr. Guy Leschziner", genre: "Fiction", rating: 4.0 },
  { id: 3, title: "The Road", author: "Cormac McCarthy", genre: "Dystopian", rating: 4.1 },
  { id: 4, title: "Twisted Love", author: "Ana Huang", genre: "Romance", rating: 3.7 },
  { id: 5, title: "Assassin's Creed: Forsaken", author: "Oliver Bowden", genre: "Fiction", rating: 3.9 },
  { id: 6, title: "Brave New World", author: "Aldous Huxley", genre: "Dystopian", rating: 4.4 },
  { id: 7, title: "Diary of a Wimpy Kid", author: "Jeff Kinney", genre: "Comedy", rating: 4.2 }
];

document.addEventListener('DOMContentLoaded', function() // when the DOM is fully loaded
{
  renderBooks(books); // display all books

  let searchInput = document.getElementById('search-input');
  if (searchInput) 
  {
    searchInput.addEventListener('input', function(event) 
    {
      searchBooks(event.target.value);
    });
  }

  let genreFilter = document.getElementById('genre-filter');
  if (genreFilter) 
  {
    genreFilter.addEventListener('change', function(event) 
    {
      if (event.target.value) 
      {
        filterByGenre(event.target.value);
      } else 
      {
        renderBooks(books);
      }
    });
  }
});

function renderBooks(list) 
{
  const bookGrid = document.getElementById('book-grid');
  if (!bookGrid)
  {
    return;
  } 

  let html = '';
  for (let book of list) 
  {
    html += `
      <div class="card">
        <div class="book-placeholder">
          <p class="book-id">#${book.id}</p>
        </div>
        <h3>${book.title}</h3>
        <p class="author"><strong>${book.author}</strong></p>
        <p class="genre">${book.genre}</p>
        <p class="rating">${book.rating}</p>
      </div>
    `;
  }
  bookGrid.innerHTML = html;
}

function searchBooks(query) 
{
  renderBooks(books.filter(function(book) 
  {
    return book.title.toLowerCase().includes(query.toLowerCase()) ||
           book.author.toLowerCase().includes(query.toLowerCase());
  }));
}

function filterByGenre(genre) 
{
  const filtered = [];
  for (let book of books) 
  {
    if (book.genre === genre) 
    {
      filtered.push(book);
    }
  }
  renderBooks(filtered);
}

function sortByRating() 
{
  books.sort(function(a, b) // sort the original books array by rating (high to low)
  {
    return b.rating - a.rating;
  });

  renderBooks(books);
}

const newsletterForm = document.getElementById('newsletter-form');
const newsletterEmailInput = document.getElementById('newsletter-email');

if (newsletterForm && newsletterEmailInput) 
{
  newsletterForm.addEventListener('submit', function (event) 
  {
    event.preventDefault(); 

    let email = newsletterEmailInput.value; // getting email

    if (email !== "") 
    {
      localStorage.setItem("newsletterEmail", email);

      alert("Subscribed successfully!");

      newsletterEmailInput.value = ""; // making the value empty again
    }

  });
}