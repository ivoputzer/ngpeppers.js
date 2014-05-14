ngpeppers
=================
Ngpeppers is an angular boilerplate application for my fellows at [xpeppers](http://xpeppers.com).

The tecnologies involved to bootstrap the project are:
- **[node](http://nodejs.org)** platform based on chrome's javascript runtime
- **[angular](https://angularjs.org)** enhanced html for web apps
- **[gulp](http://gulpjs.com)** node based streaming build system
- **[jade](http://jade-lang.com)** node based templating engine
- **[stylus](http://learnboost.github.io/stylus)** node based css preprocessor
- **[browserify](http://browserify.org/)** in the browser dependecy manager built on top of require.js
- **[mocha](http://visionmedia.github.io/mocha/)** javascript test runner
- **[should](https://github.com/visionmedia/should.js)** framework agnostic bdd style assertion library

### Install
```bash
git clone https://github.com/ivoputzer/ngpeppers.js.git ngpeppers && cd ngpeppers
npm install
```

You can start the development environment through npm direcly like so:
```bash
npm start # which is basically just an alias for `./node_modules/.bin/gulp watch
```

### Test
Once again, you can use npm to launch your test suite. This way `should.js` gets loaded automatically within your test files:
```bash
npm test
```