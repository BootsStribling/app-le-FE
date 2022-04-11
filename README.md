# Flask - React JWT Auth Template - Front End

This is the front end of a decoupled Flask React app that includes JWT Authentication.

When combined with the back end found [here](https://github.com/SEI-Remote/flask-api-auth-template), you'll have all you need to build a full stack Flask React app!

Use this to go build things! 🚀

## To Use This Template

**Replace `<name-of-your-app-here>` in the commands below with the name of your app!**

```bash
git clone https://github.com/SEI-Remote/flask-react-jwt-auth-template-frontend.git <name-of-your-app-here>
cd <name-of-your-app-here>-front-end
```

Once you are in the project directory:

```bash
rm -rf .git
```

Here's what your command line output should like after this step (note that the indicator that we are in a git repository is gone!)

<img src="https://i.imgur.com/L47kNOZ.png" alt="The command line before and after running the rm -rf .git command. Before git:(main) is visible indiating that the directory contains a git repository, after the command it is not.">

Re-initialize a git repository:

```bash
git init
```

Use the GitHub CLI to create a new project repository on GitHub:

```bash
gh repo create <name-of-your-app-here>-front-end
```

Run `npm i` to fetch the template's dependencies:

```bash
npm i
```

touch a `.env` file:

```bash
touch .env
```

Fill it with the following:

```
REACT_APP_API_URL=http://127.0.0.1:5000
```

> 🚨 DO NOT place secrets in this `.env` file. The contents of this file WILL be exposed to site visitors.

Delete this README.md, then make an initial commit:

```bash
git add .
git commit -m "initial commit"
git push -u origin main
```

You're done!