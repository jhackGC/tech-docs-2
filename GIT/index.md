# Git and GitHub

## Overview

Git is a version control system that allows you to store, version, and share your code. GitHub is a platform that hosts Git repositories online, making it easy to collaborate and showcase your work.

## Why Do We Need Git?

### The Problem

Imagine you're writing a book with 100 other people. How would you:

- Share in-progress edits?
- Prevent people from overwriting each other's work?
- Keep track of changes?
- Manage different versions?

Email? Chat? A chaotic Google Doc? All sound terrible, right?

### Real-World Example

Companies like Facebook have thousands of engineers working on the same codebase. Without version control:

- One person could break the code for everyone
- No way to track who made what changes
- Impossible to revert problematic changes
- Chaos and frustration

### Git's Solution

Git allows everyone to:

- **Checkout** their own copy of the code
- **Make edits** independently
- **Submit change requests** for review
- **Merge** approved changes safely

## What is Git vs GitHub?

### Git

- **Command-line tool** for version control
- Works **locally** on your computer
- Tracks changes to your files over time
- Creates a history of your project

### GitHub

- **Online platform** that hosts Git repositories
- Makes your code **publicly accessible**
- Enables **collaboration** with others
- Acts as a **backup** of your code
- Becomes part of your **professional profile**

## Getting Started with Git in VS Code

### Step 1: Initialize a Repository

1. Create a new folder on your desktop
2. Open it with Visual Studio Code
3. Look for the Git icon in the left sidebar (looks like a branching tree)
4. Click "Initialize Repository"

A **repository (repo)** is Git's term for a project. Every project you work on will be one repo.

### Step 2: Make Your First Changes

1. Create a new file called `my-file.txt`
2. Add some content: "Hi my name is [Your Name]"
3. Save the file

### Step 3: Stage Your Changes

In the Git tab, you'll see your new file under "Changes":

- Click the `+` next to the file to **stage** it
- **Staging** means "ready to save" but not saved yet
- You can stage multiple files before saving them all together

**Why staging?** Sometimes you want to group related changes into one save operation. You might change 5 files but only want to save 3 of them together.

**Note:** If you change a file after staging it, you need to stage it again to capture the new changes.

### Step 4: Commit Your Changes

1. Write a descriptive message in the message box (e.g., "added my name text file")
2. Click the ✓ checkmark to **commit**

A **commit** creates a new entry in your repo's history with all your staged changes. Think of it as taking a snapshot of your project at this moment.

## The Basic Git Workflow

```
1. Make changes to files
2. Stage the changes you want to save
3. Commit the staged changes with a message
4. Repeat!
```

### Commit Message Best Practices

- Keep it short but descriptive
- Use present tense: "Add user login feature"
- Help your future self understand what you did

## Setting Up GitHub

### Why GitHub?

- **Public portfolio**: Employers will look at your GitHub profile
- **Code backup**: Your code is safely stored online
- **Collaboration**: Work with others on projects
- **Open source**: Contribute to and learn from other projects
- **Professional profile**: Like a resume for developers

### Step 1: Create Account

