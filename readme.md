#Node-Telegram-Bot 

[![Build Status](https://travis-ci.org/crisbal/Node-Telegram-Bot.svg)](https://travis-ci.org/crisbal/Node-Telegram-Bot)

A Telegram Bot which supports user-made plugins

Written in Node.js

Based on [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) 

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
###Table of Contents

- [Running the Bot](#running-the-bot)
- [Using the Bot](#using-the-bot)
- [Plugins](#plugins)
  - [Writing custom plugins](#writing-custom-plugins)
- [TODO](#todo)
- [Contributing](#contributing)
- [Constributors](#constributors)
- [Need help?](#need-help)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

##Running the Bot

* Clone/Download/Fork the repository
* ```npm install```
* Create a Bot Account 
    * Get the associated token (https://core.telegram.org/bots/#botfather)
* Set the required Environment Variables (two methods)
    1. Via ```setup.sh```
        * Edit ```setup.sh```
            * Set ```TELEGRAM_TOKEN``` with the auth token of your bot
            * Set the other API Keys if you want to enable the relative plugins.
        * Run ```source setup.sh```
    2. Set them manually
        * Check setup.sh to see the required Environment Variables.
* Edit config.js
    * Edit ```activePlugins``` if you want to edit the active plugins. It is an array of the filenames of the active plugins. 
        * You can find the plugins in the ```plugins``` folder.
* Run the bot
    * ```node Bot.js``` 
    * Stop it at any time with CTRL+C

##Using the Bot

Send a message to the bot or add it to a group chat and you are ready to use it!

Use ```/list``` to see a list of the enabled plugins or ```/help \<plugin-name\>``` to get an explanation for each enabled plugin.

##Plugins

Plugins can be easly written with a basic understanding of JavaScript.

Check the ```plugins``` folder to see the available plugins and check each file to see a basic explanation for each plugin.

###Writing custom plugins

* Take a look at the provided plugins in the ```plugins``` folder
* Create a ```.js``` file in the ```plugins``` folder

Basic Class Skeleton
``` javascript
var pluginName = function(){
    
    this.help = {
        shortDescription: "Set a simple and short description for your plugin here.",
        fullHelp: "Add examples, an in-depth explanation here."
        //both these fields are required
    };

    this.on('message', function (msg, reply) {
        //this will be executed whenever your bot get a message

        /*
            1. Check if the msg.text matches the trigger for your plugin
            2. Do stuff you need
            3. Produce reply 
                replyText = {type:"text", text:"Message you want to post"}
                replyAudio = {type:"audio", audio:"path/to/audio.mp3"}
                replyPhoto = {type:"photo", photo:"path/to/photo.png"}
                replyStatus = {type:"status", status:"typing"}
            4. Post the reply
                reply(replyText); //for example

        */
    });

};

module.exports = pluginName;
```
##TODO
* Tests!
* Improve utilities module (downloading files , common database, generate markdown links)
* More Plugins
* Documentation
* Website
* Promotion


##Contributing
Did you made a plugin you want to share with everyone? Did you improve the code in any way?

Submit a pull request! 

This project will only grow if *YOU* help!

##Constributors
In Alphabetical Order

* [Cristian Baldi](https://github.com/crisbal/)
    * Crated the project
    * Developed a bunch plugins
    
* [Phill Farrugia](https://github.com/phillfarrugia/)
    * Improved & documented the code
    * Added Heroku Integration
    * Created Unit Tests
    * Added automatic testing via Travis CI 
    
##Need help?
Send me a mail or create an issue, I will answer ASAP. :+1:
