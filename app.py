from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = 'neuroscan_secret_key'  # Required for flash messages

# --- ROUTES ---

@app.route('/')
def index():
    return render_template('index.html')

# This route renders the Auth page (Login/Signup)
@app.route('/auth')
def auth():
    return render_template('auth.html')

# Redirect /login to /auth for consistency
@app.route('/login')
def login():
    return redirect(url_for('auth'))

# --- BACKEND LOGIC FOR SIGN IN ---
@app.route('/login_submit', methods=['POST'])
def login_submit():
    email = request.form.get('email')
    password = request.form.get('password')
    
    # SIMPLE DEMO LOGIC:
    # In a real app, you would check a database here.
    if email and password:
        print(f"User logged in: {email}") # Shows in your VS Code terminal
        return redirect(url_for('index')) # Redirect to Home Dashboard
    else:
        flash("Please fill in all fields.")
        return redirect(url_for('auth'))

# --- BACKEND LOGIC FOR SIGN UP ---
@app.route('/signup_submit', methods=['POST'])
def signup_submit():
    fullname = request.form.get('fullname')
    email = request.form.get('email')
    password = request.form.get('password')
    confirm = request.form.get('confirm_password')

    if password != confirm:
        flash("Passwords do not match!")
        return redirect(url_for('auth'))
    
    # DEMO LOGIC:
    print(f"New Account Created: {fullname} | {email}") # Shows in terminal
    return redirect(url_for('index')) # Redirect to Home Dashboard

# --- OTHER PAGES ---
@app.route('/upload')
def upload(): return render_template('upload.html')

@app.route('/result')
def result(): return render_template('result.html')

@app.route('/about')
def about(): return render_template('about.html')

@app.route('/data')
def data(): return render_template('data.html')

@app.route('/guide')
def guide(): return render_template('guide.html')

@app.route('/contact')
def contact(): return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True)