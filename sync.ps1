# Universal Sync Script for Athithya Foundation
Write-Host "--- Syncing Website ---" -ForegroundColor Yellow

# 1. Pull any remote changes first
git pull origin main --rebase

# 2. Add EVERYTHING (Mosaic, SEO, Header, Subfolders)
git add -A

# 3. Commit with time
$date = Get-Date -Format "HH:mm:ss"
git commit -m "Site Update at $date"

# 4. Push to GitHub
git push origin main

Write-Host "--- DONE! Website is updating... ---" -ForegroundColor Green
