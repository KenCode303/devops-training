// ================================================================
// Google Apps Script for Form Submission to Google Sheets
// ================================================================
// INSTRUCTIONS:
// 1. Open Google Sheets and create a new spreadsheet
// 2. Name it "DevOps Training Registrations" (or whatever you like)
// 3. Go to Extensions > Apps Script
// 4. Delete any existing code in the editor
// 5. Paste this entire code
// 6. Click "Deploy" > "New deployment"
// 7. Select type: "Web app"
// 8. Execute as: "Me"
// 9. Who has access: "Anyone"
// 10. Click "Deploy" and copy the URL
// 11. Paste that URL into script.js (GOOGLE_SCRIPT_URL)
// ================================================================

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Check if header row exists, if not create it
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'Full Name',
        'Date of Birth',
        'Occupation',
        'Email',
        'Phone',
        'Highest Education',
        'Country',
        'IT Skills (1-10)',
        'Why Join DevOps Training'
      ];
      sheet.appendRow(headers);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#667eea');
      headerRange.setFontColor('#ffffff');
    }
    
    // PREVENT DUPLICATE SUBMISSIONS - Check for duplicate email
    const emailColumn = 5; // Email is the 5th column (E)
    if (sheet.getLastRow() > 1) { // Only check if there's data beyond the header
      const existingEmails = sheet.getRange(2, emailColumn, sheet.getLastRow() - 1, 1).getValues();
      const emailExists = existingEmails.some(row => row[0].toString().toLowerCase() === data.email.toLowerCase());
      
      if (emailExists) {
        return ContentService
          .createTextOutput(JSON.stringify({ 
            result: 'duplicate', 
            message: 'This email has already been used to register. Each person can only register once.' 
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Prepare row data
    const rowData = [
      new Date(data.timestamp),
      data.fullName,
      data.dob,
      data.occupation,
      data.email,
      data.phone,
      data.education,
      data.country,
      data.itSkills,
      data.reason
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, 10);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', row: sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script works
function testScript() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        fullName: 'Test User',
        dob: '1990-01-01',
        occupation: 'Software Developer',
        email: 'test@example.com',
        phone: '+1234567890',
        education: "Bachelor's Degree",
        country: 'United States',
        itSkills: '7',
        reason: 'I want to learn DevOps to advance my career'
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
