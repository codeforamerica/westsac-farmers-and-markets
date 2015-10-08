# Farmers and Market
## using foundation apps


[![devDependency Status](https://david-dm.org/zurb/foundation-apps-template/dev-status.svg)](https://david-dm.org/zurb/foundation-apps-template#info=devDependencies)

This is the new iteration of the app Farm Stand in www.westsacramentourbanfarm.com and is build usign FOUNDATION-APPS a framework design specifically to build web apps rather than just websites.

## Requirements

You'll need the following software installed to get started.

  - [Node.js](http://nodejs.org): Use the installer for your OS.(npm below 2.0 gave me problems so I recommend you to update it before you do anything else.)
  - [Git](http://git-scm.com/downloads): Use the installer for your OS.
    - Windows users can also try [Git for Windows](http://git-for-windows.github.io/).
  - [Gulp](http://gulpjs.com/) and [Bower](http://bower.io): Run `npm install -g gulp bower`
    - Depending on how Node is configured on your machine, you may need to run `sudo npm install -g gulp bower` instead, if you get an error with the first command.

## Get Started

Install Foundation for Apps

```bash
$ npm install -g foundation-cli bower gulp
```

Clone this repository, where `app` is the name of your app.

```bash
git clone https://github.com/codeforamerica/westsac-farmers-and-markets.git 
```

Change into the directory.

```bash
cd app
```

Install the dependencies. If you're running Mac OS or Linux, you may need to run `sudo npm install` instead, depending on how your machine is configured.

```bash
npm install
bower install
```

While you're working on your project, run:

```bash
foundation-apps watch
```

This will compile the Sass and assemble your Angular app. **Now go to `localhost:8080` in your browser to see it in action.** When you change any file in the `client` folder, the appropriate Gulp task will run to build new files.

To run the compiling process once, without watching any files, use the `build` command.

```bash
npm start build
```
