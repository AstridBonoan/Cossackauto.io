Set-Location 'C:\Users\astri\OneDrive\Desktop\cossack_auto'
Write-Output '== git ls-remote (gh-pages) =='
try { git ls-remote 'https://github.com/AstridBonoan/cossackauto.github.io.git' 'refs/heads/gh-pages' | ForEach-Object { Write-Output  } } catch { Write-Output 'git ls-remote failed: ' + .Exception.Message }

 = @(
  'https://astridbonoan.github.io/cossackauto.github.io/',
  'https://astridbonoan.github.io/cossackauto/',
  'https://astridbonoan.github.io/'
)
Write-Output '== Pages URL checks =='
foreach ( in ) {
  try {
     = Invoke-WebRequest -Uri  -UseBasicParsing -Method Head -TimeoutSec 15
    Write-Output  -> 
  } catch {
    Write-Output  -> error: 
  }
}
