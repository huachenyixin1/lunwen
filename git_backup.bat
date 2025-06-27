@echo off
setlocal EnableDelayedExpansion

:: Check if Git is installed
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo Git is not installed or not in PATH. Please install Git first.
    pause
    exit /b 1
)

:: Navigate to project directory
cd /d D:\E\dockerdata\copylunwen\lunwen

:: Check if directory is a Git repository
if not exist ".git" (
    echo Initializing new Git repository...
    git init
    echo Local repository initialized. No remote required for this backup.
)

:: Stage all changes
echo Staging all changes...
git add .

:: Check if there are changes to commit
git diff --staged --quiet
if %errorlevel% equ 0 (
    echo No changes to commit.
    pause
    exit /b 0
)

:: Prompt for commit message
set "commit_msg="
set /p commit_msg="Enter commit message (e.g., fix_bug): "

:: Set default message if empty
if "!commit_msg!"=="" set "commit_msg=auto_backup"

:: Commit changes
echo Committing changes with message: !commit_msg!...
git commit -m "!commit_msg!"

:: Backup complete
echo Backup (commit) successful! Use 'git log' to view history or 'git checkout <commit_hash>' to restore.
pause

endlocal