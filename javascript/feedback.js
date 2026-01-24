let form = document.getElementById('feedback-form');

form.onsubmit = function(event) 
{
  event.preventDefault();
  let feedback = 
  {
    name: document.getElementById('feedback-name').value,
    email: document.getElementById('feedback-email').value,
    message: document.getElementById('feedback-message').value,
    rating: document.getElementById('feedback-rating').value
  };
  let feedbackList = JSON.parse(localStorage.getItem('feedbackList'));
  if (!feedbackList) 
  {
    feedbackList = [];
  }
  feedbackList.push(feedback);
  localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
  alert('Thank you for your feedback!');
  form.reset();
};

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
