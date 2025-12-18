---
title: JavaScript Deobfuscation - HTB Academy
pubDate: 2025-12-18
tags:
  - basics
  - htb-academy
  - javascript
  - web-exploit
  - obfuscation
description: basics of deobfuscation and decoding JavaScript code
disclaimer: This article contains exact quotes from HTB's module. There will be minimal walkthrough for the questions. You are highly encouraged to try them yourself.
draft: false
---
Download cheatsheet [here](https://academy.hackthebox.com/module/cheatsheet/41)

Code Deobfuscation is important for code analysis and reverse engineering.
- locate JavaScript code
- Intro to Code Obfuscation
- How to Deobfuscate JavaScript code
- How to decode encoded messages
- Basic Code Analysis
- Sending basic HTTP requests
## Code Obfuscation
Obfuscation is a technique used to make a script more difficult to read by humans but allows it to function the same from a technical point of view.
>[!danger] 
>Usually, code is turned into a dictionary of all the words and symbols used within the code and then attempt to rebuild the original code during execution by referring to each word and symbol from the dictionary.

People obfuscate their code to:

- hide code's original functionality
- provide security layer when dealing with authentication or encryption
- malicious actions
## Basic Obfuscation
Code minification means having the entire code in a single line.

[BeautifyTools](http://beautifytools.com/javascript-obfuscator.php) for code obfuscation

[JSONConsole](https://jsconsole.com/) for code testing after obfuscation
## Advanced Obfuscation
[Obfuscator](https://obfuscator.io/)

[JSF****](http://www.jsfuck.com/)

[JJ Encode](https://utf-8.jp/public/jjencode.html)

[AA Encode](https://utf-8.jp/public/aaencode.html)
## Deobfuscation
[Prettier](https://prettier.io/playground/)

[Unpack](https://matthewfl.com/unPacker.html)
## Code Analysis
```javascript
'use strict';
function generateSerial() {
  ...SNIP...
  var xhr = new XMLHttpRequest;
  var url = "/serial.php";
  xhr.open("POST", url, true);
  xhr.send(null);
};
```

- variable `xhr` creates an object of `XMLHttpRequest`.
- `XMLHttpRequest` handles web requests
- `url` contains URL to `/serial.php`
- the next lines opens and sends the HTTP request to the URL

`N2gxNV8xNV9hX3MzY3IzN19tMzU1NGcz`
## Decoding
S-Tier Tool Box: [CyberChef](https://gchq.github.io/CyberChef/)

To **encode** any text into `base64` :
```bash
echo https://www.hackthebox.eu/ | base64
```

To decode any `base64` encoded string:
```bash
echo aHR0cHM6Ly93d3cuaGFja3RoZWJveC5ldS8K | base64 -d
```

To encode any string into `hex`:
```bash
echo https://www.hackthebox.eu/ | xxd -p
```

To decode any `hex` encoded string:
```bash
echo 68747470733a2f2f7777772e6861636b746865626f782e65752f0a | xxd -p -r
```

ROT13
```bash
echo https://www.hackthebox.eu/ | tr 'A-Za-z' 'N-ZA-Mn-za-m'
```

```bash
curl -s http://94.237.120.137:45888/serial.php -X POST -d "serial=7h15_15_a_s3cr37_m3554g3"

```

[Cipher Identifier](https://www.boxentriq.com/code-breaking/cipher-identifier)


