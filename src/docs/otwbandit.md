# OverTheWire Bandit Tutorial
---

Bandit is a computer security game for beginners! Each level involves logging in
to the game server and searching for a hidden password that lets you log in to
the next level. This guide will assume little prior knowledge, but it's always a
good idea to Google any concepts or commands that you don't understand. You can
also use Google to resolve any strange errors or problems you encounter.

To play Bandit, you need access to a terminal. Macs and Linux systems should
already have a Terminal program for you to use, but what Windows provides is a 
bit different. It's probably possible to complete Bandit on Windows using
```putty```, but this guide assumes you are using SSH in an ```sh``` shell like
```bash``` or ```zsh```. To access an environment like this on Windows, I
recommend either installing [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
or setting up a Linux virtual machine. For the virtual machine, there are many
options, such as [Hyper-V](https://www.windowscentral.com/how-run-linux-distros-windows-10-using-hyper-v),
[VMware](https://www.makeuseof.com/tag/install-linux-windows-vmware-virtual-machine/),
and [VirtualBox](https://www.instructables.com/How-to-install-Linux-on-your-Windows/).
Any Linux distribution you choose should be fine.

The Bandit levels have many possible solutions and correct approaches, and the
solutions I describe are just ones that I came up with myself. Bandit can be
found [here](https://overthewire.org/wargames/bandit/).

## Level 0
---

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
	We are only using passwords for a game, so it can be appropriate here:

	```sshpass -p bandit0 ssh -p 2220 bandit0@bandit.labs.overthewire.org```

## Level 1
---

Now that we have logged on to ```bandit.labs.overthewire.org``` as
```bandit0```, we are given a ```bash``` shell to use from ```bandit0```'s home
directory, which is called ```/home/bandit0``` (or ```~bandit0```, or ```~``` as
a shortcut). As ```bandit0```, we have permission to read the files in our home
directory.

The goal of this level is to log in again, this time as ```bandit1``` instead of
```bandit0```, and we are told that ```bandit1```'s password is stored in a file
called ```readme``` within our home directory.

The ```ls``` command is extremely useful and convenient for viewing the contents
of a directory. You can type ```ls``` with no other options to quickly list the
contents of your current working directory, which in this case is
```/home/bandit0```. Sure enough, there is a file called ```readme```:

```
bandit0@bandit:~$ ls
readme
```

The hint states that ```readme``` contains the password to ```bandit1```, but
how do we get that password? First, it's helpful to know what kind of file
```readme``` is. We can try the ```file``` command to investigate:

```
bandit0@bandit:~$ file readme
readme: ASCII text
```

```readme``` appears to be a text file, so it must store the password as plain
text. Reading a text file from the command line is easy with the ```cat```
command (which is called ```cat``` because it can *concatenate* files). When you
call ```cat``` with the name of a file, it will read in the file's bytes and
print them to standard output as text characters.

Once you see the password (which looks like a jumble of letters and numbers),
you will want to copy it to somewhere safe so that you can paste it into the SSH
password prompt. Use ```ssh``` to log in as ```bandit1``` with this password.
You can use the ```exit``` command to go back to your own computer and SSH from
there just like before.

??? success "Level 1 Solution"
	```cat readme```

	The following one-liner stores the password from ```readme``` into a file on
	your computer called ```pass1.txt```. The "```> pass1.txt```" is not part of
	the command issued to ```bandit.labs.overthewire.org```. The ```ssh ... cat
	readme``` command is evaluated, and then the output of the ```cat``` command
	is redirected to a file named ```pass1.txt``` in your current working
	directory.

	```sshpass -p bandit0 ssh -p 2220 bandit0@bandit.labs.overthewire.org cat
	readme > pass1.txt```

## Level 2
---

This time, we start in ```bandit1```'s home directory as the ```bandit1``` user,
and we need to find ```bandit2```'s password. We are told that it is in a file
called "```-```", and sure enough, there is the file:

```
bandit1@bandit:~$ ls
-
```

Let's try to read it...

```
bandit1@bandit:~$ cat -

```

What happened? Where is the password? First, we should terminate the ```cat```
program so we can get our shell back and try more commands. Press Ctrl+C to
terminate the program. This sends a ```SIGINT``` signal to the foreground
process (in this case, the instance of the ```cat``` program we invoked), which
tells it to immediately exit.

To understand why ```cat -``` behaves this way, we can look at the manual page
for ```cat``` with ```man cat```.

> cat [OPTION]... [FILE]...

> With no FILE, or when FILE is -, read standard input.

It appears that when the file we pass to ```cat``` is "```-```", we are actually
telling ```cat``` to read from standard input and print to standard output. When
you run ```cat``` in this mode, you can see that when you type in the console
and hit Enter, ```cat``` echoes whatever you typed back to you:

```
bandit1@bandit:~$ cat -
hello
hello
^C
```

So, how do we tell ```cat``` that we want it to print the contents of a file
that is actually named "```-```"? To answer this question, we need to learn
about pathnames.

From the command line, we identify files by their **pathnames** in the file
system's namespace, which are either absolute or relative. The file system is
organized as a hierarchy of directories, with the root directory "```/```" at
the top. The root directory can hold files, and it can also hold other
directories, which can hold files and more directories, and so on. A directory
is really just a type of file.

**Absolute** pathnames describe where a file is in terms of the entire
hierarchy, relative to the root directory ```/```. For example, we can use the
```pwd``` command to see the absolute pathname of our current working directory:

```
bandit1@bandit:~$ pwd
/home/bandit1
```

This pathname means that in the root directory, ```/```, there is another
directory called ```home``` (```/home```), which contains another directory
called ```bandit1``` (```/home/bandit1```), and that is our current working
directory.

**Relative** pathnames describe where a file is in terms of the current working
directory. For example, if we passed a filename ```mystuff/log.txt``` to
```cat```, we are telling ```cat``` to start in the current working directory
(not necessarily root), look in the ```mystuff``` directory from there, and find
a file called ```log.txt```. If our current working directory was called
```/home/me```, then the file's absolute pathname would be 
```/home/me/mystuff/log.txt```. Relative pathnames save you from having to type
out long absolute pathnames every time you refer to a file. We already used a
relative pathname on Level 1 when we issued the ```cat readme``` command; we
could have also typed ```cat /home/bandit0/readme``` to refer to the same file
with an absolute name. ```cat readme``` worked because our current working
directory was ```/home/bandit0```.

I said "we identify files by their pathnames in the file system's namespace"
because filenames are just links to files. One file can have many filenames and
many absolute pathnames.

!!! tip "Special Directory Entries"
	Another important note on relative pathnames: every directory has two special
	entries for files in it, called ```.``` and ```..```.

	* ```.``` - Each directory lists an entry for itself as ```.```. Therefore, the
	pathname ```/home/bandit1/.``` refers to ```/home/bandit1```. If you start a
	pathname with ```./```, you are specifying that it starts in the current working
	directory.
	* ```..``` - Each directory lists an entry for its *parent directory* as
	```..```. This means that ```/home/bandit1/..``` refers to ```/home```. ```/```
	is its own parent, so ```/..``` is the same as ```/```.

That's a lot more background than is necessary to complete this level, but it's
good to understand how to read pathnames. To read the ```-``` file, try to refer
to it by another pathname.

??? success "Level 2 Solution"
	```cat ./-```

	This one-liner reads the Level 1 password from ```pass1.txt``` and stores
	the Level 2 password in ```pass2.txt```:

	```sshpass -f pass1.txt ssh -p 2220 bandit1@bandit.labs.overthewire.org cat
	./- > pass2.txt```

## Level 3
---

Now, ```bandit3```'s password is stored in a file called "```spaces in this
filename```", so let's try to read it:

```
bandit2@bandit:~$ ls
spaces in this filename
bandit2@bandit:~$ cat spaces in this filename
cat: spaces: No such file or directory
cat: in: No such file or directory
cat: this: No such file or directory
cat: filename: No such file or directory
```

Why did that happen? Let's look at the ```cat``` manual page again:

> cat [OPTION]... [FILE]...

> Concatenate FILE(s) to standard output.

The ```cat``` command doesn't only work on a single file; it can take a list of
files and print them all out in a row (concatenate them to standard output).
When we type ```cat spaces in this filename```, ```cat``` thinks we want to
print four different files: ```spaces```, ```in```, ```this```, and
```filename```. There are no files in the current working directory with any of
those names, so ```cat``` reports that it failed to find each one. Trying to use
a different pathname like we did in the previous level doesn't solve this
problem.

The culprit is actually our shell. When we type in a command and hit Enter, the
shell interprets our command to figure out which program to run and which
*arguments* it should run with. Normally, the shell can figure out what each
argument should be because we separate them with spaces when we type them. If we
type ```cat``` and four words with spaces between them, the shell assumes that
each of those words is a separate argument to ```cat```, and ```cat``` assumes
that each of its arguments is the name of a file to print out. We want to type
"```spaces in this filename```" as a single argument/filename to ```cat```, not
four separate ones.

In ```bash```, there are a couple ways to achieve this. One way is to surround
the filename in single ```'``` or double ```"``` quotes. Another is to *escape*
each individual space character in the filename with a backslash ```\```. Many
characters have special meanings to your shell, like spaces or quotation marks,
but sometimes you want the shell to ignore those special meanings and use the
character literally. If you type a backslash before a space, the shell will
correctly assume that the space is part of the argument and not a *delimiter*
between arguments.

??? success "Level 3 Solution"
	```cat "spaces in this filename"```

	Something interesting happens with this one-liner: you need to escape the
	quotation marks around the filename. If you don't, your shell passes the
	incorrect ```cat spaces in this filename``` command to ```ssh```. If we
	escape the quotation marks on *our* shell, then the filename will be quoted
	correctly in the command sent to ```bandit.labs.overthewire.org```.

	```sshpass -f pass2.txt ssh -p 2220 bandit2@bandit.labs.overthewire.org cat
	\"spaces in this filename\" > pass3.txt```
