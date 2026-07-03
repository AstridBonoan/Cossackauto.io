Set-Location 'C:\Users\astri\OneDrive\Desktop\cossack_auto'
if (-not (Test-Path 'frontend\dist')) { Write-Error 'frontend\dist not found'; exit 1 }
if (Test-Path 'ghpages-clean') { Remove-Item 'ghpages-clean' -Recurse -Force }
New-Item -ItemType Directory 'ghpages-clean' | Out-Null
cmd.exe /c robocopy 'frontend\dist' 'ghpages-clean' /MIR /NJH /NJS /NDL /NFL
Write-Output '--- ghpages-clean sample files ---'
Get-ChildItem 'ghpages-clean' -Recurse -File | Select-Object -First 20 | ForEach-Object { Write-Output .FullName }
Set-Location 'ghpages-clean'
if (Test-Path .git) { Remove-Item .git -Recurse -Force }
git init
git checkout -b gh-pages
git add -A
git commit -m 'chore(gh-pages): publish dist only' -q || Write-Output 'commit failed or nothing to commit'
try { git remote remove origin } catch { }
git remote add origin 'https://github.com/AstridBonoan/cossackauto.github.io.git'
git push --force origin gh-pages:gh-pages
