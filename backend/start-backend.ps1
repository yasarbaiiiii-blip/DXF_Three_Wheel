$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot\PX4_DXP\server

$env:ROVER_DISABLE_AUTH = "1"
$env:FASTAPI_PORT = "5001"

if (-not (Get-Command uvicorn -ErrorAction SilentlyContinue)) {
  Write-Host "uvicorn not found. Install backend dependencies first:" -ForegroundColor Yellow
  Write-Host "  pip install -r requirements.txt" -ForegroundColor Yellow
  exit 1
}

Write-Host "Starting backend on http://0.0.0.0:5001 ..." -ForegroundColor Cyan
python -m uvicorn main:app --host 0.0.0.0 --port 5001 --log-level info
