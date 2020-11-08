npm i -g heroku

go to the backend json package 
add this line to the "scripts":
"heroku-postbuild" : "cd client && npm install && npm instal --only-dev --no-shrinkwrap && npm run build"

go in your client dir and write
npm build
