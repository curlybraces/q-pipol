# i-PMS
 A Quasar framework-based version of the Investment Programming and Management System for the frontend. It uses quasar v.1.0.4 and @quasar/app v1.0.5.
 
## Requirements
 
1. NPM must be installed.
2. Yarn must be installed.
3. Quasar CLI must be installed. Run `npm install @quasar/cli`

## Framework used

Quasar Framework: https://github.com/quasarframework/quasar

## Running on Dev Server

1. Open your command prompt or terminal.
2. Clone the repository `git clone https://github.com/mlab817/q-pipol`
3. Go to the newly created directory `cd q-pipol`. Note: If you changed the title of the folder, cd into that directory.
4. This repository uses Yarn as it is the recommended package manager of Quasar. To install dependencies, run `yarn install`
5. To test the app, run `quasar dev`.

## File Directory

```bash
.
+-- _config.yml
+-- _drafts
|   +-- begin-with-the-crazy-ideas.textile
|   +-- on-simplicity-in-technology.markdown
+-- _includes
|   +-- footer.html
|   +-- header.html
+-- _layouts
|   +-- default.html
|   +-- post.html
+-- _posts
|   +-- 2007-10-29-why-every-programmer-should-play-nethack.textile
|   +-- 2009-04-26-barcamp-boston-4-roundup.textile
+-- _data
|   +-- members.yml
+-- _site
+-- index.html
```
├──

## Deploying in the Live Server
1. To build the application for deployment: 
   SPA:       `quasar build spa`
   PWA:       `quasar build -m pwa`
   Mobile:    `quasar build -m cordova -T android|ios`
   Electron:  `quasar build -m electron`
   This will create a /dist folder in your directory.
2. To deploy into the server, just copy the files in the spa folder and upload them to the server.

## License

The Quasar Framework is open-source software licensed under the MIT license.
