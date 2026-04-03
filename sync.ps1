# Athithya Foundation - Auto-Sync to GitHub
Write-Host "🚀 Starting Auto-Sync..." -ForegroundColor Cyan

# 1. Add all changes (Mosaic, Header, etc.)
git add .

# 2. Commit with a timestamped message
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "Website Update - $timestamp"

# 3. Push to GitHub (Vercel will see this and update)
git push origin main

Write-Host "✅ Sync Complete! Your website will update on Vercel in 60 seconds." -ForegroundColor Green
