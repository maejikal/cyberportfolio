---
title: Network Enumeration with Nmap - HTB Academy
pubDate: 2025-12-17
tags:
  - htb-academy
  - enumeration
  - nmap
  - basics
  - firewall
description: notes for nmap enumeration
disclaimer: This article contains exact quotes from HTB's module on ffuf. There will be minimal walkthrough for the questions. You are highly encouraged to try them yourself.
draft: false
---
Download `nmap` Cheatsheet [here](https://academy.hackthebox.com/module/cheatsheet/19)

[Nmap Network Scanning: The Official Nmap Project Guide to Network Discovery and Security Scanning](https://nmap.org/book/toc.html)

Enumeration is collecting as much information regarding a target network as much as possible, allowing us to attack a target from different ways.

Getting access to a target system can be narrowed down into the following points:
- functions and/or resources that allow us to interact with the target
- information that provides us with even more important information to access our target

VERY important that you <span style="color:rgb(255, 117, 159)">spend a couple of hours learning more about a service, how it works, and what it is meant for</span>. This will save you a lot of time when trying to get access to a system. 

> Network Mapper (`Nmap`) is an open-source network analysis and security auditing tool written in C, C++, Python, and Lua. It is designed to scan networks and identify which hosts are available on the network using raw packets, and services and applications, including the name and version, where possible. It can also identify the operating systems and versions of these hosts. Besides other features, Nmap also offers scanning capabilities that can determine if packet filters, firewalls, or intrusion detection systems (IDS) are configured as needed.

`-sS` scan:
- If our target sends a `SYN-ACK` flagged packet back to us, Nmap detects that the port is `open`.
- If the target responds with an `RST` flagged packet, it is an indicator that the port is `closed`.
- If Nmap does not receive a packet back, it will display it as `filtered`. Depending on the firewall configuration, certain packets may be dropped or ignored by the firewall.
## Host Discovery
[ICMP echo requests](https://jumpcloud.com/it-index/what-is-an-icmp-echo-request)

[Host discovery strategies](https://nmap.org/book/host-discovery-strategies.html)

It's important to<span style="color:rgb(255, 192, 0)"> store the results of every single scan</span>.

- `10.129.2.0/24` - target network range
- `-sn` - disable port scanning
- `oA tnet` - stores the results in all formats starting with the name "tnet"
```bash
sudo nmap 10.129.2.0/24 -sn -oA tnet | grep for | cut -d" " -f5
```

- `-iL` - performs defined scans against targets in provided 'hosts.lst' list.
```bash
sudo nmap -sn -oA tnet -iL hosts.lst | grep for | cut -d" " -f5
```

- scan multiple ips, .18, .19, .20
```bash
sudo nmap -sn -oA tnet 10.129.2.18-20| grep for | cut -d" " -f5
```

- `--packet-trace` to see ARP ping and reply packets being sent before ICMP echo request
- `-PE` - ping scan against target
```bash
sudo nmap 10.129.2.18 -sn -oA host -PE --packet-trace
```

> Tip for `ttl` OS fingerprinting

| OS            | Default TTL |
| ------------- | ----------- |
| Windows       | 128         |
| Linux/Unix    | 64          |
| Solaris/AIX   | 254         |
| Cisco Routers | 255         |
## Host and Port Scanning

| State            | Description                                                                                                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| open             | This indicates that the connection to the scanned port has been established. These connections can be **TCP connections**, **UDP datagrams** as well as **SCTP associations**.                          |
| closed           | When the port is shown as closed, the TCP protocol indicates that the packet we received back contains an `RST` flag. This scanning method can also be used to determine if our target is alive or not. |
| filtered         | Nmap cannot correctly identify whether the scanned port is open or closed because either no response is returned from the target for the port or we get an error code from the target.                  |
| unfiltered       | This state of a port only occurs during the **TCP-ACK** scan and means that the port is accessible, but it cannot be determined whether it is open or closed.                                           |
| open\|filtered   | If we do not get a response for a specific port, `Nmap` will set it to that state. This indicates that a firewall or packet filter may protect the port.                                                |
| closed\|filtered | This state only occurs in the **IP ID idle** scans and indicates that it was impossible to determine if the scanned port is closed or filtered by a firewall.                                           |

Scanning top 10 most frequent ports
```bash
sudo nmap 10.129.2.28 --top-ports=10 
```

Connect Scan (`-sT`) is the most accurate but not stealthy, also slow because it establishes a full connection (which creates logs on most systems).
```bash
sudo nmap 10.129.2.28 -p 443 --packet-trace --disable-arp-ping -Pn -n --reason -sT
```

To track how our sent packets are handled, we ***<span style="color:rgb(255, 117, 159)">deactivate</span>***:
- the ICMP echo requests (`-Pn`)
- DNS resolution (`-n`)
- ARP ping scan (`--disable-arp-ping`) 

> [!info]- why?
> - You disable ARP ping because ARP operates at Layer 2 and bypasses IP, TCP, and ICMP entirely. If ARP ping is enabled, Nmap may discover hosts without sending traceable packets, making packet tracing and analysis impossible.
> - You disable ICMP echo requests, DNS resolution, and ARP ping scans to eliminate auxiliary traffic and force Nmap to use only IP-based probing packets, allowing you to accurately trace how our scan packets are processed by the network and target.
```bash
sudo nmap 10.129.2.28 -p 445 --packet-trace -n --disable-arp-ping -Pn
```

- `-F` - scans top 100 ports
	- use this flag if you want to speed things up, might just get lucky
- `-sU` - performs a UDP scan
```bash
sudo nmap 10.129.2.28 -F -sU
```

`-sV` - identify versions, service names, and details about target
`-sC` - runs a curated list of scripts which can help you find the host name of target
## Saving the Results

`-oN` = `.nmap` file (normal)

`-oG` = `.gnmap` file (greppable)

`-oX` = `.xml` file

```bash
sudo nmap 10.129.2.49 -oX target1.xml
```
convert xml to html
```bash
xsltproc target.xml -o target.html
```
## Service Enumeration
`--stats-every=5s` - add flag to show progress of scan every 5 seconds

`-v` - increase verbosity of scan

Sometimes Nmap might miss out on some information from the server. 

> After a successful three-way handshake, the server often sends a banner for identification to let the client know which service it is working with.
> - At the network level, this happens with a `PSH` flag in the TCP header.
> - However, it can happen that some services do not immediately provide such information.

To find what nmap missed out on, we can manually connect to the SMTP server using `nc`, grab the banner and intercept the network traffic using `tcpdump`.
```bash
sudo tcpdump -i eth0 host 10.10.14.2 and 10.129.2.28
```
```bash
nc -nv 10.129.2.28 25
```

Intercepted traffic:
```bash
18:28:07.128564 IP 10.10.14.2.59618 > 10.129.2.28.smtp: Flags [S], seq 1798872233, win 65535, options [mss 1460,nop,wscale 6,nop,nop,TS val 331260178 ecr 0,sackOK,eol], length 0
18:28:07.255151 IP 10.129.2.28.smtp > 10.10.14.2.59618: Flags [S.], seq 1130574379, ack 1798872234, win 65160, options [mss 1460,sackOK,TS val 1800383922 ecr 331260178,nop,wscale 7], length 0
18:28:07.255281 IP 10.10.14.2.59618 > 10.129.2.28.smtp: Flags [.], ack 1, win 2058, options [nop,nop,TS val 331260304 ecr 1800383922], length 0
18:28:07.319306 IP 10.129.2.28.smtp > 10.10.14.2.59618: Flags [P.], seq 1:36, ack 1, win 510, options [nop,nop,TS val 1800383985 ecr 331260304], length 35: SMTP: 220 inlane ESMTP Postfix (Ubuntu)
18:28:07.319426 IP 10.10.14.2.59618 > 10.129.2.28.smtp: Flags [.], ack 36, win 2058, options [nop,nop,TS val 331260368 ecr 1800383985], length 0
```
- first 3 lines are 3-way handshake
- then SMTP server sends a TCP packet with `PSH` and `ACK` flags
	- `PSH` states that the target server is sending data to us
	- `ACK` informs us that all required data has been sent
- we send the last packet to confirm the receipt with and ACK
## Nmap Scripting Engine
We can use the NSE to create scripts in Lua for interaction with certain services.

| Category  | Description                                                                                                                             |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| auth      | Determination of authentication credentials.                                                                                            |
| broadcast | Scripts, which are used for host discovery by broadcasting and the discovered hosts, can be automatically added to the remaining scans. |
| brute     | Executes scripts that try to log in to the respective service by brute-forcing with credentials.                                        |
| default   | Default scripts executed by using the `-sC` option.                                                                                     |
| discovery | Evaluation of accessible services.                                                                                                      |
| dos       | These scripts are used to check services for denial of service vulnerabilities and are used less as it harms the services.              |
| exploit   | This category of scripts tries to exploit known vulnerabilities for the scanned port.                                                   |
| external  | Scripts that use external services for further processing.                                                                              |
| fuzzer    | This uses scripts to identify vulnerabilities and unexpected packet handling by sending different fields, which can take much time.     |
| intrusive | Intrusive scripts that could negatively affect the target system.                                                                       |
| malware   | Checks if some malware infects the target system.                                                                                       |
| safe      | Defensive scripts that do not perform intrusive and destructive access.                                                                 |
| version   | Extension for service detection.                                                                                                        |
| vuln      | Identification of specific vulnerabilities.                                                                                             |

**Default script**
```bash
sudo nmap <target> -sC
```

**Specific scripts**
```bash
sudo nmap <target> --script <category>
```

**Defined Scripts**
```bash
sudo nmap <target> --script <script-name>,<script-name>,...
```

`-A` - (aggressive scan) service detection, OS detection and traceroute, default scripts 
```bash
sudo nmap 10.129.2.28 -p 80 -A
```

```bash
sudo nmap -sV -p80 --script vuln 10.129.216.101
```
## Performance
Setting the `--initial-rtt-timeout` too short may cause us to overlook hosts

`--min-rate`: min. number of packets to be sent per second
```bash
sudo nmap 10.129.2.0/24 -F -oN tnet.minrate300 --min-rate 300
```
```bash
cat tnet.minrate300 | grep "/tcp" | wc -l
```

Timing
`-T 0` / `-T paranoid`

`-T 1` / `-T sneaky`

`-T 2`/ `-T polite`

`-T 3` /`-T normal`

`-T 4` / `-T aggressive`

`-T 5` / `-T insane`
## Firewall and IDS/IPS Evasion

> **IDS (detection)** scans the network for potential attacks, analyses them, and reports any detected attacks. **IPS (prevention)** complements IDS by taking specific defensive measures if a potential attack should have been detected.

| **Scanning Options** | **Description**                       |
| -------------------- | ------------------------------------- |
| `10.129.2.28`        | Scans the specified target.           |
| `-p 21,22,25`        | Scans only the specified ports.       |
| `-sS`                | Performs SYN scan on specified ports. |
| `-sA`                | Performs ACK scan on specified ports. |
| `-Pn`                | Disables ICMP Echo requests.          |
| `-n`                 | Disables DNS resolution.              |
| `--disable-arp-ping` | Disables ARP ping.                    |
| `--packet-trace`     | Shows all packets sent and received.  |

**SYN-Scan**
```bash
sudo nmap 10.129.2.28 -p 21,22,25 -sS -Pn -n --disable-arp-ping --packet-trace

Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-21 14:56 CEST
SENT (0.0278s) TCP 10.10.14.2:57347 > 10.129.2.28:22 S ttl=53 id=22412 iplen=44  seq=4092255222 win=1024 <mss 1460>
SENT (0.0278s) TCP 10.10.14.2:57347 > 10.129.2.28:25 S ttl=50 id=62291 iplen=44  seq=4092255222 win=1024 <mss 1460>
SENT (0.0278s) TCP 10.10.14.2:57347 > 10.129.2.28:21 S ttl=58 id=38696 iplen=44  seq=4092255222 win=1024 <mss 1460>
RCVD (0.0329s) ICMP [10.129.2.28 > 10.10.14.2 Port 21 unreachable (type=3/code=3) ] IP [ttl=64 id=40884 iplen=72 ]
RCVD (0.0341s) TCP 10.129.2.28:22 > 10.10.14.2:57347 SA ttl=64 id=0 iplen=44  seq=1153454414 win=64240 <mss 1460>
RCVD (1.0386s) TCP 10.129.2.28:22 > 10.10.14.2:57347 SA ttl=64 id=0 iplen=44  seq=1153454414 win=64240 <mss 1460>
SENT (1.1366s) TCP 10.10.14.2:57348 > 10.129.2.28:25 S ttl=44 id=6796 iplen=44  seq=4092320759 win=1024 <mss 1460>
Nmap scan report for 10.129.2.28
Host is up (0.0053s latency).

PORT   STATE    SERVICE
21/tcp filtered ftp
22/tcp open     ssh
25/tcp filtered smtp
MAC Address: DE:AD:00:00:BE:EF (Intel Corporate)

Nmap done: 1 IP address (1 host up) scanned in 0.07 seconds
```

**ACK-Scan**
```bash
sudo nmap 10.129.2.28 -p 21,22,25 -sA -Pn -n --disable-arp-ping --packet-trace

Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-21 14:57 CEST
SENT (0.0422s) TCP 10.10.14.2:49343 > 10.129.2.28:21 A ttl=49 id=12381 iplen=40  seq=0 win=1024
SENT (0.0423s) TCP 10.10.14.2:49343 > 10.129.2.28:22 A ttl=41 id=5146 iplen=40  seq=0 win=1024
SENT (0.0423s) TCP 10.10.14.2:49343 > 10.129.2.28:25 A ttl=49 id=5800 iplen=40  seq=0 win=1024
RCVD (0.1252s) ICMP [10.129.2.28 > 10.10.14.2 Port 21 unreachable (type=3/code=3) ] IP [ttl=64 id=55628 iplen=68 ]
RCVD (0.1268s) TCP 10.129.2.28:22 > 10.10.14.2:49343 R ttl=64 id=0 iplen=40  seq=1660784500 win=0
SENT (1.3837s) TCP 10.10.14.2:49344 > 10.129.2.28:25 A ttl=59 id=21915 iplen=40  seq=0 win=1024
Nmap scan report for 10.129.2.28
Host is up (0.083s latency).

PORT   STATE      SERVICE
21/tcp filtered   ftp
22/tcp unfiltered ssh
25/tcp filtered   smtp
MAC Address: DE:AD:00:00:BE:EF (Intel Corporate)

Nmap done: 1 IP address (1 host up) scanned in 0.15 seconds
```

Looking at the RCVD packets and the flag we received from the target, we see that in the SYN scan (`-sS`), the target tries to establish TCP connection by sending a packet back with the SYN-ACK (`SA`) flags. In the ACK Scan (`-sA`) we get the `RST` flag because port 22 is open. for the TCP port 25, we do not receive any packets back. 

### Detect IPS/IDS
Use **virtual private servers (VPS)** with different IP address to detect IDS and IPS
> - IDS helps administrators detect potential attacks on their network. Aggressively scan a single port and its service. If security measures are taken, we can detect present monitoring applications.
> - To determine whether such IPS system is present in the target network, scan from a single host (VPS). If at any time this host is blocked and has no access to the target network, we know that the administrator has taken some security measures.

### Decoys
Decoys are used when administrators <span style="color:rgb(0, 176, 240)">block specific subnets from different regions or when the IPS blocks us</span>. Nmap generates various random IP addresses to disguise the origin of the packet sent. With this method, we can generate (`RND`) some IP addresses.
- Our IP address is then randomly placed between the generated IP addresses.
- Decoys must be alive

`-D RND:5` - Generates five random IP addresses that indicates the source IP the connection comes from. 

```bash
sudo nmap 10.129.2.28 -p 80 -sS -Pn -n --disable-arp-ping --packet-trace -D RND:5
```

`-O` - Performs operation system detection scan.

```bash
sudo nmap 10.129.2.28 -n -Pn -p445 -O
```

`-e tun0` - Sends all requests through the specified interface.    

`-S` - Scans the target by using different source IP address.

```bash
sudo nmap 10.129.2.28 -n -Pn -p 445 -O -S 10.129.2.200 -e tun0
```
### DNS Proxying
By default, Nmap performs a <span style="color:rgb(0, 176, 80)">reverse DNS resolution unless specified otherwise</span>.

- DNS queries are made over the `UDP port 53`
- Zone transfers between DNS servers or data transfer larger than 512 bytes are made over the `TCP port 53`
> More and more, this is changing due to IPv6 and DNSSEC expansions. These changes cause many DNS requests to be made via TCP port 53.

We can specify DNS servers using `--dns-server <ns>,<ns>`.

Assume normal SYN-scan shows **port 50000** as ***filtered***. Scanning from **source port 5**3 instead, shows it as ***open***. This is because the administrator did not filter IDS/IPS properly and out packet was able to pass through.
>[!question]- Why admins think traffic from port 53 is trustable
>Many admins mistakenly allow or trust traffic **from port 53** because:
>- DNS replies originate from port 53
>- They want DNS to “just work”
```bash
sudo nmap 10.129.2.28 -p50000 -sS -Pn -n --disable-arp-ping --packet-trace --source-port 53

SENT (0.0482s) TCP 10.10.14.2:53 > 10.129.2.28:50000 S ttl=58 id=27470 iplen=44  seq=4003923435 win=1024 <mss 1460>
RCVD (0.0608s) TCP 10.129.2.28:50000 > 10.10.14.2:53 SA ttl=64 id=0 iplen=44  seq=540635485 win=64240 <mss 1460>
Nmap scan report for 10.129.2.28
Host is up (0.013s latency).

PORT      STATE SERVICE
50000/tcp open  ibm-db2
MAC Address: DE:AD:00:00:BE:EF (Intel Corporate)
```

>[!danger]- Firewall/IDS evasion tricks
>`--source-port 53`, `--source-port 20`, `--source-port 443` are classic **firewall/IDS evasion tricks**
## Easy Lab
Our client wants to know if we can identify which operating system their provided machine is running on. Submit the OS name as the answer. 
> [!success]- Solution
> 1. we want to be stealthy
> 2. we know `port 80` is running `http` due to status page
> 3. do a service scan on port 80 while <span style="color:rgb(0, 176, 80)">disabling ping probes</span>
> 
>`sudo nmap 10.129.26.208 -p80 -sV --disable-arp-ping -Pn` 
## Medium Lab
 After the configurations are transferred to the system, our client wants to know if it is possible to find out our target's DNS server version. Submit the DNS server version of the target as the answer. 
> [!success]- Solution
> 1. DNS runs on port 53 and uses UDP
> 2. target UDP port 53 to reduces amount of alerts
>
>`sudo nmap 10.129.26.208 -p53 -sV -sU -Pn` 

## Hard Lab
 Now our client wants to know if it is possible to find out the version of the running services. Identify the version of service our client was talking about and submit the flag as the answer. 
> [!success]- Solution
> 1. find open ports, check if it accepts `tcp 53` as source
> `sudo nmap --source-port 53 -p- -Pn -sS -n 10.129.26.208`
> 2. open port found, -p50000
> 3. run `-sV` on the port but flag not found
>  
> 4. connect to it via `nc`, 
>`nc -p 53 -nv 10.129.26.208 50000` 

