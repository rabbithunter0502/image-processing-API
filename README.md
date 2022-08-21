### Scripts
- Install: ```npm install```
- Build: ```npm run build```
- Lint: ```npm run lint```
- Prettify: ```npm run prettify```
- Run unit tests: ```npm run test```
- Start server: ```npm run start```

### Usage
The server will listen on port 3000:

#### Brief instructions
http://localhost:3000/

#### Endpoint to resize images
http://localhost:3000/api/images

Expected query arguments are:
- _filename_: Available filenames are:
  - encenadaport
  - encenadaport
  - icelandwaterfall
  - palmtunnel
  - santamonica
- _width_: numerical pixel value > 0
- _height_: numerical pixel value > 0

#### Example 1
http://localhost:3000/api/images
Will display a hint and list available image names

#### Example 2
http://localhost:3000/api/images?filename=encenadaport
Will display the original encenadaport image.

#### Example 3
http://localhost:3000/api/images?filename=encenadaport&width=100&height=100
Will scale the encenadaport image to 100 by 100 pixels and store the resulting image.
On subsequent calls will serve the resized image instead of resizing the
original again.



