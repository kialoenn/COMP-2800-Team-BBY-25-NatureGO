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