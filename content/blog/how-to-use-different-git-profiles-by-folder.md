---
published: true
title: 'How to use different git profiles by folder'
description: "Commit with different git username or email depending on the folder you're in!"
date: '2022-05-16'
disclaimer: false
---

**TLDR:** Create a separate `.gitconfig` file to be used when you're inside a specific folder.

---

## Problem

Let's say you start in a new job and will use the same computer for developing personal and work projects. The company might request that you set the corporate e-mail on you git config for work commits, which would be done like this:

```bash
$ git config --global user.email "email@company.com"
```

Although simple, this solution would cause the commits on your personal projects to be sent with the corporate e-mail as well, which is not ideal. Here's the solution I found after going through this recently.

## Solution

As I had never faced this issue before, my first thought was: "Is there a way to set different git user infos depending on the folder I'm in?". This came to mind because I had already created such folder to keep work files separate from personal stuff, like `~/company/git/some_cloned_repo`. So, the search I did on Google for that was ["per folder gitconfig"](https://www.google.com/search?q=per+folder+gitconfig), for which the first result was this [Stack Overflow question](https://stackoverflow.com/questions/8801729/is-it-possible-to-have-different-git-configuration-for-different-projects).

You might check that there's a `~/.gitconfig` file that looks something like this:

```
# This is Git's per-user configuration file.
[user]
# Please adapt and uncomment the following lines:
	name = Your name
	email = personal@email.com
[init]
	defaultBranch = main
```

The solution is, given that you have a folder in which all work content is gonna be:

1. Create a new git config file specific to your work, like `~/.gitconfig-company`:

    ```
    [user]
        name = Your name
        email = email@company.com
    ```

2. Append the following lines to the end of the original git config file, `~/.gitconfig`:

    ```
    [includeIf "gitdir:~/company/"]
        path = .gitconfig-company
    ```

Now you can check if it's working by typing the `git config user.email` command. It should print:

1. `email@company.com` if run inside the `~/company` folder and subfolders;
2. `personal@email.com` if run outside the `~/company` folder;

## References

- <a target="_blank" rel="noopener" href="https://stackoverflow.com/questions/8801729/is-it-possible-to-have-different-git-configuration-for-different-projects">Stack Overflow question</a>;

