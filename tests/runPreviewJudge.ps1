$ErrorActionPreference = "Stop"

$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[Console]::InputEncoding = $utf8NoBom
[Console]::OutputEncoding = $utf8NoBom
$OutputEncoding = $utf8NoBom

try {
  chcp 65001 > $null
} catch {
  # Ignore environments without chcp.
}

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $root

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Error "node command was not found. Install Node.js and retry."
}

node tests\runPreviewJudge.cjs

if ($LASTEXITCODE -ne 0) {
  throw "Preview Judge Node runner failed with exit code $LASTEXITCODE"
}
