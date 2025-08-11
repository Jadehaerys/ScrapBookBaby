
const photos = [
  { src: "images/August.jpg", msg: "Our first Date together 💕" },
  { src: "images/First Date sizzling.jpg", msg: "First Date sa Sizzling 🫶" },
  { src: "images/pickup happy.jpg", msg: "You look happy when I pick you up 🌸" },
  { src: "images/sleep.jpg", msg: "My Hardworking Baby is tired 😘" },
  { src: "images/Coffee Date.jpg", msg: "Coffee dates ☕" },
  { src: "images/January.JPG", msg: "Rainy day snuggles heheh🌧" },
  { src: "images/Movie Night.png", msg: "Movie Nights 🌙" },
  { src: "images/Kapoy.jpg", msg: "Ge Kapoy ka beh? ✨" },
  { src: "images/Nsakpan.jpeg", msg: "Hala Nasakpan 😂" },
  { src: "images/Nauwaw.jpeg", msg: "Your laugh is my favorite and ur Uwaw face sad❤️" },
  { src: "images/Ramen Date.jpg", msg: "Matching outfits 👕" },
  { src: "images/Dakoag Smile.jpg", msg: "Your presence feels like home 🏡" },
  { src: "images/Lechecflan.jpg", msg: "LecheFlan date? 🍦" },
  { src: "images/May1.jpg", msg: "Beach days 🏖" },
  { src: "images/thumbnail1.png", msg: "Tiktok Trends 🎬" },
  { src: "images/Tambok.jpg", msg: "Getting Fatter together 🍳" },
  { src: "images/Halawoww.jpeg", msg: "Family Bonding 🛋" },
  { src: "images/Damn.jpg", msg: "Festive nights 🎄" },
  { src: "images/Compirma.jpg", msg: "Blessed na siya ☀️" },
  { src: "images/sheesh.jpg", msg: "Babytimes 🧺" },
  { src: "images/July.jpg", msg: "Silly faces 😂" },
  { src: "images/February.jpg", msg: "Celebrations 🎉" },
  { src: "images/secretoplaces.jpg", msg: "Our secret spots 🤫" },
  { src: "images/Silly.jpg", msg: "Lazy Days ✈️" },
  { src: "images/Star.jpg", msg: "Star gazing kay ikaw akong star 🌌" },
  { src: "images/Gymday.jpg", msg: "Holding you close 💞" },
  { src: "images/Hugs.jpeg", msg: "Surprise hugs 🎁" },
  { src: "images/Shenanigans.jpeg", msg: "Our silly shenanigans 💃" },
  { src: "images/December.jpg", msg: "Warm embraces 🤗" },
  { src: "images/MeetLola.jpeg", msg: "Forever and always ♾️" }
];

