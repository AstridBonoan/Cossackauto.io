Set-Location 'C:\Users\astri\OneDrive\Desktop\cossack_auto'
Write-Output '== raw index check =='
try {
   = Invoke-WebRequest -Uri 'https://raw.githubusercontent.com/AstridBonoan/cossackauto.github.io/gh-pages/index.html' -UseBasicParsing -TimeoutSec 15
   = .Content
  Write-Output  fetched length: 0 
  if (.Length -gt 0) {
    Write-Output '--- start of index.html ---'
    Write-Output .Substring(0, [Math]::Min(800,.Length))
  }
} catch {
  Write-Output ('error: {0}' -f .Exception.Message)
}
