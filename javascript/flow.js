const hamburgerBtn = document.querySelector('.hamburger');
const navigationLinks = document.querySelector('.nav-links');

if (hamburgerBtn && navigationLinks) 
{
  hamburgerBtn.addEventListener('click', function() {
    navigationLinks.classList.toggle('show');
  });
}

// cozy sound controls
let cozyAudio = document.getElementById('cozy-audio');
let playSoundButton = document.getElementById('play-sound-btn');
let stopSoundButton = document.getElementById('stop-sound-btn');

playSoundButton.onclick = function() 
{
  cozyAudio.play();
  playSoundButton.disabled = true;
  stopSoundButton.disabled = false;
};

stopSoundButton.onclick = function() 
{
  cozyAudio.pause();
  cozyAudio.currentTime = 0;
  playSoundButton.disabled = false;
  stopSoundButton.disabled = true;
};  

// completed books tracker
let completedBooks = JSON.parse(localStorage.getItem('completedBooks'));
if (!completedBooks) 
{
  completedBooks = [];
}

let completedForm = document.getElementById('add-completed-form');
let completedList = document.getElementById('completed-books-list');

function renderCompletedBooks() 
{
  if (completedBooks.length > 0) {
    let items = '';
    for (let i = 0; i < completedBooks.length; i++) 
    {
      items += '<li>' + completedBooks[i] +
        ' <button class="remove-btn" onclick="removeBook(' + i + ')">Remove</button></li>';
    }
    completedList.innerHTML = items;
  } 
  else {
    completedList.innerHTML = '<li>No books completed yet.</li>';
  }
}

window.removeBook = function(index) 
{
  completedBooks.splice(index, 1);
  localStorage.setItem('completedBooks', JSON.stringify(completedBooks));
  renderCompletedBooks();
};

completedForm.onsubmit = function(event) 
{
  event.preventDefault();
  let titleInput = document.getElementById('completed-title');
  let bookTitle = titleInput.value.trim();
  if (bookTitle) 
  {
    completedBooks.push(bookTitle);
    localStorage.setItem('completedBooks', JSON.stringify(completedBooks));
    renderCompletedBooks();
    completedForm.reset();
  }
};

renderCompletedBooks();

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
