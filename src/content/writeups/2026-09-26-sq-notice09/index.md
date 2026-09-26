---
title: "SQ_NOTICE09"
pubDate: 2026-09-26
lastUpdated: 2026-09-26
description: "Recovering clearance from raw printer spool output using a rotated Cardan grille stencil and ESC/P emphasized mode extraction."
ctfName: "Singapore Cyber Conquest 2026"
draft: false
tags: ["forensics", "esc-p", "printer-spool", "steganography", "xor", "cardan-grille", "scc"]
---

# Problem

>[!caution] Description
>Recover the clearance from the archived spool.
>
>The capture is raw printer output. Anything that rewrites it as text, fixes its line endings or renders it will destroy part of the evidence and will not tell you it has.

# Challenge Files

- `NOTICE09.PRN` (698 bytes): Raw printer spool output containing escape sequences.
- `ROSTER.TXT` (307 bytes): Shift roster table mapping watches to cut authorities.
- `TEMPLATES.DOC` (4 KB): Stencil / grille cutout patterns.
- `SEALED.BIN` (89 bytes): Encrypted binary payload.

<!-- Add challenge files screenshot here -->

# Initial Analysis

The prompt cautions that `NOTICE09.PRN` is raw printer output. Treating it as plain text or modifying line endings risks stripping invisible control bytes.

Examining `NOTICE09.PRN`:
- The header notes: `AUTH SER 4471   WATCH 3   SHEET 1 OF 1`
- Further down: `STENCIL FILED NEOFTCH-UP. THIESF SHEET PRINTS NOTECFH-RIGHT.`
- Followed by a $12 \times 12$ matrix of letters labeled: `BLOCK 9 -- 12 BY 12 -- APPLY STENCIL IN FORCE`

<!-- Add notice09.prn header & text block screenshot here -->

---

# Solution

### Step 1: Identify the Stencil

1. In `ROSTER.TXT`, look up **WATCH 3**:
   ```text
   WATCH 3   RELIEF 2230   CUT AUTHORITY 31
   ```
2. In `TEMPLATES.DOC`, search for serial `4471` matching `CUT COUNT 31`. This gives stencil **`SER 4471-J`** (a $12 \times 12$ punch pattern).

<!-- Add roster.txt and templates.doc screenshots here -->

### Step 2: Rotate and Apply the Stencil (Cardan Grille)

The notice specifies:
> `STENCIL FILED NEOFTCH-UP. THIESF SHEET PRINTS NOTECFH-RIGHT.`

- The stencil template was cataloged **notch-up**, but the physical sheet prints **notch-right**.
- We need to rotate the stencil **90° clockwise**.

Overlaying the rotated $12 \times 12$ stencil onto the letter block in `NOTICE09.PRN`:

```text
.....KE.....
............
..Y.........
.....I..S...
TH..........
.....E.E....
.......MP...
.HA....S....
..I.S..R..U.
...NINP...R.
.....I...N.T
..OR...DE..R
```

Reading the revealed characters in sequence spells out:
> **`KEY IS THE EMPHASIS RUN IN PRINT ORDER`**

<!-- Add stencil rotation and overlay screenshot here -->

### Step 3: Inspect ESC/P Printer Control Codes

In the **Epson ESC/P** printer control language:
- `ESC E` (`0x1B 0x45`, ASCII 27 69): **Select emphasized (bold) mode**
- `ESC F` (`0x1B 0x46`, ASCII 27 70): **Cancel emphasized mode**

<!-- Add ESC/P documentation screenshot here -->

Inspecting `NOTICE09.PRN` with a hex viewer (`xxd NOTICE09.PRN`), specific letters across the notice are wrapped in `1b 45` and `1b 46`:

```text
00000010: ... 1b 45 47 1b 46 ...   -> 'G'
00000060: ... 1b 45 42 1b 46 ...   -> 'B'
00000070: ... 1b 45 44 1b 46 ...   -> 'D'
00000080: ... 1b 45 45 1b 46 ...   -> 'E'
...
```

Collecting every emphasized character in print order gives the XOR key:
```text
GBDEOAOOSCML
```

<!-- Add xxd hex dump screenshot here -->

### Step 4: Decrypt SEALED.BIN

With the key `GBDEOAOOSCML`, we perform a repeating-key XOR against `SEALED.BIN`:

```python
from pathlib import Path

KEY = b"GBDEOAOOSCML"

ciphertext = Path("SEALED.BIN").read_bytes()

plaintext = bytes(
    byte ^ KEY[i % len(KEY)]
    for i, byte in enumerate(ciphertext)
)

print(plaintext.decode("ascii"), end="")
```

Running the solve script:
```text
$ python3 solve.py
CONTINUITY NOTICE 9 OF 9 FROM P-0
CLEARANCE flag{n0t1c3_n1n3_jr_70b90f256d}
CHK 4DA9EDC6
```

The checksum `4DA9EDC6` matches `SEAL CHK 4DA9EDC6` from `NOTICE09.PRN`, confirming integrity.

---

## Flag

`flag{n0t1c3_n1n3_jr_70b90f256d}`

## References

- [Epson ESC/P Reference Manual (Emphasized Mode pg. 71, 92)](https://support.epson.biz/support/cloud/Mobile/Android/EP-M-001/manual/en/esc_p_reference.pdf)
- [Cardan Grille (Steganography / Classical Cipher)](https://en.wikipedia.org/wiki/Cardan_grille)
