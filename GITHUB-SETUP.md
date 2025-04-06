# Setting Up GitHub Repository

Follow these steps to push your portfolio to GitHub while keeping sensitive information private.

## First Time Setup

1. **Create a GitHub repository**
   - Go to [GitHub](https://github.com/) and sign in
   - Click the "+" icon in the top right corner and select "New repository"
   - Name your repository (e.g., "portfolio")
   - Choose visibility (public or private)
   - Don't initialize with README, .gitignore, or license
   - Click "Create repository"

2. **Verify your .gitignore file**
   - Make sure your `.gitignore` includes `**/config.js` to exclude your sensitive information
   - Verify that your repository already has the config.example.js to guide others

3. **Initialize the local repository and push**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
   git push -u origin main
   ```

   Replace `YOUR-USERNAME` with your GitHub username.

## Checking What Will Be Committed

Before committing, you can check what files will be included:

```bash
git status
```

This should show that `assets/js/config.js` is NOT included in the files to be committed.

## Verifying Ignored Files

To verify that your sensitive files are being ignored:

```bash
git check-ignore -v assets/js/config.js
```

This should show that the file is being ignored because of the pattern in your .gitignore file.

## If You Accidentally Committed Sensitive Information

If you accidentally committed sensitive information:

1. **Remove the file from tracking**
   ```bash
   git rm --cached assets/js/config.js
   ```

2. **Commit the change**
   ```bash
   git commit -m "Remove sensitive information"
   ```

3. **Push the change**
   ```bash
   git push
   ```

4. **Change your credentials**
   - If you exposed API keys or passwords, make sure to regenerate them as they might still be visible in the commit history

## Setting Up GitHub Pages (Optional)

To deploy your portfolio using GitHub Pages:

1. Go to your repository on GitHub
2. Click "Settings"
3. Navigate to "Pages" in the sidebar
4. Under "Source", select "main" branch
5. Click "Save"
6. Your site will be published at `https://YOUR-USERNAME.github.io/portfolio/`

## Additional Security Tips

1. **Use environment variables** for more sophisticated projects
2. **Consider GitHub Secrets** if you're using GitHub Actions
3. **Regularly audit your repository** for sensitive information
4. **Use a credential scanner** to detect accidental credential commits 