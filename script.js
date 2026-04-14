// Mobile navigation toggle
const mobileToggle = document.getElementById('mobileToggle');
const mobileNav = document.getElementById('mobileNav');

mobileToggle.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('is-open');
  mobileNav.hidden = !open;
  mobileToggle.textContent = open ? '✕' : '☰';
});

// Simple active-page display for nav buttons
const pageButtons = document.querySelectorAll('[data-page]');
const activePageLabel = document.getElementById('activePageLabel');

function setActivePage(page) {
  activePageLabel.textContent = page;
  pageButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.page === page);
  });
}

pageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setActivePage(button.dataset.page);
    if (mobileNav.classList.contains('is-open')) {
      mobileNav.classList.remove('is-open');
      mobileNav.hidden = true;
      mobileToggle.textContent = '☰';
    }
  });
});

setActivePage('home');

// Client-side search data for the static GitHub Pages version
const searchIndex = [
  { type: 'Page', label: 'Home' },
  { type: 'Page', label: 'Teams' },
  { type: 'Page', label: 'Overwatch' },
  { type: 'Page', label: 'VALORANT' },
  { type: 'Page', label: 'League of Legends' },
  { type: 'Page', label: 'Blog' },
  { type: 'Page', label: 'Jobs' },
  { type: 'Page', label: 'Shop' },
  { type: 'Page', label: 'Full Calendar' },
  { type: 'Page', label: 'Members' },
  { type: 'Team', label: 'Overwatch' },
  { type: 'Team', label: 'VALORANT' },
  { type: 'Team', label: 'League of Legends' },
  { type: 'Team', label: 'Marvel Rivals' },
  { type: 'Post', label: 'Recap: Fresno State Esports Expo Returns After 3 Years' },
  { type: 'Post', label: 'Want to join Fresno State Esports in Fall 2025?' },
  { type: 'Post', label: 'Building the Central Valley esports community' },
  { type: 'Opportunity', label: 'Competitive player' },
  { type: 'Opportunity', label: 'Club officer' },
  { type: 'Opportunity', label: 'Broadcast / production' },
  { type: 'Opportunity', label: 'Social media / content' },
  { type: 'Product', label: 'Team Hoodie' },
  { type: 'Product', label: 'Logo Tee' },
  { type: 'Product', label: 'Sticker Pack' },
  { type: 'Product', label: 'Jersey Mockup' },
];

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  searchResults.innerHTML = '';

  if (!q) return;

  const results = searchIndex
    .filter((item) => item.label.toLowerCase().includes(q))
    .slice(0, 8);

  if (!results.length) {
    searchResults.innerHTML = '<div class="search-result"><strong>No matches found</strong></div>';
    return;
  }

  results.forEach((item) => {
    const result = document.createElement('div');
    result.className = 'search-result';
    result.innerHTML = `<strong>${item.type}</strong><small>${item.label}</small>`;
    searchResults.appendChild(result);
  });
});

// Demo members area state
let signedIn = false;
const memberButton = document.getElementById('memberButton');
const memberTitle = document.getElementById('memberTitle');
const memberCards = document.querySelectorAll('.member-card span');
const demoSignIn = document.getElementById('demoSignIn');
const demoSignOut = document.getElementById('demoSignOut');

function renderMemberState() {
  memberButton.textContent = signedIn ? 'My Account' : 'Sign In';
  memberTitle.textContent = signedIn
    ? 'Welcome back'
    : 'Sign in to access member features';

  memberCards.forEach((card) => {
    card.textContent = signedIn ? 'Available in dashboard' : 'Requires sign-in';
  });
}

memberButton.addEventListener('click', () => {
  signedIn = !signedIn;
  setActivePage('members');
  renderMemberState();
});

demoSignIn.addEventListener('click', () => {
  signedIn = true;
  setActivePage('members');
  renderMemberState();
});

demoSignOut.addEventListener('click', () => {
  signedIn = false;
  renderMemberState();
});

renderMemberState();
