// Auth Toggle
function toggleAuth() {
    const login = document.getElementById('login-form');
    const signup = document.getElementById('signup-form');
    if (login.classList.contains('hidden')) {
        login.classList.remove('hidden');
        signup.classList.add('hidden');
    } else {
        login.classList.add('hidden');
        signup.classList.remove('hidden');
    }
}

// Handle Login (redirects to Home)
function handleLogin(e) {
    e.preventDefault();
    // In a real app, send POST request to Flask
    window.location.href = "/";
}

// Tab Switching (For Data Page)
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    
    const content = document.getElementById('tab-' + tabName);
    if(content) content.classList.add('active');
    
    // Find button to set active
    const buttons = document.querySelectorAll('.tab');
    buttons.forEach(btn => {
        if(btn.innerText.toLowerCase().includes(tabName.toLowerCase())) {
           btn.classList.add('active');
        } else if (tabName === 'dataset' && btn.innerText.includes('Dataset')) {
            btn.classList.add('active');
        } else if (tabName === 'model' && btn.innerText.includes('Architecture')) {
            btn.classList.add('active');
        }
    });
}

// File Upload Logic
let selectedFile = null;

function handleFileSelect(input) {
    if (input.files && input.files[0]) {
        selectedFile = input.files[0];
        document.getElementById('dropText').innerText = "File Selected";
        document.getElementById('dropSubText').innerHTML = `<strong>${selectedFile.name}</strong><br><span style="color:green; font-size:0.8rem">Ready to analyze</span>`;
        document.getElementById('dropArea').classList.add('active');
        
        const btn = document.getElementById('predictBtn');
        btn.disabled = false;
        btn.innerText = "Run Prediction";

        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('previewImage');
            if(preview) {
                preview.src = e.target.result;
                preview.style.display = 'block';
                document.getElementById('previewText').style.display = 'none';
            }
        }
        reader.readAsDataURL(selectedFile);
    }
}

function runPrediction() {
    if (!selectedFile) return;

    const btn = document.getElementById('predictBtn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    btn.disabled = true;

    // Simulation of delay, then redirect to results
    setTimeout(() => {
        // In a real Flask app, you'd POST the file form here
        window.location.href = "/result";
    }, 2000);
}

// View All Rows in Table (Home Page)
function toggleViewAll() {
    const rows = document.querySelectorAll('.extra-row');
    const btn = document.getElementById('viewAllBtn');
    
    if (rows.length > 0) {
        const isHidden = rows[0].style.display === 'none' || rows[0].style.display === '';
        if (isHidden) {
            rows.forEach(row => {
                row.style.display = 'table-row';
                row.classList.add('visible');
            });
            btn.innerText = "Show Less";
        } else {
            rows.forEach(row => {
                row.style.display = 'none';
                row.classList.remove('visible');
            });
            btn.innerText = "View All";
        }
    }
}