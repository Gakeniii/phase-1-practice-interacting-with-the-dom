document.addEventListener("DOMContentLoaded", () => {
  let timer = 0;
  let intervalId;
  let likes = {};
  let isPaused = false;

  const timerDisplay = document.getElementById("counter");
  const plusButton = document.getElementById("plus");
  const minusButton = document.getElementById("minus");
  const likeButton = document.getElementById("heart");
  const likeDisplay = document.querySelector(".likes");
  const pauseButton = document.getElementById("pause");
  const commentForm = document.getElementById("comment-form");
  const commentInput = document.getElementById("comment-input");
  const commentList = document.getElementById("list");

  // Start the timer
  function startTimer() {
    intervalId = setInterval(() => {
      timer++;
      timerDisplay.textContent = timer;
    }, 1000);
  }

  // Increment and decrement functions
  function incrementCounter() {
    timer++;
    timerDisplay.textContent = timer;
  }

  function decrementCounter() {
    timer--;
    timerDisplay.textContent = timer;
  }

  // Like functionality
  function likeCurrentNumber() {
    likes[timer] = (likes[timer] || 0) + 1;
    updateLikesDisplay();
  }

  function updateLikesDisplay() {
    likeDisplay.innerHTML = ''; // Clear current likes display
    for (let [number, count] of Object.entries(likes)) {
      const li = document.createElement('li');
      li.textContent = `${number} has ${count} like(s)`;
      likeDisplay.appendChild(li);
    }
  }

  // Pause and resume functionality
  function togglePause() {
    if (isPaused) {
      resume();
    } else {
      pause();
    }
  }

  function pause() {
    clearInterval(intervalId);
    isPaused = true;
    plusButton.disabled = true;
    minusButton.disabled = true;
    likeButton.disabled = true;
    pauseButton.textContent = "Resume";
  }

  function resume() {
    startTimer();
    isPaused = false;
    plusButton.disabled = false;
    minusButton.disabled = false;
    likeButton.disabled = false;
    pauseButton.textContent = "Pause";
  }

  // Comment functionality
  function addComment(event) {
    event.preventDefault();
    const commentText = commentInput.value;
    const li = document.createElement('li');
    li.textContent = commentText;
    commentList.appendChild(li);
    commentInput.value = ''; // Clear input after submitting
  }

  // Event listeners
  plusButton.addEventListener("click", incrementCounter);
  minusButton.addEventListener("click", decrementCounter);
  likeButton.addEventListener("click", likeCurrentNumber);
  pauseButton.addEventListener("click", togglePause);
  commentForm.addEventListener("submit", addComment);

  // Start the timer on page load
  startTimer();
});
