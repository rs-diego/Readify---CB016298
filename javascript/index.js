const hamburgerBtn = document.querySelector('.hamburger'); // selecting the hamburger button
const navigationLinks = document.querySelector('.nav-links'); // selecting the navigation links container

if (hamburgerBtn && navigationLinks) 
{
  hamburgerBtn.addEventListener('click', function() 
  {
    navigationLinks.classList.toggle('show');
  });
}

const quotes = 
[
  {
    text: "Remember how unimportant you are because that knowledge will gain you more respect than someone who thinks the world revolves around them.",
    author: "Jack Kirby"
  },
  {
    text: "In three words I can sum up everything I've learned about life: it goes on.",
    author: "Robert Frost"
  },
  {
    text: "The only thing that you absolutely have to know is the location of the library.",
    author: "Albert Einstein"
  },
  {
    text: "Reading is essential for those who seek to rise above the ordinary.",
    author: "Jim Rohn"
  },
  {
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde"
  },
  {
    text: "Be the change that you wish to see in the world.",
    author: "Mahatma Gandhi"
  }
];

let currentQuote = 0;

const quoteTextDisplay = document.getElementById('book-quote');
const quoteAuthorDisplay = document.getElementById('quote-author');

function showQuote() {
  quoteTextDisplay.textContent = quotes[currentQuote].text;
  quoteAuthorDisplay.textContent = "— " + quotes[currentQuote].author;
}

if (quoteTextDisplay && quoteAuthorDisplay) 
{

  showQuote();

  setInterval(function () // change quote every 5 seconds
  {

    currentQuote++;

    if (currentQuote >= quotes.length) // reset to first quote if at the end
    {
      currentQuote = 0;
    }

    showQuote();

  }, 5000); // 5000 milliseconds = 5 seconds
}

const authors = 
[
  {
    name: "William Blake",
    bio: "Visionary English poet and artist of the Romantic era.",
    image: "images/William-Blake.jpg"
  },
  {
    name: "R. L. Stine",
    bio: " American author best known for his Goosebumps and Fear Street series.",
    image: "images/R-L-Stine.jpg"
  },
  {
    name: "George Orwell",
    bio: "Wrote dystopian classics like 1984 and Animal Farm.",
    image: "images/George-Orwell.jpg"
  },
  {
    name: "Oscar Wilde",
    bio: "Renowned for his wit and flamboyant style.",
    image: "images/Oscar-Wilde.jpg"
  },
  {
    name: "William Shakespeare",
    bio: "Greatest writer in the English language and the world's pre-eminent dramatist.",
    image: "images/William-Shakespeare.jpg"
  },
  {
    name: "Victor Hugo",
    bio: "Famous for his novels Les Misérables and The Hunchback of Notre-Dame.",
    image: "images/Victor-Hugo.jpg"
  }
];

const authorNameDisplay = document.getElementById('author-name');
const authorBioDisplay = document.getElementById('author-bio');
const authorImageDisplay = document.querySelector('.featured-author img');

if (authorNameDisplay && authorBioDisplay && authorImageDisplay) 
{

  let today = new Date(); // getting today's date
  let dayNumber = today.getDay();

  let todayAuthor = authors[dayNumber]; // picking author using that day number

  authorNameDisplay.textContent = todayAuthor.name;
  authorBioDisplay.textContent = todayAuthor.bio;
  authorImageDisplay.src = todayAuthor.image;
  authorImageDisplay.alt = todayAuthor.name;
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
