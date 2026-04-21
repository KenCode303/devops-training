# DevOps Training Registration Form

A beautiful, free, static HTML form that saves registrations directly to Google Sheets. No database required!

## ✨ Features

- ✅ **100% Free** - No limits on submissions
- ✅ **No Backend Needed** - Pure HTML/CSS/JS with Google Sheets
- ✅ **Beautiful Design** - Modern, responsive, professional look
- ✅ **Easy to Customize** - Change colors, fonts, and layout easily
- ✅ **Mobile Friendly** - Works perfectly on all devices
- ✅ **Export to Excel** - Google Sheets can export to Excel anytime

## 📋 Form Fields

1. Full Name (required)
2. Date of Birth (optional)
3. Occupation (required)
4. Email Address (required)
5. Phone Number (required)
6. Highest Education (dropdown, required)
7. Country (dropdown, required)
8. IT Skills Rating (1-10 slider, required)
9. Why Join DevOps Training (text area, required)

## 🚀 Setup Instructions

### Step 1: Set Up Google Sheets

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"Blank"** to create a new spreadsheet
3. Name it "DevOps Training Registrations" (or whatever you prefer)
4. Leave it empty - the script will create headers automatically

### Step 2: Deploy Google Apps Script

1. In your Google Sheet, click **Extensions** > **Apps Script**
2. Delete any existing code in the editor
3. Open the file `google-apps-script.js` from this folder
4. Copy **ALL** the code and paste it into the Apps Script editor
5. Click the **💾 Save** icon (name it "Form Handler" or similar)
6. Click **Deploy** > **New deployment**
7. Click the **⚙️ gear icon** next to "Select type"
8. Choose **Web app**
9. Configure the deployment:
   - **Description**: "Form submission handler" (or whatever you like)
   - **Execute as**: **Me** (your Google account)
   - **Who has access**: **Anyone**
10. Click **Deploy**
11. **Authorize the app** (you'll need to click through Google's security warnings - this is normal)
12. **Copy the Web app URL** - it will look like:
    ```
    https://script.google.com/macros/s/AKfycbx.../exec
    ```

### Step 3: Configure the HTML Form

1. Open `script.js` in this folder
2. Find this line near the top:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with your Web app URL from Step 2:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
   ```
4. Save the file

### Step 4: Deploy Your Form

You can host the form anywhere that serves static HTML files:

#### Option A: GitHub Pages (Free, Easy)

1. Create a GitHub repository
2. Upload `index.html`, `style.css`, and `script.js`
3. Go to Settings > Pages
4. Select branch: `main`, folder: `/ (root)`
5. Click Save
6. Your form will be live at: `https://yourusername.github.io/repo-name/`

#### Option B: Netlify (Free, Drag & Drop)

1. Go to [Netlify](https://www.netlify.com)
2. Sign up for free
3. Drag and drop the folder containing `index.html`, `style.css`, `script.js`
4. Your form is live instantly!

#### Option C: Local Testing

1. Just open `index.html` in your browser
2. The form will work as long as you configured the Google Script URL

## 🎨 Customization Guide

### Add Your Logo

1. Place your logo file (PNG, JPG, or SVG) in the same folder as `index.html`
2. Rename it to `logo.png` (or update `index.html` to match your filename)
3. The logo will appear at the top of the form
4. **Optional**: Remove this line from `style.css` if you want to keep your logo's original colors:
   ```css
   filter: brightness(0) invert(1); /* This makes the logo white */
   ```

### Add Background Images or Other Images

Place any images in the folder and reference them in your HTML or CSS:

**In HTML:**
```html
<img src="your-image.jpg" alt="Description">
```

**In CSS (for backgrounds):**
```css
background-image: url('background.jpg');
```

### Change Colors

Edit `style.css` at the top where it says `:root`:

```css
:root {
    --primary-color: #2563eb;      /* Main blue color */
    --primary-hover: #1d4ed8;      /* Darker blue on hover */
    --success-color: #10b981;       /* Green for success messages */
    --error-color: #ef4444;         /* Red for errors */
}
```

### Change Form Title

Edit `index.html`:

```html
<div class="form-header">
    <h1>Your Title Here</h1>
    <p>Your subtitle here</p>
</div>
```

### Add/Remove Fields

1. **To add a field**, copy an existing form group in `index.html`:
   ```html
   <div class="form-group">
       <label for="newField">Field Name <span class="required">*</span></label>
       <input type="text" id="newField" name="newField" required>
   </div>
   ```

2. **Update the JavaScript** in `script.js` to include the new field:
   ```javascript
   const data = {
       // ... existing fields ...
       newField: formData.get('newField'),
   };
   ```

3. **Update Google Apps Script** to add the column in `google-apps-script.js`

### Change Countries List

Edit the `<select id="country">` dropdown in `index.html` to add/remove countries.

## 📊 Viewing & Exporting Data

### View Submissions

1. Go to your Google Sheet
2. All submissions appear automatically with timestamp
3. Data is organized in columns

### Export to Excel

1. In Google Sheets, click **File** > **Download** > **Microsoft Excel (.xlsx)**
2. Or use **File** > **Download** > **CSV** for CSV format

### Share with Team

1. Click the **Share** button in Google Sheets
2. Add team members' email addresses
3. Set permissions (Viewer, Commenter, or Editor)

## 🔧 Troubleshooting

### "Please configure the Google Apps Script URL" error
- You forgot to update `script.js` with your Apps Script URL

### Form submits but data doesn't appear in Google Sheet
- Check that you deployed the Apps Script with "Anyone" access
- Make sure you authorized the script to access your Google Sheet
- Try running the `testScript()` function in Apps Script to test

### "Failed to fetch" or CORS errors
- These are normal! The form uses `no-cors` mode, so you won't see the actual response
- If the form clears and shows success, it worked!

### Data appears in wrong columns
- Make sure the order of fields in Google Apps Script matches your form

## 🔒 Privacy & Security

- All data goes directly to YOUR Google Sheet
- No third-party services store your data
- You control who can access the sheet
- Form submissions are sent over HTTPS
- You can delete submissions anytime from Google Sheets

## 💡 Tips

1. **Test First**: Submit a test registration to make sure everything works
2. **Backup Data**: Periodically download the sheet as backup
3. **Monitor Submissions**: Set up Google Sheets notifications for new rows
4. **Protect Headers**: Freeze the first row in Google Sheets so headers don't scroll
5. **Add Validation**: Google Sheets has data validation features you can use

## 📱 Mobile Responsiveness

The form automatically adapts to mobile devices. Test it by:
- Opening on your phone
- Using browser dev tools (F12) and toggle device toolbar

## 🆘 Need Help?

If you run into issues:
1. Check the browser console (F12) for error messages
2. Verify the Google Apps Script is deployed with "Anyone" access
3. Make sure the script URL in `script.js` is correct
4. Test the Google Apps Script using the `testScript()` function

## 📄 License

Free to use and modify for any purpose!

---

**Created for DevOps Training Program** 
© 2026 - All submissions are saved to Google Sheets
