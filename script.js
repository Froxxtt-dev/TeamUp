// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Counter Animation for Stats
const counters = document.querySelectorAll('.counter');
const speed = 200;
counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const inc = target / speed;
    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(updateCount, 1);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
});

// Mock Data for Collaborators, Advisors, and Investors
const mockCollaborators = [
  { name: "Alice Smith", skills: "JavaScript, React" },
  { name: "Bob Johnson", skills: "Marketing, SEO" },
  { name: "Clara Lee", skills: "Design, UI/UX" }
];

const mockAdvisors = [
  { name: "Dr. Mark Evans", expertise: "Marketing" },
  { name: "Sarah Brown", expertise: "Business Strategy" },
  { name: "Tom Wilson", expertise: "Finance" }
];

const mockInvestors = [
  { name: "Venture Capital A", industry: "Technology", stage: "Seed" },
  { name: "Angel Investor B", industry: "Healthcare", stage: "Early Stage" },
  { name: "Fund C", industry: "Finance", stage: "Growth Stage" }
];

// Local Storage for User Data
const saveUserData = (data) => {
  localStorage.setItem('userData', JSON.stringify(data));
};

const getUserData = () => {
  return JSON.parse(localStorage.getItem('userData')) || {};
};

// Signup Form Handling
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(signupForm);
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      skills: formData.get('skills'),
      experience: formData.get('experience'),
      interests: formData.get('interests'),
      reputation: 0,
      endorsements: []
    };
    saveUserData(userData);
    alert('Registration successful! Redirecting to your collaborative dashboard...');
    window.location.href = 'dashboard.html';
  });
}

// Dashboard Page Functionality
if (window.location.pathname.includes('dashboard.html')) {
  // Load User Profile
  const userData = getUserData();
  document.getElementById('profile-name').textContent = userData.name || 'N/A';
  document.getElementById('profile-skills').textContent = userData.skills || 'N/A';
  document.getElementById('reputation-score').textContent = userData.reputation || 0;

  // Endorsements
  const endorsementList = document.getElementById('endorsement-list');
  const endorseBtn = document.getElementById('endorse-btn');
  userData.endorsements.forEach(endorsement => {
    const li = document.createElement('li');
    li.textContent = endorsement;
    endorsementList.appendChild(li);
  });

  endorseBtn.addEventListener('click', () => {
    const endorsement = prompt('Enter your endorsement to build trust and credibility:');
    if (endorsement) {
      userData.endorsements.push(endorsement);
      userData.reputation += 10;
      saveUserData(userData);
      const li = document.createElement('li');
      li.textContent = endorsement;
      endorsementList.appendChild(li);
      document.getElementById('reputation-score').textContent = userData.reputation;
    }
  });

  // Search Collaborators
  const searchForm = document.getElementById('search-collaborators');
  const collaboratorResults = document.getElementById('collaborator-results');
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const skills = document.getElementById('search-skills').value.toLowerCase();
    collaboratorResults.innerHTML = '';
    const matches = mockCollaborators.filter(collab => 
      collab.skills.toLowerCase().includes(skills)
    );
    matches.forEach(collab => {
      const div = document.createElement('div');
      div.textContent = `${collab.name} - ${collab.skills}`;
      collaboratorResults.appendChild(div);
    });
  });

  // Task Management
  const addTaskForm = document.getElementById('add-task');
  const taskList = document.getElementById('task-list');
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = `${task.name} (Due: ${task.deadline})`;
    taskList.appendChild(li);
  });

  addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = document.getElementById('task-name').value;
    const taskDeadline = document.getElementById('task-deadline').value;
    const task = { name: taskName, deadline: taskDeadline };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    const li = document.createElement('li');
    li.textContent = `${task.name} (Due: ${task.deadline})`;
    taskList.appendChild(li);
    addTaskForm.reset();
  });

  // Messaging
  const chatForm = document.getElementById('chat-form');
  const chatMessages = document.getElementById('chat-messages');
  const messages = JSON.parse(localStorage.getItem('messages')) || [];
  messages.forEach(msg => {
    const p = document.createElement('p');
    p.textContent = msg;
    chatMessages.appendChild(p);
  });

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = document.getElementById('chat-input').value;
    messages.push(`${userData.name}: ${message}`);
    localStorage.setItem('messages', JSON.stringify(messages));
    const p = document.createElement('p');
    p.textContent = `${userData.name}: ${message}`;
    chatMessages.appendChild(p);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatForm.reset();
  });

  // Advisor Booking
  const advisorForm = document.getElementById('advisor-search');
  const advisorResults = document.getElementById('advisor-results');
  advisorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const expertise = document.getElementById('advisor-expertise').value;
    advisorResults.innerHTML = '';
    const matches = mockAdvisors.filter(advisor => 
      advisor.expertise.toLowerCase() === expertise.toLowerCase()
    );
    matches.forEach(advisor => {
      const div = document.createElement('div');
      div.textContent = `${advisor.name} - ${advisor.expertise}`;
      advisorResults.appendChild(div);
    });
  });
}

// Pitch Page Functionality
if (window.location.pathname.includes('pitch.html')) {
  // Pitch Deck Builder
  const pitchForm = document.getElementById('pitch-form');
  const pitchPreview = document.getElementById('pitch-preview');
  const pitches = JSON.parse(localStorage.getItem('pitches')) || [];
  pitches.forEach(pitch => {
    const div = document.createElement('div');
    div.innerHTML = `<h3>${pitch.title}</h3><p>${pitch.description}</p><p>Industry Focus: ${pitch.industry}</p><p>Funding Needs: $${pitch.funding}</p>`;
    pitchPreview.appendChild(div);
  });

  pitchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pitch = {
      title: document.getElementById('pitch-title').value,
      description: document.getElementById('pitch-description').value,
      industry: document.getElementById('pitch-industry').value,
      funding: document.getElementById('pitch-funding').value
    };
    pitches.push(pitch);
    localStorage.setItem('pitches', JSON.stringify(pitches));
    const div = document.createElement('div');
    div.innerHTML = `<h3>${pitch.title}</h3><p>${pitch.description}</p><p>Industry Focus: ${pitch.industry}</p><p>Funding Needs: $${pitch.funding}</p>`;
    pitchPreview.appendChild(div);
    pitchForm.reset();
  });

  // Investor Search
  const investorForm = document.getElementById('investor-search');
  const investorResults = document.getElementById('investor-results');
  investorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const industry = document.getElementById('investor-industry').value;
    const stage = document.getElementById('investor-stage').value;
    investorResults.innerHTML = '';
    const matches = mockInvestors.filter(investor => 
      investor.industry.toLowerCase() === industry.toLowerCase() && 
      investor.stage.toLowerCase() === stage.toLowerCase()
    );
    matches.forEach(investor => {
      const div = document.createElement('div');
      div.textContent = `${investor.name} - ${investor.industry}, ${investor.stage}`;
      investorResults.appendChild(div);
    });
  });
}
