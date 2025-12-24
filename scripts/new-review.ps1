param(
    [Parameter(Mandatory=$true)]
    [string]$Title,
    
    [Parameter(Mandatory=$true)]
    [ValidateSet("module", "book", "tool", "resource", "other")]
    [string]$Category,
    
    [string]$ModuleCode = "",
    [string]$Semester = "",
    [ValidateRange(1,5)]
    [int]$Rating = 0,
    [string[]]$Tags = @()
)

$date = Get-Date -Format "yyyy-MM-dd"
$slug = "$date-$($Title.ToLower().Replace(' ', '-'))"
$filename = "$slug.md"
$filepath = "src/content/reviews/$filename"

# Format tags
$tagsString = if ($Tags.Count -gt 0) {
    ($Tags | ForEach-Object { "`"$_`"" }) -join ", "
} else {
    ""
}

# Build optional fields
$moduleCodeLine = if ($ModuleCode) { "moduleCode: `"$ModuleCode`"" } else { "moduleCode: `"`"  # Optional" }
$semesterLine = if ($Semester) { "semester: `"$Semester`"" } else { "semester: `"`"  # Optional" }
$ratingLine = if ($Rating -gt 0) { "rating: $Rating" } else { "rating: 0  # Optional (1-5 stars)" }

$template = @"
---
title: "$Title"
pubDate: $date
lastUpdated: $date
description: "Brief description"
category: $Category
$moduleCodeLine
$semesterLine
$ratingLine
tags: [$tagsString]
disclaimer: ""  # Optional
draft: true
---

## Overview
Brief overview of what you're reviewing.

## The Good
What worked well / what you liked

## The Bad
What didn't work / what could be improved

## Key Takeaways
Main lessons learned

## Resources
- Link 1
- Link 2

## Recommendation
Who would benefit from this? Final thoughts.
"@

New-Item -Path $filepath -Value $template -Force
Write-Host "Created review: $filepath" -ForegroundColor Green
Write-Host "Category: $Category" -ForegroundColor Cyan
if ($ModuleCode) { Write-Host "Module Code: $ModuleCode" -ForegroundColor Cyan }
if ($Semester) { Write-Host "Semester: $Semester" -ForegroundColor Cyan }
if ($Rating -gt 0) { Write-Host "Rating: $Rating/5 stars" -ForegroundColor Cyan }
code $filepath
