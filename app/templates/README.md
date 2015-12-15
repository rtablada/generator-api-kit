# Express Shell

This repo is a base shell to get up and running with Express Apps.
It is heavily influenced by the work that I did while creating the "Express Zero to Sixty" course for [EmberGrep](https://embergrep.com).

## Features

* Modified Express Starter Kit
* SB Admin Bootstrap
* App Skeleton
* Authentication
* Express Session (with Redis and Flash vars)
* Mail Driver
* Old Input Middleware
* Form Input Helpers
* User Auth with Passport
* User Creator CLI
* Password Reset With Email and Password Tokens
* Basic Config
* Vagrant File

## Still to Come

* Testing Setup
* Config for Mongo
* Config for Redis
* CSRF
* Configuration with .env instead of config.json

## Developing From this Base

This base app is set up to get rid of the headache of the "stuff you need to make an app".
So at least for a little while, this will get you pretty far into developing your Express apps.
To get started developing locally you only need to do five things.

1. Copy `config/default.json.example` to `config/default.json` and update mail configuration in that file.
2. Run `vagrant up`
3. SSH into vagrant (`vagrant ssh`), `cd /vagrant`, and run `nodemon -L` to run a auto restarting express server!
4. Visit your new server on `192.168.22.10/admin`
5. Bro Down

## Creating a User

By default, this project ships with no front-end, just the routes and logic for logging in,
resetting your password, a blank admin dashboard, and user CRUD.
But, you can't get to half of this because you don't have a user to login with.

In your Vagrant box run `node /vagrant/bin/create-user.js` which will interactively create your first users for the system.

After this you can login and create users from the admin dashboard.

## Conventions

View templates are located in `resources/templates`.
Routes are registered in `http/routes.js` and the resources for the various routes are in `http/resources`.

Everything else is pretty standard.

## License - MIT

The MIT License (MIT)

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