1. Go to [github.com/signup](https://github.com/signup)
2. Choose a professional username (this becomes part of your profile)
3. Complete the signup process

### Step 2: Create Your First Repository

1. Click the `+` in the top right corner
2. Select "New repository"
3. Name it "my-first-repo" (or whatever you prefer)
4. Leave other options as default
5. Click "Create repository"

### Step 3: Connect VS Code to GitHub

1. Copy the repository URL from GitHub (looks like: `https://github.com/yourusername/my-first-repo.git`)
2. In VS Code Git panel, find the submenu option to add a remote
3. Paste the URL and name the remote "origin"

**What's a remote?** It's the connection between your local Git repo and the online GitHub repo.

**Why "origin"?** It's a standard naming convention - 99.9% of projects use "origin" as the name for the main remote repository.

### Step 4: Publish Your Code

1. Click "Publish Branch" in VS Code
2. Authenticate with GitHub if prompted
3. Allow VS Code to open URLs when asked

**Branches explained:** Git has a concept of branches for organizing work. Your main work happens on the "main" (or "master") branch. We're not covering branching in detail, but that's what "publish branch" refers to.

### Step 5: Verify on GitHub

Check your GitHub repository page - your code should now be visible online!

## Making Updates

### The Ongoing Workflow

1. **Make changes** to your files
2. **Stage** the changes in VS Code Git panel
3. **Commit** with a descriptive message
4. **Sync changes** to push to GitHub

This is the core workflow you'll use constantly as a developer.

### Sync vs Push

- **Push**: Send your commits to GitHub
- **Pull**: Get the latest changes from GitHub
- **Sync**: Does both push and pull

## Common Git Concepts

### Repository (Repo)

- A project tracked by Git
- Contains all your files and their complete history
- Can be local (on your computer) or remote (on GitHub)

### Commit

- A snapshot of your project at a specific point in time
- Has a unique ID and descriptive message
- Forms a timeline of your project's development

### Staging Area

- A holding area for changes you want to commit
- Lets you choose exactly what changes to include
- Think of it as preparing items for a package before shipping

### Remote

- A connection to an online copy of your repository
- Usually called "origin"
- Allows collaboration and backup

### Branches

- Parallel versions of your code
- Main branch is usually called "main" or "master"
- Feature branches let you work on new features safely
- Can be merged back into main when ready

## Best Practices

### 1. Commit Often

- Don't wait until your project is "finished"
- Commit whenever you complete a logical unit of work
- Small, frequent commits are better than large, infrequent ones

### 2. Write Good Commit Messages

```
Good:
- "Add user authentication system"
- "Fix bug in shopping cart calculation"
- "Update README with installation instructions"

Bad:
- "stuff"
- "changes"
- "idk"
```

### 3. Don't Commit Everything

Some files shouldn't be tracked:

- `.DS_Store` (macOS system files)
- `node_modules/` (downloaded dependencies)
- Build output files
- Personal configuration files

### 4. Use .gitignore

Create a `.gitignore` file to tell Git which files to ignore:

```
# Ignore system files
.DS_Store
Thumbs.db

# Ignore dependencies
node_modules/

# Ignore build output
dist/
build/

# Ignore environment variables
.env
```

## Professional Tips

### Your GitHub Profile Matters

- **Employers will look** at your GitHub
- Keep your repositories organized
- Include README files explaining your projects
- Contribute to open source projects
- Pin your best repositories

### Repository Organization

- Use clear, descriptive names
- Include README.md files
- Add screenshots of your projects
- Explain how to run your code
- Document any setup requirements

### Sample README.md

```markdown
# My Awesome Project

A brief description of what your project does.

## How to Run

1. Clone this repository
2. Open `index.html` in your browser
3. Enjoy!

## Technologies Used

- HTML
- CSS
- JavaScript

## Features

- Responsive design
- Interactive animations
- Mobile-friendly
```

## Common Issues and Solutions

### Error: "Please tell me who you are"

If you see this error, Git needs your identity:

```bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

### Merge Conflicts

If VS Code shows merge conflict errors:

- Copy the suggested command and run it in terminal
- This sets up Git's merge strategy
- Usually only needs to be done once

### Authentication Issues

- GitHub may require personal access tokens instead of passwords
- VS Code usually handles this automatically
- Follow the prompts when they appear

## Beyond the Basics

### What We Didn't Cover

- **Branching and merging**: Working on features separately
- **Pull requests**: Proposing changes for review
- **Collaboration**: Working with team members
- **Advanced Git commands**: Command-line Git usage
- **Git workflows**: Different strategies for team development

### Learning More

- [Nina Zakharenko's Git Course](https://frontendmasters.com/courses/git-in-depth/) on Frontend Masters
- GitHub's own learning resources
- Practice with personal projects

## Git Commands (For Reference)

While we used VS Code's interface, here are the equivalent commands:

```bash
# Initialize repository
git init

# Stage files
git add filename.txt
git add .  # Stage all files

# Commit changes
git commit -m "Your commit message"

# Add remote
git remote add origin https://github.com/username/repo.git

# Push to GitHub
git push origin main

# Pull from GitHub
git pull origin main

# Check status
git status

# View commit history
git log
```

## Key Takeaways

1. **Git tracks changes** to your files over time
2. **GitHub hosts** your Git repositories online
3. **The basic workflow** is: change → stage → commit → push
4. **Your GitHub profile** becomes part of your professional identity
5. **Version control** is essential for any serious development work
6. **Start simple** - you can learn advanced features as you need them
7. **Commit often** with good messages
8. **VS Code makes Git easy** with its visual interface

## Why This Matters

Git and GitHub are **industry standard tools**. Every software company uses version control, and GitHub is the most popular platform. Learning these tools:

- Makes you more hireable
- Enables collaboration with other developers
- Provides backup for your code
- Lets you contribute to open source projects
- Gives you a professional portfolio
- Teaches you important development workflows

Start using Git for all your projects, even small ones. The more you practice, the more natural it becomes!
