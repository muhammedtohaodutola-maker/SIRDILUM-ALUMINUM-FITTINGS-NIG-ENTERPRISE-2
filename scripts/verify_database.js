const https = require('https');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://drrtflkfyolofejuoofx.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRycnRmbGtmeW9sb2ZlanVvb2Z4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzcxMzQ5NywiZXhwIjoyMTA5Mjg5NDk3fQ.-TtgezeGnfWsVni5J0282FQu7FYFyY1wYTjanumZU-M';

const hostname = SUPABASE_URL.replace('https://', '').replace('/', '');

const tablesToCheck = [
  'profiles',
  'products',
  'quotes',
  'orders',
  'order_milestones',
  'contacts',
  'building_material_receipts',
  'ready_made_receipts',
  'custom_fabrication_receipts'
];

console.log('🔍 Checking SIRDILUM Supabase Database Tables at:', hostname);
console.log('------------------------------------------------------------');

let checked = 0;
const results = {};

tablesToCheck.forEach((tableName) => {
  const req = https.request({
    hostname,
    port: 443,
    path: `/rest/v1/${tableName}?select=count`,
    method: 'HEAD',
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Prefer': 'count=exact'
    }
  }, (res) => {
    results[tableName] = {
      status: res.statusCode,
      exists: res.statusCode >= 200 && res.statusCode < 300,
      count: res.headers['content-range'] ? res.headers['content-range'].split('/')[1] : null
    };

    checked++;
    if (checked === tablesToCheck.length) {
      report();
    }
  });

  req.on('error', (err) => {
    results[tableName] = { error: err.message, exists: false };
    checked++;
    if (checked === tablesToCheck.length) {
      report();
    }
  });

  req.end();
});

function report() {
  let allExist = true;
  for (const table of tablesToCheck) {
    const res = results[table];
    if (res.exists) {
      console.log(`✅ Table '${table}': READY (HTTP ${res.status}, Rows: ${res.count || 0})`);
    } else {
      console.log(`❌ Table '${table}': NOT FOUND (HTTP ${res.status})`);
      allExist = false;
    }
  }

  console.log('------------------------------------------------------------');
  if (allExist) {
    console.log('🎉 ALL SIRDILUM DATABASE TABLES ARE ACTIVE AND READY!');
  } else {
    console.log('⚠️ Some tables are missing. Please execute supabase_schema.sql in the Supabase SQL Editor:');
    console.log(`👉 https://supabase.com/dashboard/project/drrtflkfyolofejuoofx/sql/new`);
  }
}

