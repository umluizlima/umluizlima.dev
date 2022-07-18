---
published: false
title: 'How to setup your Python environment'
description: 'Work with multiple projects in a safe way!'
date: '2021-01-26'
disclaimer: false
---

**TLDR:** Use `pyenv` and `pyev-virtualenv` in a `makefile` to quickly set up the Python environment on your projects.

---

## Problem

When you interact with multiple projects it becomes difficult to manually manage each one of their required environments. In this article we'll go through a way that I particularly like to deal with this issue, and you might like it too.

To make things clear, imagine you're working on two Python projects, each with its own dependency requirements. Let's say that `my-first-project` has `Flask` and `SQLAlchemy` as dependencies, while `my-second-project` depends on `FastAPI` and `pymongo`.

Installing all of these dependencies to the global environment on your computer might work just fine, although it's <a target="_blank" rel="noopener" href="https://stackoverflow.com/a/41972262/9234095">not recommended</a>. What we could do to ensure each project has its own dependencies separate from the global environment is use a <a target="_blank" rel="noopener" href="https://docs.python.org/3/library/venv.html">virtualenv</a> for each one.

Another problem that becomes common with time is that each project may depend on a specific Python version. This is something that `virtualenv` itself cannot solve, but <a target="_blank" rel="noopener" href="https://github.com/pyenv/pyenv">pyenv</a> does! It allows us to install and select any Python version that we need.

## Solution

Once its <a target="_blank" rel="noopener" href="https://github.com/pyenv/pyenv#installation">installed</a>, `pyenv` can be used to:

1. Install a specific Python version;
2. Create a `virtualenv` specifically with that version;
3. Activate the `virtualenv` to safely start installing dependencies;

Step three should be done within the project folder. The commands would look like this, respectively:

```bash
pyenv install 3.10.0
pyenv virtualenv 3.10.0 my-first-project
cd my-first-project
pyenv local my-first-project
```

These commands are enough to ensure that you'll be working on the optimal environment for that project, regarding Python version. But when it comes to dependency management, one common pattern is to specify them in a `requirements.txt` file. Considering this approach, the following steps could be used:

1. Uninstall all currently installed dependencies;
2. Update `pip`'s version;
3. Install the dependencies specified in `requirements.txt`;

Again, the commands would look like this:

```bash
cd my-first-project
pip freeze | xargs -r pip uninstall -y
python -m pip install --upgrade pip
pip install -r requirements.txt
```

The three steps above allows us to safely reset the dependencies installed in the current `virtualenv` without having to recreate it completely.

As remembering these can become annoying after a while, we could use the help of a <a target="_blank" rel="noopener" href="https://opensource.com/article/18/8/what-how-makefile">makefile</a>. Create a `makefile` in the root folder of your project and insert the following lines:

```makefile
.PHONY: environment
environment:
	pyenv install -s 3.10.0
	pyenv uninstall --force my-project
	pyenv virtualenv 3.10.0 --force my-project
	pyenv local my-project

.PHONY: install
install:
	pip freeze | xargs -r pip uninstall -y
	python -m pip install --upgrade pip
	pip install -r requirements.txt
```

Now all you have to do is run `make environment` and then `make install` to have a fresh Python environment with all its dependencies properly isolated from the rest of your system. Bumped a dependency version? Running only `make install` should be enough.

## References

- This Wikipedia <a target="_blank" rel="noopener" href="https://en.wikipedia.org/wiki/Xargs">article</a> explains `xargs`;


