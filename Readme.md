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
    /45-donald-trump.jpg               # User profile image
    /bacchus.jpg                       # Restaurant image
    /earls.jpg                         # Restaurant image
    /gotham.jpg                        # Restaurant image
    /japadog.jpg                       # Restaurant image
    /noodlebox.jpg                     # Restaurant image
    /searchBg.jpg                      # The index background
    /backgroundProfile.jpeg            # Profile background image
    /greenIcon.png                     # Green map marker icon
    /redIcon.png                       # Red map marker icon
    /logoEatMan.png                    # Website logo
    /radat.png                         # User location icon  
├── js                                 # Folder for scripts
    /detailFunction.js                 # Functions used for display restaurant detail
    /firebaseAPI.js                    # Store the firebase API key
    /function.js                       # The general function used for every page
    /jquery.simplePagination.js        # The library js file used for pagination
    /mainFunction.js                   # Functions used for main page
    /ownerFunction.js                  # Functions used for owner to display queue list
    /profileFunction.js                # Functions used for display user profile
    /queueDetailFunction.js            # Functions used for display restaurant queue detail
    /resultFunction.js                 # Functions used for display search result
    /reviews.js                        # Functions used for display restaurant detail
    /searchFunction.js                 # Functions used for search 
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
    /editProfileStyle.css              # The style used for editing profile
    /mainStyle.css                     # The style used for main page
    /ownerStyle.css                    # The style used for owner page
    /profile.css                       # The style used for profile page
    /searchStyle.css                   # The style used for search bar

```