const hamburgerBtn = document.querySelector('.hamburger');
const navigationLinks = document.querySelector('.nav-links');

if (hamburgerBtn && navigationLinks) 
{
  hamburgerBtn.addEventListener('click', function() {
    navigationLinks.classList.toggle('show');
  });
}

const books = 
[
  { title: "The Obsidian Chronicles", author: "Lawrence Watt-Evans", genre: "Fantasy", length: "Medium" },
  { title: "Shadows Upon Time", author: "Christopher Ruocchio", genre: "Sci-Fi", length: "Long" },
  { title: "The Goldfinch", author: "Donna Tartt", genre: "Fiction", length: "Long" },
  { title: "Goosebumps: Welcome to Dead House", author: "R.L. Stine", genre: "Fantasy", length: "Short" },
  { title: "Vagabond: A Memoir", author: "Tim Curry", genre: "Memoir", length: "Medium" },
  { title: "The Hunger Games", author: "Suzanne Collins", genre: "Fiction", length: "Long" },
  { title: "Tooth and Claw", author: "Jo Walton", genre: "Fantasy", length: "Medium" },
  { title: "Slow Gods", author: "Andy Weir", genre: "Sci-Fi", length: "Medium" }
];

let currentBook = null; 

document.addEventListener('DOMContentLoaded', function() 
{
  document.getElementById('pick-btn').onclick = pickBook;
  document.getElementById('pick-again-btn').onclick = pickBook;
  document.getElementById('save-btn').onclick = saveBook;

  renderSavedList();
});

function showBook(book) 
{
  let authorText = "";
  let genreText = "";
  let lengthText = "";

  if (book.author) 
  {
    authorText = "by " + book.author;
  }
  if (book.genre) 
  {
    genreText = "Genre: " + book.genre;
  }
  if (book.length)
  {
    lengthText = "Length: " + book.length;
  }

  document.getElementById('recommendation-area').innerHTML =
    '<div class="recommendation-card">' +
      '<h3>' + book.title + '</h3>' +
      '<p>' + authorText + '</p>' +
      '<p>' + genreText + '</p>' +
      '<p>' + lengthText + '</p>' +
    '</div>';
}

function pickBook() 
{
  let genre = document.getElementById('genre-select').value;
  let length = document.getElementById('length-select').value;

  let filtered = [];

  for (let i = 0; i < books.length; i++) 
  {
    let book = books[i];
    
    let genreMatches = (genre === "" || book.genre === genre);
    
    let lengthMatches = (length === "" || book.length === length);
    
    if (genreMatches && lengthMatches) 
    {
      filtered.push(book);
    }
  }

  if (filtered.length === 0) 
  {
    showBook({ title: "No match found!", author: "", genre: "", length: "" });
    document.getElementById('save-btn').style.display = "none";
    return;
  }

  let randomIndex = Math.floor(Math.random() * filtered.length);
  currentBook = filtered[randomIndex];

  showBook(currentBook);

  document.getElementById('pick-again-btn').style.display = "inline-block";
  document.getElementById('save-btn').style.display = "inline-block";
}

function saveBook() 
{
  if (!currentBook) return;
  let list = JSON.parse(localStorage.getItem('readingList')) || []; // get existing list or empty array if it doesn't exist
  let isDuplicate = false;
  for (let i = 0; i < list.length; i++) 
  {
    let savedBook = list[i];
    if (savedBook.title === currentBook.title && savedBook.author === currentBook.author) 
    {
      isDuplicate = true;
      break;
    }
  }
  if (!isDuplicate)
  {
    list.push(currentBook);
    localStorage.setItem('readingList', JSON.stringify(list));
    renderSavedList();
    alert('Book saved!');
  }
}

function renderSavedList() 
{
  let list = JSON.parse(localStorage.getItem('readingList'));

  if (!list) 
  {
    list = [];
  }

  let readingListElement = document.getElementById('reading-list');
  
  if (list.length > 0) 
  {
    let items = '';
    for (let i = 0; i < list.length; i++) 
    {
      items += '<li>' + list[i].title + ' <span style="color:#888;">by ' + list[i].author + '</span></li>';
    }
    readingListElement.innerHTML = items;
  } 
  else 
  {
    readingListElement.innerHTML = '<li>No books saved yet.</li>';
  }
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


