param(
    [Parameter(Mandatory=$true)]
    [string]$CtfName,
    
    [Parameter(Mandatory=$true)]
    [string]$ChallengeName,
    
    [string]$Category = "misc",
    [string]$Difficulty = "medium"
)

$date = Get-Date -Format "yyyy-MM-dd"
$slug = "$date-$($CtfName.ToLower().Replace(' ', '-'))-$($ChallengeName.ToLower().Replace(' ', '-'))"
$filename = "$slug.md"
$filepath = "src/content/writeups/$filename"

$template = @"
---
title: "$CtfName - $ChallengeName"
pubDate: $date
lastUpdated: $date
description: "Writeup for $ChallengeName from $CtfName"
ctfName: "$CtfName"
draft: true
tags: ["$Category", "$Difficulty"]
---

## Challenge Description

[Paste challenge description here]

**Category:** $Category
**Difficulty:** $Difficulty

## Initial Analysis

[Your initial observations]

## Solution

### Step 1: Reconnaissance

[Your approach]

## Flag

flag{...}

## Tools Used

- [Tool name] - [Purpose]

## Lessons Learned

- [Key takeaway]

## References

- [Useful link]
"@

New-Item -Path $filepath -Value $template -Force
Write-Host "Created writeup: $filepath" -ForegroundColor Green
Write-Host "Edit it at: $filepath" -ForegroundColor Cyan
code $filepath  # Opens in VS Code