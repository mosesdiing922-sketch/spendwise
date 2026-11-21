# SpendWise

## Project Description
SpendWise is a personal budgeting dashboard. It shows a monthly budget summary, six spending
categories (Food, Transport, Rent, Entertainment, Savings and Utilities) as cards, and a list of
expenses. Users can add expenses with a form, delete them, and see the totals, progress bars and
status labels update immediately. The app warns the user when a category is close to or over its budget.

I built it step by step over the course: HTML structure, CSS styling, a CSS Grid and Flexbox
layout, JavaScript logic and DOM updates, and finally deployment to the internet.

## Live Website
**https://YOUR-SITE-NAME.netlify.app**

## Technologies Used
- HTML5 (semantic structure, forms)
- CSS3 (Grid, Flexbox, custom properties, media queries, dark theme)
- JavaScript (variables, conditionals, arrays, loops, functions, DOM manipulation, events)
- Google Fonts (Manrope)
- Git and GitHub (version control and code hosting)
- Netlify (hosting and continuous deployment)
- VS Code (code editor)

## GitHub Repository Information
- Repository: https://github.com/YOUR-USERNAME/spendwise
- Visibility: Public
- Branch deployed: `main`

### Project structure
```
spendwise/
  index.html    page structure
  style.css     styling and layout
  script.js     application logic
  README.md     project documentation
```

## Deployment Process Summary
1. Checked that `index.html`, `style.css` and `script.js` are in the root of the project, that the file names match the links in the HTML, and that the page works locally.
2. Created a public GitHub repository named `spendwise` and uploaded the project files.
3. Signed in to Netlify with my GitHub account and chose **Add new site > Import an existing project**.
4. Selected the `spendwise` repository and the `main` branch. No build command was needed because the site is plain HTML, CSS and JavaScript, and the publish directory was the project root.
5. Clicked **Deploy** and opened the live URL once the deploy finished.
6. Renamed the site from the random default name to `YOUR-SITE-NAME` in **Site configuration > Site details > Change site name**.
7. Tested continuous deployment: I changed the dashboard subtitle in `index.html`, committed the change to GitHub, and Netlify rebuilt and published the update automatically within a minute.
8. Tested the live site: the styles, fonts, script, form, delete buttons and responsive layout all work.

## Challenges Encountered During Deployment
Replace these with the real problems you met. Examples:
- **Challenge:** (for example) The live site showed no styling.
  **Solution:** The CSS file name in the HTML did not match the real file name. Fixing the capital letters solved it, because the hosting server is case-sensitive.
- **Challenge:** (for example) The site name I wanted was already taken.
  **Solution:** I added my name to the site name to make it unique.
- **Challenge:** (for example) My change did not appear on the live site.
  **Solution:** I had saved the file locally but had not committed it to GitHub.

## Lessons Learned
Replace these with your own words. Examples:
- A website only becomes useful to other people when it is hosted online.
- File names and paths matter. A small spelling or capital letter difference can break a live site.
- Continuous deployment saves time: pushing a commit to GitHub updates the live site automatically.
- Testing the live site is different from testing locally, so both are needed.
- The Deploys tab in Netlify shows the logs, which help when something goes wrong.
