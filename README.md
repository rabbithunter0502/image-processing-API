## Image Processing API project
### Scripts
- Install: ```npm install```
- Start server: ```npm run start```
- Build: ```npm run build```
- Prettier: ```npm run prettier```
- Run unit tests: ```npm run test```

### Usage
The server be served on port 3000:

#### Endpoint to resize images
http://localhost:3000/image-process

Expected query arguments are:
- _imageName_:
  - encenadaport
  - encenadaport
  - icelandwaterfall
  - palmtunnel
  - santamonica
- _width_: valid numerical value > 0
- _height_: valid numerical value > 0

#### Example 1
http://localhost:3000
Will display a hint and list available image names

#### Example 2
http://localhost:3000/image-process?imageName=fjord
Will display the original fjord image.

#### Example 3
http://localhost:3000//image-process?imageName=fjord&width=100&height=100
Will scale the fjord image to 100 by 100 pixels and store the resulting image in public/resize folder.




