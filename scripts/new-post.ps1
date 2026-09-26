param(
    [Parameter(Mandatory=$true)]
    [string]$Title,
    
    [string[]]$Tags = @("general")
)

$date = Get-Date -Format "yyyy-MM-dd"
$slug = "$date-$($Title.ToLower().Replace(' ', '-'))"
$folderpath = "src/content/posts/$slug"
$filepath = "$folderpath/index.md"

$tagsString = $Tags | ForEach-Object { "`"$_`"" }
$tagsFormatted = $tagsString -join ", "

$template = @"
---
title: "$Title"
pubDate: $date
lastUpdated: $date
description: "Brief description"
draft: true
tags: [$tagsFormatted]
---

## Introduction

[Your introduction]

## Main Content

[Your content]

## Conclusion

[Your conclusion]
"@

if (!(Test-Path $folderpath)) {
    New-Item -ItemType Directory -Path $folderpath -Force | Out-Null
}
New-Item -Path $filepath -Value $template -Force
Write-Host "Created blog post: $filepath" -ForegroundColor Green
code $filepath