# OverTheWire Bandit Tutorial

Bandit is a computer security game for beginners! Each level involves logging in
to the game server and searching for a hidden password that lets you log in to
the next level. This guide will assume little prior knowledge, but it's always a
good idea to Google any concepts or commands that you don't understand. You can
also use Google to resolve any strange errors or problems you encounter.

To play Bandit, you need access to a terminal. Macs and Linux systems should
already have a Terminal program for you to use, but what Windows provides is a bit different.
It's probably possible to complete Bandit on Windows using ```putty```, but this
guide assumes you are using SSH in an ```sh``` shell like ```bash``` or
```zsh```. To access an environment like this on Windows, I recommend either
installing [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
or setting up a Linux virtual machine. For the virtual machine, there are many
options, such as [Hyper-V](https://www.windowscentral.com/how-run-linux-distros-windows-10-using-hyper-v),
[VMware](https://www.makeuseof.com/tag/install-linux-windows-vmware-virtual-machine/),
and [VirtualBox](https://www.instructables.com/How-to-install-Linux-on-your-Windows/).
Any Linux distribution you choose should be fine.

Bandit can be found [here](https://overthewire.org/wargames/bandit/).

## Level 0

Each level of Bandit is completed by logging in to the game server with the
correct password. For the Level 0 login, the username is ```bandit0	``` and the
password is ```bandit0```.

The game server has the hostname ```bandit.labs.overthewire.org```, and the SSH
server we need to connect to is running on port number 2220.

The ```ssh``` command is used to log in to a host remotely. It works if the host
is running an SSH server that accepts incoming connections. Typically, SSH
servers run on port 22, so the ```ssh``` command attempts to connect to that
port by default. We want port 2220 instead, so we need to specify this port with
the ```-p``` option (```-p 2220```). Also, the ```ssh``` command assumes that
you are logging in to the host with the same username that you are logged in
with on your current machine. To log in with ```bandit0``` instead, you need to
specify it in the hostname (```bandit0@bandit.labs.overthewire.org```).

When you run the command, the game server will prompt you for a password. Type
the password ```bandit0``` to log in to the game server and complete level 0.

??? success "Level 0 Solution"
	```ssh -p 2220 bandit0@bandit.labs.overthewire.org```

	```sshpass``` is a command that can be used to provide a password to SSH so
	that it is "non-interactive." This can be useful for writing scripts, but in
	general it isn't a good idea to store SSH passwords in plain text anywhere.
	However, it's appropriate here, where the passwords are used for a game:

	```sshpass -p bandit0 ssh -p 2220 bandit0@bandit.labs.overthewire.org```
