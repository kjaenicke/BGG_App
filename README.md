# BGG iOS APP v0.1.0 [![Build Status](https://travis-ci.org/kjaenicke/BGG_App.png)](https://travis-ci.org/kjaenicke/BGG_App)
## Description
Cool stuff

## Initial Setup
    $ cd www
    $ npm install
    $ bower install

## Grunt Tasks

### *Default*
    $ grunt   
- Minifies and combines app-specific css into `compile.min.css`
- Copies important Bower files to the bower_dist directory
- JSHint's all of the .js files

### Release
	$ grunt release
- Removes everything from the bower_dist directory 
- Minifies and combines app-specific css into `compile.min.css`
- Copies important Bower files to the bower_dist directory
- Removes the bower_components directory
- JSHint's all of the .js files
	
### JSCopy
	$ grunt jscopy
- Copies important Bower files to the bower_dist directory
