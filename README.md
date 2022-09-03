## Image Processing API project
### Scripts
- Install: ```npm install```
- Start server: ```npm run start```
- Build: ```npm run build```
- Prettier: ```npm run prettier```
- Run unit test: ```npm run test```

### Usage
The server be served on port 3001:

#### Endpoint to resize images
http://localhost:3001/image-process

Expected query arguments are:
- _default imageName_:
  - encenadaport
  - encenadaport
  - icelandwaterfall
  - palmtunnel
  - santamonica
- _width_: valid numerical value > 0
- _height_: valid numerical value > 0
- user can click on big image to resize image
#### Example 1
http://localhost:3000
Will display project description and images gallery
User can upload new image and edit image size by click on image

![home page](https://user-images.githubusercontent.com/43747716/188281356-1d28756a-7d89-4c93-9439-6d0cd8977f02.png)

#### Example 2
http://localhost:3000/image-process?imageName=fjord
Will display the original fjord image.
![origin-image](https://user-images.githubusercontent.com/43747716/188281416-373693d1-358e-489a-8dd4-45fb41351574.PNG)

#### Example 3
http://localhost:3000//image-process?imageName=fjord&width=100&height=100
Will scale the fjord image to 100 by 100 pixels and store the resulting image in public/resize folder.

![resize-image](https://user-images.githubusercontent.com/43747716/188281433-98715d9b-30eb-41dd-9869-4f512132f68c.PNG)



