## My Web Application (EatMan)


* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)
* [Instruction](#instruction)

## Live Link
https://nature-go.herokuapp.com/

## General Info
We want to bring people’s attention to biodiversity in an interactive way so they can
help to protect and enhance the ecological system of Vancouver. Our App helps users identify animals via photo, display relevant information and their effect on biodiversity. They also get points based on the rarity of species they take pictures
of.
	
## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript
* Node.js
* Bootstrap
* JQuery
* Firebase - Firestore, Authentication
* Heroku
* Sweet Alert 2
* Google Vision API
* Google Map API
* Git

## Content
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore                         # Git ignore file
├── Server.js                          # The node js server that run our App
├── visionAPI.json                     # The Google Vision API key used for node.js
├── firebase_auth.json                 # The firebase authentication API key used for node.js
├── package.json                       # This file contains node library dependency
├── node_modules                       # The node library folder
├── private                            # The folder contains our assets and resources
└── README.md

private has the following subfolders and files:
├── img                                # Folder for images
    /ManSunAvatar.jpeg                 # Avatar for Man on about us page
    /MichaelAvatar.png                 # Avatar for Michael on about us page
    /NaturegoFavicon.png               # App favicon
    /NeerajAvatar.jpeg                 # Avatar for Neeraj on about us page
    /RichardAvatar.png                 # Avatar for Richard on about us page
    /background.jpg                    # App background image
    /bird-dribbble.gif                 # Gif for easter egg
    /giphy.gif                         # Gif for 404 page
    /greenIcon.png                     # Green map marker icon
    /redIcon.png                       # Red map marker icon
    /loading.gif                       # Gif for loading window
├── js                                 # Folder for scripts
    /Customization.js                  # Functions used to edit and update user info
    /animal_information.js             # Functions used to display animal information from firebase
    /authentication.js                 # Functions used to check user login status
    /collection.js                     # Functions used to display user's collection as image from firebase
    /easterEgg.js                      # Functions used to display easter egg on index.html
    /firebaseAPI.js                    # The firebase API key for Web2.0
    /imageData.js                      # Functions used to check meta data from image
    /info.js                           # Functions used to retrive animal information and display them
    /leaderboard.js                    # Functions used to retrive the top ten users who has highest score
    /login.js                          # Functions used to allow firebase login
    /map.js                            # Functions used to display Google Map 
    /profile.js                        # Functions used to display user profile 
    /visionClient.js                   # Functions used to send ajax call to server side and use vision API to identify animals
├── css                                # Folder for styles
    /404.css                           # The style for our 404 error page
    /AboutUs.css                       # The style used for About us page
    /Collections.css                   # The style used for Collections page
    /Customization.css                 # The style used for Customizations page
    /info.css                          # The style used for info page
    /leaderboard.css                   # The style for our leaderboard page
    /login.css                         # The style used for login page
    /map.css                           # The style used for map page
    /profile.css                       # The style used for profile page
    /style.css                         # The style used for nav bar
    /upload.css                        # The style used for upload page
├── html                               # Folder for html pages
    /404.html                          # The html used for 404 error page
    /AboutUs.html                      # The html used for About Us page
    /collections.html                  # The html used for Collections page
    /Customization.html                # The html used for Customizations page
    /imageTest.html                    # The html used for image test page
    /index.html                        # The html used for index page
    /info.html                         # The html used for info page
    /leaderboard.html                  # The html used for leaderboard page
    /login.html                        # The html used for login page
    /map.html                          # The html used for map page
    /profile.html                      # The html used for profile page
    /upload.html                       # The html used for upload page
├── fonts                              # Folder for fonts
    /Amadeus.ttf                       # The Amadeus font ttf file
    /SquadaOne-Regular.ttf             # The SquadaOne-Regular font
    /berkshireswash-regular.ttf        # The berkshireswash font
```

# instruction

## Set Up
* Install editor such as VS Code, Sublime, etc.
* Install Node.js and NPM. You can follow the link [here](https://nodejs.org/en/download/)
  To Check that you have node and npm, open your command terminal and type:
  ```node -v``` and ```npm -v```
