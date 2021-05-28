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
    /editProfileStyle.css              # The style used for editing profile
    /mainStyle.css                     # The style used for main page
    /ownerStyle.css                    # The style used for owner page
    /profile.css                       # The style used for profile page
    /searchStyle.css                   # The style used for search bar
├── html                               # Folder for html pages
    /editProfileStyle.css              # The style used for editing profile
    /mainStyle.css                     # The style used for main page
    /ownerStyle.css                    # The style used for owner page
    /profile.css                       # The style used for profile page
    /searchStyle.css                   # The style used for search bar
├── fonts                              # Folder for fonts
    /editProfileStyle.css              # The style used for editing profile
    /mainStyle.css                     # The style used for main page
    /ownerStyle.css                    # The style used for owner page
    /profile.css                       # The style used for profile page
    /searchStyle.css                   # The style used for search bar

```