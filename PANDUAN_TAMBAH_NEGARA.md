# PANDUAN: Tambah Kolum "Negara" di Google Sheets

## 📋 Langkah-langkah:

### 1. Buka Google Sheets Anda
Buka spreadsheet yang digunakan untuk collect data pendaftaran

### 2. Tambah Kolum "Negara"
Di baris header (Row 1), tambah kolum baru "Negara" selepas kolum "Phone"

Susunan kolum sepatutnya:
```
| Name | Email | Phone | Negara | Timestamp |
```

### 3. Update Google Apps Script

a) Di Google Sheets, pergi ke **Extensions > Apps Script**

b) Cari code yang ada function `doPost(e)` 

c) Update bahagian yang extract data daripada request. 

**SEBELUM:**
```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Append data to sheet
    sheet.appendRow([
      data.name,
      data.email,
      data.phone,
      data.timestamp
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

**SELEPAS (WITH COUNTRY):**
```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Append data to sheet
    sheet.appendRow([
      data.name,
      data.email,
      data.phone,
      data.country,      // ← TAMBAH INI
      data.timestamp
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 4. Deploy Update

a) Klik **Deploy > Manage deployments**

b) Klik icon **pencil (Edit)** di sebelah deployment yang active

c) Di bahagian "Version", pilih **"New version"**

d) Klik **Deploy**

e) Klik **Done**

### 5. Test

Selepas update, cuba submit form untuk test sama ada field "Negara" masuk ke spreadsheet.

---

## ✅ Checklist

- [ ] Tambah kolum "Negara" di Google Sheets (antara Phone dan Timestamp)
- [ ] Update Apps Script untuk include `data.country`
- [ ] Deploy new version
- [ ] Test form submission

---

## 🔍 Troubleshooting

**Jika data negara tidak masuk:**
1. Check sama ada kolum "Negara" betul-betul ada di spreadsheet
2. Pastikan Apps Script dah di-deploy dengan version baru
3. Check console browser (F12) untuk error messages
4. Pastikan field negara dipilih sebelum submit form

**Jika ada error "undefined":**
- Mungkin Apps Script belum di-update atau deployment tidak berjaya
- Cuba deploy semula dengan new version
