# Complete Setup Instructions

## Part 1: Set Up Google Sheets to Receive Form Data

### Step 1: Create Google Sheet
1. Go to https://sheets.google.com
2. Click **"Blank"** to create new spreadsheet
3. Name it: "DevOps Training Registrations"
4. Leave it empty (don't add headers - the script does this automatically)

### Step 2: Deploy Google Apps Script
1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any code in the editor
3. Copy **ALL** the code from `google-apps-script.js` in this folder
4. Paste it into the Apps Script editor
5. Click **💾 Save** (name it "Form Handler")
6. Click **Deploy** → **New deployment**
7. Click the ⚙️ gear icon next to "Select type"
8. Choose **Web app**
9. Configure:
   - Execute as: **Me**
   - Who has access: **Anyone**
10. Click **Deploy**
11. Click **Authorize access** (you'll see security warnings - this is normal)
    - Click "Advanced"
    - Click "Go to [Your Project Name] (unsafe)" - this is safe, it's YOUR script
    - Click "Allow"
12. **COPY THE WEB APP URL** - it looks like:
    ```
    https://script.google.com/macros/s/AKfycby.../exec
    ```

### Step 3: Configure Your Form
1. Open `script.js` in this folder
2. Find line 4:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace with your URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```
4. Save the file

### Step 4: Test It!
1. Open `index.html` in your browser
2. Fill out the form with test data
3. Submit
4. Check your Google Sheet - the data should appear!

---

## Part 2: Host the Form on the Internet

### Option 1: GitHub Pages (Free Forever)

#### Step 2.1: Create GitHub Repository
1. Go to https://github.com (sign up if needed)
2. Click **"+"** → **"New repository"**
3. Repository name: `devops-training`
4. Set to **Public**
5. Click **"Create repository"**

#### Step 2.2: Upload Files
```bash
# Option A: Using Git (if you have it installed)
cd /Users/kyeboah/src/devops-training-registration
git init
git add .
git commit -m "Initial commit: DevOps training registration form"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/devops-training.git
git push -u origin main
```

**OR**

**Option B: Upload via Web Interface**
1. In your GitHub repo, click "uploading an existing file"
2. Drag these files:
   - index.html
   - style.css
   - script.js
   - logo.jpg
3. Commit changes

#### Step 2.3: Enable GitHub Pages
1. Go to **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main**
4. Folder: **/ (root)**
5. Click **Save**
6. Wait 1-2 minutes
7. Your form will be live at:
   ```
   https://YOUR_USERNAME.github.io/devops-training/
   ```

### Option 2: Netlify (Fastest - Drag & Drop)

1. Go to https://www.netlify.com
2. Click **"Sign up"** (free)
3. After login, click **"Add new site"** → **"Deploy manually"**
4. Drag the entire folder onto the upload area
5. Wait 30 seconds
6. Your form is live at: `https://random-name-12345.netlify.app`
7. Optional: Change the site name in **Site settings** → **Change site name**

### Option 3: Vercel

1. Go to https://vercel.com
2. Sign up (free)
3. Click **"Add New"** → **"Project"**
4. Upload your files
5. Deploy
6. Get instant URL

---

## Part 3: Exporting to Excel

### Method 1: Download from Google Sheets
1. Open your Google Sheet with registrations
2. Click **File** → **Download** → **Microsoft Excel (.xlsx)**
3. Done! You have an Excel file

### Method 2: Automatic Excel Export (Advanced)
If you want automatic Excel exports, you can:
1. Use Google Sheets API to auto-export
2. Set up Google Apps Script to email you Excel files daily
3. Use Zapier/Make (formerly Integromat) to auto-sync to Excel

---

## Part 4: Preventing Duplicate Applications

### Option 1: Email-Based Deduplication (Easiest)

Add this to your `google-apps-script.js`:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Check if header row exists
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp', 'Full Name', 'Date of Birth', 'Occupation',
        'Email', 'Phone', 'Highest Education', 'Country',
        'IT Skills (1-10)', 'Why Join DevOps Training'
      ];
      sheet.appendRow(headers);
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#667eea');
      headerRange.setFontColor('#ffffff');
    }
    
    // CHECK FOR DUPLICATE EMAIL
    const emailColumn = 5; // Email is column E (5th column)
    const existingEmails = sheet.getRange(2, emailColumn, sheet.getLastRow() - 1, 1).getValues();
    const emailExists = existingEmails.some(row => row[0] === data.email);
    
    if (emailExists) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          result: 'error', 
          message: 'This email has already been used to register.' 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Add the data
    const rowData = [
      new Date(data.timestamp), data.fullName, data.dob, data.occupation,
      data.email, data.phone, data.education, data.country,
      data.itSkills, data.reason
    ];
    
    sheet.appendRow(rowData);
    sheet.autoResizeColumns(1, 10);
    
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', row: sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Option 2: Add Client-Side Warning

Update `script.js` to show a confirmation if email domain looks suspicious:

```javascript
// Add this before form submission
const email = formData.get('email');
const emailParts = email.split('@');
const domain = emailParts[1];

// Warn about temporary email services
const tempEmailDomains = ['tempmail.com', 'guerrillamail.com', '10minutemail.com', 'throwaway.email'];
if (tempEmailDomains.some(tempDomain => domain.includes(tempDomain))) {
    const proceed = confirm('Temporary email detected. Please use a permanent email address.');
    if (!proceed) return;
}
```

### Option 3: Add reCAPTCHA (Prevent Bots)

1. Get reCAPTCHA from Google: https://www.google.com/recaptcha/admin
2. Add to your form
3. Verify on submission

### Option 4: Phone Number + Email Combo

Check for duplicates on BOTH email AND phone number

---

## Summary

### To Get Your Form Live:

1. ✅ **Set up Google Sheets** (follow Part 1)
2. ✅ **Host on GitHub Pages or Netlify** (follow Part 2)
3. ✅ **Add duplicate prevention** (follow Part 4)
4. ✅ **Test everything**
5. ✅ **Share your URL**

### To Export to Excel:

- Open Google Sheet → File → Download → Excel (.xlsx)
- Or set up automatic exports

### Quick Checklist:

- [ ] Create Google Sheet
- [ ] Deploy Apps Script
- [ ] Copy Web App URL to script.js
- [ ] Test form locally
- [ ] Upload to GitHub/Netlify
- [ ] Test live form
- [ ] Check data appears in Google Sheet
- [ ] Download as Excel to verify
- [ ] Add duplicate prevention
- [ ] Share registration link!

---

## Need Help?

If you get stuck:
1. Check browser console (F12) for errors
2. Verify Google Apps Script is deployed with "Anyone" access
3. Make sure script.js has the correct URL
4. Test the form locally first before deploying

## Your Form Will Be:
- 🌐 Accessible worldwide
- 💾 Saving to Google Sheets automatically
- 📊 Exportable to Excel anytime
- 🔒 Protected from duplicates
- 📱 Mobile-friendly
- 🆓 100% FREE!
