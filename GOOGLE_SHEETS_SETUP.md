# 📊 Google Sheets Integration Setup Guide

## Overview
System ini akan save semua form submissions ke Google Sheets secara automatik. Bila user submit form, data akan masuk ke spreadsheet anda.

---

## 🎯 Step-by-Step Setup (10 minit sahaja!)

### **Step 1: Create Google Sheet**

1. **Login** ke Google Account anda: **kbcimb@gmail.com**

2. **Create New Sheet:**
   - Pergi ke: https://sheets.google.com
   - Click **"+ Blank"** untuk create spreadsheet baru
   - Name spreadsheet: **"MLM Recruitment Data"**

3. **Setup Headers:**
   Row pertama (A1:D1), masukkan headers ini:
   
   | A1 | B1 | C1 | D1 |
   |---|---|---|---|
   | **Timestamp** | **Nama** | **Email** | **No Telefon** |

4. **Format Columns (Optional):**
   - Column A (Timestamp): Format as "Date time"
   - Make headers BOLD
   - Add filter (Data > Create a filter)

5. **Copy Spreadsheet ID:**
   - URL your sheet: `https://docs.google.com/spreadsheets/d/[THIS_IS_YOUR_SHEET_ID]/edit`
   - Copy the ID (between `/d/` and `/edit`)
   - **Save this ID** - you'll need it in Step 3

---

### **Step 2: Create Google Apps Script**

1. **Open Script Editor:**
   - In your Google Sheet, go to: **Extensions** > **Apps Script**
   - Delete any default code

2. **Paste This Code:**

```javascript
// Google Apps Script for MLM Recruitment Form
// This script receives form data and saves it to Google Sheets

// Your Google Sheet ID (replace with your actual sheet ID from Step 1)
const SHEET_ID = 'PASTE_YOUR_SHEET_ID_HERE';
const SHEET_NAME = 'Sheet1'; // or 'MLM Recruitment Data' if you renamed it

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the spreadsheet and sheet
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    // Prepare row data
    const rowData = [
      data.timestamp,  // Timestamp
      data.name,       // Nama
      data.email,      // Email
      data.phone       // No Telefon
    ];
    
    // Append row to sheet
    sheet.appendRow(rowData);
    
    // Log success
    Logger.log('✅ Data saved: ' + JSON.stringify(data));
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log error
    Logger.log('❌ Error: ' + error.toString());
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional - for testing)
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        phone: '012-3456 7890',
        timestamp: new Date().toLocaleString('ms-MY', { timeZone: 'Asia/Kuala_Lumpur' })
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
```

3. **Update SHEET_ID:**
   - Line 5: Replace `'PASTE_YOUR_SHEET_ID_HERE'` with your actual Sheet ID from Step 1
   - Example: `const SHEET_ID = '1AbC123xyz-YOUR-ACTUAL-ID';`

4. **Save the Script:**
   - Click 💾 **Save** icon
   - Name your project: **"MLM Form Handler"**

---

### **Step 3: Deploy as Web App**

1. **Click Deploy:**
   - Click **Deploy** button (top right)
   - Select **"New deployment"**

2. **Configure Deployment:**
   - Under **"Select type"**: Click ⚙️ gear icon, choose **"Web app"**
   
   - **Description:** "MLM Recruitment Form Handler"
   
   - **Execute as:** **Me** (kbcimb@gmail.com)
   
   - **Who has access:** **Anyone** (important!)
   
   - Click **Deploy**

3. **Authorize:**
   - Click **"Authorize access"**
   - Choose your Google account (kbcimb@gmail.com)
   - Click **"Advanced"** > **"Go to MLM Form Handler (unsafe)"**
   - Click **"Allow"**

4. **Copy Web App URL:**
   - After deployment, you'll see a **Web app URL**
   - It looks like: `https://script.google.com/macros/s/AKfycby.../exec`
   - **COPY THIS URL** - you need it for Step 4!

---

### **Step 4: Update Website Code**

1. **Edit script.js:**
   - Open file: `c:\Users\User\website recruitment\script.js`
   
   - Find line 5:
   ```javascript
   const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
   
   - Replace with your Web App URL:
   ```javascript
   const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_URL/exec';
   ```

2. **Save the file**

3. **Push to GitHub:**
   ```bash
   cd "c:\Users\User\website recruitment"
   git add script.js
   git commit -m "Added Google Sheets integration"
   git push
   ```

4. **Wait 1-2 minutes** for GitHub Pages to update

---

## ✅ Testing

1. **Visit your website:** https://cikgukb.github.io/mlm/

2. **Fill the form:**
   - Nama: Test User
   - Email: test@example.com  
   - No Telefon: 012-3456 7890

3. **Submit form**

4. **Check Google Sheet:**
   - New row should appear with the data!
   - If it works: **Setup complete!** 🎉
   - If not: Check troubleshooting below

---

## 🔧 Troubleshooting

### ❌ Data not appearing in sheet?

1. **Check Apps Script Logs:**
   - Open Apps Script editor
   - Click **Executions** (left sidebar)
   - Check for errors

2. **Verify Web App URL:**
   - Make sure URL in `script.js` is correct
   - Must end with `/exec`

3. **Check Permissions:**
   - Web app must be set to **"Anyone"**
   - You must authorize the script

4. **Test Manually:**
   - In Apps Script, run `testDoPost()` function
   - Check if test data appears in sheet

---

## 📊 Viewing Your Data

**Google Sheet URL (after creating):**
```
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit
```

**Features:**
- ✅ Real-time data collection
- ✅ Sortable & filterable columns
- ✅ Export to Excel/CSV
- ✅ Share with team members
- ✅ Create charts & reports
- ✅ Set up email notifications (advanced)

---

## 🎯 Summary Checklist

- [ ] Create Google Sheet dengan headers
- [ ] Copy Sheet ID
- [ ] Create Apps Script dengan code di atas
- [ ] Update SHEET_ID dalam script
- [ ] Deploy as Web App
- [ ] Authorize permissions
- [ ] Copy Web App URL
- [ ] Update script.js dengan Web App URL
- [ ] Push ke GitHub
- [ ] Test submission
- [ ] Verify data in Google Sheet

---

## 📝 Important Notes

1. **Backup:** Data also saved in browser localStorage as backup
2. **Privacy:** Only you (kbcimb@gmail.com) can access the Google Sheet
3. **Limit:** Google Apps Script has 20,000 executions per day (more than enough!)
4. **Free:** This solution is 100% FREE!

---

## 🎉 After Setup Complete

When setup is done, every form submission will:
1. ✅ Save to Google Sheets
2. ✅ Save to localStorage (backup)
3. ✅ Show success message
4. ✅ Redirect to WhatsApp group

**You can view all submissions in real-time in your Google Sheet!**

---

**Need help?** Double-check each step carefully. Most issues come from:
- Wrong Sheet ID
- Wrong Web App URL  
- Missing authorization
- Wrong "Who has access" setting

Good luck! 🚀
