
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheetName = data.sheetName;

    if (!sheetName) {
      return respond({ error: 'No sheetName provided.' });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(sheetName);

    // Create the sheet if it doesn't exist yet
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    // Define exact column headers per sheet type
    let headers = [];

    if (sheetName === 'Reviews') {
      headers = ['id', 'name', 'role', 'message', 'status', 'date'];
    } else if (sheetName === 'Payments') {
      headers = ['txnId', 'name', 'email', 'phone', 'amount', 'date'];
    } else if (sheetName === 'CSR_Companies') {
      headers = ['firstName', 'lastName', 'company', 'email', 'budget', 'message', 'date'];
    } else if (sheetName === 'Contact') {
      headers = ['name', 'email', 'enquiryType', 'message', 'date'];
    } else {
      // Generic fallback: use all keys from the data (excluding sheetName)
      headers = Object.keys(data).filter(k => k !== 'sheetName');
    }

    // Write headers on first row if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      // Style the header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#E8610A');
      headerRange.setFontColor('#ffffff');
    }

    // Build the row in the exact column order
    const row = headers.map(key => {
      const val = data[key];
      if (val === undefined || val === null) return '';
      // Skip large base64 data (e.g., profile photos) to avoid cell size limits
      if (typeof val === 'string' && val.startsWith('data:')) return '[Image Uploaded]';
      return val;
    });

    sheet.appendRow(row);

    return respond({ success: true, sheet: sheetName, rows: sheet.getLastRow() - 1 });

  } catch (err) {
    return respond({ error: err.message });
  }
}

// ── GET: Reads data for Admin Panel ──
function doGet(e) {
  try {
    const sheetName = (e.parameter && e.parameter.sheetName) ? e.parameter.sheetName : 'Reviews';
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);

    if (!sheet || sheet.getLastRow() <= 1) {
      return respond([]);
    }

    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);

    const result = rows.map(row => {
      const obj = {};
      headers.forEach((header, i) => {
        obj[header] = row[i];
      });
      return obj;
    });

    return respond(result);

  } catch (err) {
    return respond({ error: err.message });
  }
}

// ── Helper: Return JSON response ──
function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
