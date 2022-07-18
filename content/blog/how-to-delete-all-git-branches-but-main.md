---
published: false
title: 'How to delete all git branches but main'
description: 'Clean up your local git environment with one command!'
date: '2021-01-23'
disclaimer: false
---

**TLDR:** Running this command on the terminal will delete all local branches except for master and main in the current git repository:
```bash
git branch | grep -Ev "(master|main)$" | xargs git branch -D
```

---

## Problem

After working for some time on a project you probably end up with several old branches, each created for a different task, right? Have you noticed how many of these do you have on your local repos right now?

The first time I noticed this issue was about a year into my job, when I tried to create a new branch such as `bump-dependencies` for a quick chore and got an error message because it already existed. It took me some time to remember that I had done the same thing some time ago on that repo, and that's why branch was still there even though it was merged to the remote for a while.

It's ok to solve this problem with a simple `git branch -D old-branch` when there's only one or even a few branches left over, but it gets boring to do so for several branches on each repo you have local. So, the solution is to come up with a single command that will do it all at once for the current repo. You'll still have to run it on each repo, but it's still better than the alternative, isn't it?

## Solution

To write the solution we'll start with a `git branch` command that returns all existing local branches for the current git repo, then we'll pipe its output to the input of a `grep -Ev "(master|main)$"` that filters either the `main` or `master` branch and returns all others. Finally, that second output is piped into a `xargs git branch -D` that maps each branch name to a `git branch -D` command, thus deleting it. So, the full command is:

```bash
git branch | grep -Ev "(master|main)$" | xargs git branch -D
```

**Be careful** to use this command when you're finished working on all local branches or at least they're all pushed to remote, otherwise you might lose precious work that's still only local!

You can also create an alias to avoid having to remember the whole command all the time, although it's not an issue if you have the finder enabled on your terminal:

Add the following line to your `.bashrc` or `.zshrc` file:
```bash
alias gclear='git branch | grep -Ev "(master|main)$" | xargs git branch -D'
```

## References

- This and other solutions are available on <a target="_blank" rel="noopener" href="https://stackoverflow.com/questions/10610327/delete-all-local-git-branches">Stack Overflow</a>;
- This Digital Ocean <a target="_blank" rel="noopener" href="https://www.digitalocean.com/community/tutorials/using-grep-regular-expressions-to-search-for-text-patterns-in-linux">tutorial</a> shows how to use `grep` with its options;
- This Wikipedia <a target="_blank" rel="noopener" href="https://en.wikipedia.org/wiki/Xargs">article</a> explains `xargs`;


