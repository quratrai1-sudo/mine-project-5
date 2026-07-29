document.addEventListener('DOMContentLoaded', () => {
    initTheme();
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

/* ==========================================================================
   1. AUTHENTICATION & VALIDATION
   ========================================================================== */
function handleLogin(event) {
    event.preventDefault();
    const emailInput = document.getElementById('email').value.trim();
    const passwordInput = document.getElementById('password').value;

    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    
    emailError.textContent = '';
    passwordError.textContent = '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isRollNo = /^[0-9]{4}[a-z]+-[a-z]+-[0-9]+$/i.test(emailInput);

    if (!isRollNo && !emailRegex.test(emailInput)) {
        emailError.textContent = 'Enter a valid email (e.g., student@mul.edu.pk) or Roll No.';
        return;
    }

    if (passwordInput.length < 4) {
        passwordError.textContent = 'Password must be at least 4 characters.';
        return;
    }

    // Hide Login & Show App Layout
    document.getElementById('login-page').classList.remove('active-page');
    document.getElementById('portal-app-layout').style.display = 'flex';
    
    switchPage('courses');
}

function logout() {
    document.getElementById('portal-app-layout').style.display = 'none';
    document.getElementById('login-page').classList.add('active-page');
    document.getElementById('login-form').reset();
}

function togglePasswordVisibility() {
    const pwd = document.getElementById('password');
    const icon = document.getElementById('toggle-password');
    if (pwd.type === 'password') {
        pwd.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        pwd.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

function showPasswordReminder() {
    alert("For testing: Enter any valid email format (e.g., test@mul.edu.pk) and any password to access.");
}

/* ==========================================================================
   2. PAGE NAVIGATION & SIDEBAR TOGGLE
   ========================================================================== */
function switchPage(pageId) {
    document.querySelectorAll('.portal-page').forEach(page => page.classList.remove('active-page'));
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));

    const target = document.getElementById(`${pageId}-page`);
    if (target) target.classList.add('active-page');

    const activeMenu = document.querySelector(`.menu-item[href="#${pageId}"]`);
    if (activeMenu) activeMenu.classList.add('active');

    const titles = {
        'courses': 'Courses',
        'schedule': 'Lecture Schedule',
        'profile': 'Student Profile'
    };
    document.getElementById('page-heading').textContent = titles[pageId] || 'Portal';
    document.getElementById('sidebar').classList.remove('mobile-open');

    if (pageId === 'courses') {
        closeCourseDetails();
    }
}

function toggleSidebarMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('mobile-open');
}

/* ==========================================================================
   3. DAILY SCHEDULE TAB SWITCHER
   ========================================================================== */
function showScheduleDay(dayId, btn) {
    document.querySelectorAll('.day-schedule-content').forEach(d => d.classList.remove('active'));
    document.querySelectorAll('.day-tab').forEach(b => b.classList.remove('active'));

    document.getElementById(`schedule-${dayId}`).classList.add('active');
    btn.classList.add('active');
}

/* ==========================================================================
   4. COURSE DETAILS & DYNAMIC TEACHER AVATARS
   ========================================================================== */
function openCourseDetails(code, title, teacher, email, avatarUrl) {
    document.getElementById('active-course-code').textContent = `${code} - ${title}`;
    document.getElementById('info-course-title').textContent = `${code} - ${title}`;
    document.getElementById('active-teacher-name').textContent = teacher;
    document.getElementById('active-teacher-email').textContent = `Email : ${email}`;
    
    // Set instructor image avatar dynamically
    const avatarImg = document.getElementById('teacher-avatar-img');
    avatarImg.src = avatarUrl;

    document.getElementById('courses-grid-wrapper').style.display = 'none';
    document.getElementById('course-detail-wrapper').style.display = 'block';
}

function closeCourseDetails() {
    document.getElementById('course-detail-wrapper').style.display = 'none';
    document.getElementById('courses-grid-wrapper').style.display = 'block';
}

function switchCourseTab(evt, tabId) {
    document.querySelectorAll('.c-tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.c-tab-btn').forEach(b => b.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    evt.currentTarget.classList.add('active');
}

/* ==========================================================================
   5. JOBS MODAL & EXPANDABLE DETAILS
   ========================================================================== */
function openJobsModal() {
    document.getElementById('jobs-modal').style.display = 'flex';
}

function closeJobsModal() {
    document.getElementById('jobs-modal').style.display = 'none';
}

function toggleJobDetails(jobId) {
    const details = document.getElementById(jobId);
    if (details.style.display === 'none') {
        details.style.display = 'block';
    } else {
        details.style.display = 'none';
    }
}

/* ==========================================================================
   6. UTILITIES & THEME TOGGLE
   ========================================================================== */
function showFileName(input) {
    const name = input.files[0] ? input.files[0].name : "No file chosen";
    document.getElementById('selected-file-name').textContent = `Selected: ${name}`;
}

function handleAssignmentUpload(e) {
    e.preventDefault();
    alert("Assignment document submitted successfully!");
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
}