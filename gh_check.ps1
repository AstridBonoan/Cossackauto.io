Set-Location 'C:\Users\astri\OneDrive\Desktop\cossack_auto\frontend'
Write-Output  CWD: C:\Users\astri\OneDrive\Desktop\cossack_auto 
if (-not (Test-Path 'dist')) { Write-Output 'dist missing'; exit 0 }
 = (Get-ChildItem 'dist' -Recurse -File | Measure-Object).Count
Write-Output  dist exists - file count: 
if ( -gt 0) {
  Get-ChildItem 'dist' -Recurse -File | Select-Object -First 40 | ForEach-Object { Write-Output .FullName }
}
