Here's an upload img program that works.

type: nodemon index.js and go to localhost:3000

after tou click "upload", a "page?" opens saying "image uploaded".

You can go back in the browser to the main page, but rather we'd stay on the main page alltogether.

I suspect this behaviour in now in the "view engine?"

Also we need a drop-image form

There's also now the function to submit a json file
It will also end up in the file images

git init
git add .
git status
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/bigBagBoogy/multer-img-upload.git
git push -u origin main

npx kill-port 3000
