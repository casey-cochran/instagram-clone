## Welcome to my Instagram Clone --- Live Link https://memories-gram.herokuapp.com/

The aim of this project is to mimick certain features of Instagram. Like Instagram this project is a social media application in which users
are able to share content and view other users content. Once signed up users are directed to the home page where the feed is present that
shows all the posts of other users. Not only can they view each others posts, but they are also able to 
comment on various posts and either like or dislike a post. Users are also able to upload their own posts as well as navigate to another
user of the website and view their profile and decided whether or not they would like to follow that user. 

Completing this project shows my dedication to learning how to program, from starting a coding bootcamp with zero prior knowledge, 
to being able to build a full stack application within 2 weeks. We were given 2 weeks to create a project with a minimum of 2 full-CRUD
features, with my little experience I was able to surpass this goal by having completed both CRUD features for user posts and comments 
as well as adding likes, dislikes, and follows features. It was a very difficult task, but I love learning the world of programming
and have enjoyed every step of the way. 

## Wiki Links

* [Feature Lists](https://github.com/casey-cochran/instagram-clone/wiki/Feature-List)
* [User Stories](https://github.com/casey-cochran/instagram-clone/wiki/User-Stories)
* [Database Schema](https://github.com/casey-cochran/instagram-clone/wiki/Database-Schema)
* [WireFrames](https://github.com/casey-cochran/instagram-clone/wiki/WireFrames)

## Features

  * Create an account, sign in, or log in as a demo user
  * View, Edit 
    - User Profiles
  * Create, view, edit, delete
    - Posts
    - Comments
  * Ability to Like and Dislike posts
  * User Follows

## Future features:
  
  * Search
  * Messaging between users


## Technologies Used
  
  * React
  * Redux
  * Javascript
  * Express
  * PostgreSQL
  * Sequelize
  * HTML
  * CSS


## Splash page
![Screen Shot 2022-03-23 at 6 38 50 PM](https://user-images.githubusercontent.com/90711743/159824744-64ba89c6-800a-4b9d-a259-1c5a8a51008a.png)

## Install
 1. Clone this repo at: 
   - git clone git@github.com:casey-cochran/instagram-clone.git

2. CD into the root directory and install dependecies with 
   - npm install

3. Create a POSTGRESQL user with the ability to create DB
   - CREATE USER 'username' WITH PASSWORD 'password' CREATEDB;
   
4. CD into the backend directory and create a .env file in the root, refer to .env.example
    - Fill out file with your desired PORT (5000 preferred), database name/username/password, and a secured JWT_SECRET.
    
5. Add this proxy to your package.json within the frontend directory, replacing or keeping the port defined in your .env file.
    - "proxy": "http://localhost:5000"

6. Create the database and run the migrations then seeders.
    - npx dotenv sequelize db:create
    - npx dotenv sequelize db:migrate
    - npx dotenv sequelize db:seed:all

7. To start the backend directory
    - npm start
    
8. To start the frontend which will default to opening in your browser, if not navigate to http:/localhost:3000
    - npm start
    
10. Signup, login, or continue as a Demo User to explore the site and test out functionality. 

