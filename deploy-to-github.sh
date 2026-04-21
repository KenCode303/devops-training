#!/bin/bash

# ========================================
# GitHub Pages Deployment Script
# ========================================
# This script will help you deploy your registration form to GitHub Pages
# Run this from the devops-training-registration folder

echo "🚀 DevOps Training Registration - GitHub Deployment"
echo "=================================================="
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the devops-training-registration folder"
    exit 1
fi

echo "Step 1: Initialize Git repository..."
git init

echo ""
echo "Step 2: Add all files to Git..."
git add .

echo ""
echo "Step 3: Create initial commit..."
git commit -m "Initial commit: DevOps training registration form with Google Sheets integration"

echo ""
echo "Step 4: Rename branch to 'main'..."
git branch -M main

echo ""
echo "=================================================="
echo "🎯 MANUAL STEPS REQUIRED:"
echo "=================================================="
echo ""
echo "1. Go to GitHub: https://github.com"
echo "2. Click '+' → 'New repository'"
echo "3. Repository name: devops-training (or any name you like)"
echo "4. Make it PUBLIC"
echo "5. Do NOT initialize with README"
echo "6. Click 'Create repository'"
echo ""
echo "7. Copy the repository URL (it will look like):"
echo "   https://github.com/YOUR_USERNAME/devops-training.git"
echo ""
read -p "8. Paste your GitHub repository URL here: " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ No URL provided. Please run the script again."
    exit 1
fi

echo ""
echo "Step 5: Adding remote repository..."
git remote add origin "$REPO_URL"

echo ""
echo "Step 6: Pushing to GitHub..."
git push -u origin main

echo ""
echo "=================================================="
echo "✅ FILES PUSHED TO GITHUB!"
echo "=================================================="
echo ""
echo "🌐 NEXT: Enable GitHub Pages"
echo ""
echo "1. Go to your repository on GitHub"
echo "2. Click 'Settings' → 'Pages'"
echo "3. Source: 'Deploy from a branch'"
echo "4. Branch: 'main', Folder: '/ (root)'"
echo "5. Click 'Save'"
echo "6. Wait 1-2 minutes"
echo ""
echo "Your form will be live at:"
echo "https://YOUR_USERNAME.github.io/REPO_NAME/"
echo ""
echo "=================================================="
echo "📋 DON'T FORGET:"
echo "=================================================="
echo "1. Set up Google Sheets (see SETUP-INSTRUCTIONS.md)"
echo "2. Update script.js with your Google Apps Script URL"
echo "3. Test the live form"
echo "4. Share the link!"
echo ""
echo "🎉 Deployment complete!"