/* ---------- configuration ---------- */
const PHOTOS_PER_PAGE = 4;          // 4 photocards per page
const viewer = document.getElementById('viewer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageIndicator = document.getElementById('pageIndicator');

/* ---------- generate pages ---------- */
const photoPages = Math.ceil(photos.length / PHOTOS_PER_PAGE);
let pages = []; // will hold DOM nodes for pages
let currentIndex = 0;

// create pages from photos
for (let i = 0; i < photoPages; i++) {
  const pageEl = document.createElement('section');
  pageEl.className = 'page';
  // slice photos for this page
  const start = i * PHOTOS_PER_PAGE;
  const chunk = photos.slice(start, start + PHOTOS_PER_PAGE);
  chunk.forEach(item => {
    const card = document.createElement('article');
    card.className = 'photocard';
    // photo container using background-image for cover fit
    const photoDiv = document.createElement('div');
    photoDiv.className = 'photo';
    photoDiv.style.backgroundImage = `url("${item.src}")`;
    // message element
    const msg = document.createElement('div');
    msg.className = 'msg';
    msg.textContent = item.msg || '';
    // assemble
    card.appendChild(photoDiv);
    card.appendChild(msg);
    pageEl.appendChild(card);
  });
  pages.push(pageEl);
}

// create final letter page
const letterPage = document.createElement('section');
letterPage.className = 'page final-letter';
letterPage.innerHTML = `
  <div class="letter-box" role="article" aria-label="Anniversary letter">
    <h2>Happy 1st Anniversary ❤️</h2>
    <p>
My love,

This year with you has been the most beautiful chapter of my life. Every morning, every silly joke, every fights, every warm hug and kisses these moments have become the story I carry with me. Thank you for your patience, your laughter, and the countless little ways you make my days brighter.

I can't wait for the next chapters we’ll write together. I love you, today and always.
    </p>
    <div class="signature">— Jade Mykel Ventic</div>
    
  </div>
`;
pages.push(letterPage);

/* append pages into viewer (but only show current) */
pages.forEach((p, idx) => {
  if (idx === 0) p.classList.add('visible');
  viewer.appendChild(p);
});

/* update page indicator */
function updateIndicator(){
  const total = pages.length;
  pageIndicator.textContent = `${currentIndex + 1} / ${total}`;
}

/* show page with nice enter direction animation */
function showPage(newIndex){
  if (newIndex < 0 || newIndex >= pages.length) return;
  const old = pages[currentIndex];
  const next = pages[newIndex];

  // set classes for animation direction
  if (newIndex > currentIndex) {
    next.classList.add('enter-right');
    next.classList.add('visible');
    requestAnimationFrame(()=> {
      // force reflow then remove enter class to animate into place
      next.classList.remove('enter-right');
    });
    old.classList.remove('visible');
  } else if (newIndex < currentIndex) {
    next.classList.add('enter-left');
    next.classList.add('visible');
    requestAnimationFrame(()=> {
      next.classList.remove('enter-left');
    });
    old.classList.remove('visible');
  }

  currentIndex = newIndex;
  updateIndicator();
}

/* controls */
prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) showPage(currentIndex - 1);
});
nextBtn.addEventListener('click', () => {
  if (currentIndex < pages.length - 1) showPage(currentIndex + 1);
});

/* keyboard support */
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
});

/* touch / swipe support for mobile */
let touchStartX = 0;
let touchEndX = 0;
viewer.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});
viewer.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchEndX - touchStartX;
  if (diff > 40) prevBtn.click();
  else if (diff < -40) nextBtn.click();
});

/* initialize indicator */
updateIndicator();

/* ---------- floating hearts ---------- */
const heartsContainer = document.getElementById('hearts');

function createHeart(){
  const h = document.createElement('div');
  h.className = 'heart';
  h.textContent = '❤️';
  h.style.left = Math.random() * 100 + 'vw';
  h.style.fontSize = (Math.random() * 18 + 14) + 'px';
  h.style.opacity = (Math.random() * 0.6 + 0.4).toString();
  h.style.transform = `translateY(${Math.random() * 60 + 20}vh)`;
  // random animation duration
  const dur = Math.random() * 4 + 4;
  h.style.animation = `float ${dur}s linear forwards`;
  heartsContainer.appendChild(h);
  // remove when done (slightly longer than animation)
  setTimeout(()=> h.remove(), (dur + 0.5) * 1000);
}
setInterval(createHeart, 450);

/* ---------- music control ---------- */
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let playing = false;

// Note: browsers often block autoplay with sound until user interacts.
// The music button provides that interaction.
musicBtn.addEventListener('click', async () => {
  try {
    if (!playing) {
      await bgMusic.play();
      musicBtn.textContent = '⏸';
      musicBtn.setAttribute('aria-pressed', 'true');
    } else {
      bgMusic.pause();
      musicBtn.textContent = '🎵';
      musicBtn.setAttribute('aria-pressed', 'false');
    }
    playing = !playing;
  } catch (err) {
    console.warn('Audio playback failed:', err);
  }
});

/* accessibility: show pageIndicator initially */
updateIndicator();
