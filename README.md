![Travis CI badge](https://travis-ci.org/Alicespyglass/middl.svg?branch=master)

# middl

An iOS app for finding new places to meet your friends at a midpoint.

This app allows a user to input their location and a friends location and using the Google Maps API finds the mid point based on latitude and longitude. The app then finds venues within a 500 meter radius of this based on the users selected venue type. Then the top three venues are displayed to the user along with the rating. The user can then select directions to the venue using Google Maps and can send a text message to their friend using Whatsapp with the suggested location.

## Set-up
**1. Install node (if you haven't already)**
```
$ brew install node
```
**2. Download and update repo**
```
$ git clone git@github.com:Alicespyglass/middl.git
$ cd middl
$ npm install
```
If you come across any errors in the terminal at the install, try updating node
```
$ npm update
```

**3. Download xcode**

- Make a cup of tea
- [Download Xcode here along with other useful tools](http://www.preparetocode.io/pick-your-os/)

**4. Set up simulator**

- Check you're in the middl directory

```
$ react-native run-ios
```

**5. Enjoy!**


### Tech Team
[Colin Turner](https://github.com/colinturner)

[Elaine Osbourn](https://github.com/kittysquee)

[Freddy Fallon](https://github.com/freddyfallon)

[Alice Cheung](https://github.com/Alicespyglass)

## Technologies
- Javascript
- React Native
- Jest
- node
- Google developer tools (maps API)
- Git
- JSX
- Whatsapp API
- XCode

## User Stories

```
As a user
So I can meet friends
I would like an app to pick a location

As a user
So my friend and I have equal travel time
I would like to find a midpoint for us to meet

As a user
So I can use this app when I'm out and about
I would like to be able to use this app on my smartphone

As a user
So I can discover new places
I would like to get suggestions where to go

As a user
So I have choice
I would like to be able to choose my type of venue

As a user
So I can tell my friend where we should meet
I would like to be able to text them easily

As a user
So I can pick somewhere good to go
I would like to be able to see a rating

As a user
So I can know where to meet my friend
I would like a map to show me where to go
```

## Mockup

![Mockup](http://i.imgur.com/5BDkcOt.png)

## Screenshots

#### App Icon

![iPhone page with icon](http://i.imgur.com/IkamGI4.png)

#### Splash Screen

![Splash screen](http://i.imgur.com/hKCvoU0.png)

#### Input page

![Entry page](http://i.imgur.com/y6nMucS.png)

#### Input page with text

![Location input](http://i.imgur.com/1Sa6r73.png)

#### Google maps interface

![Google maps](http://i.imgur.com/gHU83Rr.png)

#### Whatsapp Message

![Whatsapp message](http://i.imgur.com/9jKctcZ.png)

#### Demo gif

![Demo gif](./src/assets/demo.gif)
