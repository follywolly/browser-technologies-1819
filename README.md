# Road to device lab

## Summary
Small application that is used to display progressive enhancement for a route planner.
Try disabling javascript, disabling your internet connection or old browsers to see when the product breaks!

## Table of contents
1. [Demo](#Demo)
2. [Install](#Install)
3. [Research](#Research)
  1. [Desk research](#Desk-research)
  2. [Wireframes](#Wireframes)
4. [High fidelity wireframes](#High-fidelity-wireframes)
5. [Features](#Features)
6. [Codebase](#Codebase)
7. [Features](#Features)   
7. [Conclusion](#Conclusion)   

[License](#License)


## Demo
Check [this live version running on heroku](https://webdev-bt.herokuapp.com)

## Install
Fork this repository and execute the following commands in your terminal:
```bash
git clone https://github.com/YOUR-USERNAME/browser-technologies-1819.git

# Move into repo
cd browser-technologies-1819

# Install dependencies
npm install

# Start server
npm start
# or npm run dev if you want sourcemaps
```

## Research
### Desk Research
I did research to progressive enhancement. I've researched the absence of cookies & images, and tested a previous project of mine on progressive enhancement. You can view the research and conclusions in the different README's within the [research folder](/research) of this repository.

### Wireframes
To make a progressively enhanced prototype from scratch, I started sketching out the most important functionalities of my prototype.
#### Version 1: base functionality
No css, js, images etc. All functionality is handled on the server.
Shows a list of steps to take to get to your destination.
![Wireframe 1](/docs/wireframe_1.jpg)

#### Version 2: CSS / Images work
Nice design, loaders work.
![Wireframe 1](/docs/wireframe_3.jpg)

#### Version 3: Javascript works
Most functionality gets handled by client-side javascript. A map is loaded and your location is visible which updates automatically.
![Wireframe 1](/docs/wireframe_5.jpg)

## High fidelity wireframes
Base functionality with text, inline svg's and list. Svg's have text fallbacks.

![Wireframes high fidelity](/docs/wireframes.png)

---

Progressively enhanced version, javascript works so a map is displayed.

![Wireframes high fidelity](/docs/wireframes_2.png)

## Features
- Core functionality works with HTML only
- When javascript is active, the product gets progressively enhanced so that a live map is shown instead of turn by turn based text list.
- If javascript functionality depends on features that are not available in a specific browser, the list view is still rendered and the javascript is ignored.
- Works offline with service worker. If new request is necessary, offline page is displayed.

## Codebase
All clientside javascript is written in ES5, supporting most available browsers. If functionalities are not available in a specific browser, the code depending on the functionality is ignored.
The server is written in Node, which is independent of clientside availability of functionalities. If javascript is not available, the server will take over functionality.

### 1. Feature detections
- Checking for localStorage (For client side saving of search queries, didn't manage to finish this functionality so does nothing for now)
- Checking for geolocation API (So the user can use his/her current location to navigate to the device lab). When not available or blocked, a user can simply search for a location to start from.
-  Checking for service worker availability to make the site usable when offline. When not available, the site doesn't work when you are offline (kind of annoying, but better than nothing all the time)

### 2. Fallbacks
- Mostly CSS fallbacks: gradients are used, so background-color fallback is used.
- When flexbox is not available, everything still renders, the design is just a little less nice. No big breaks there.

## Testing
The prototype works on all devices of the device lab: during the test some devices were very slow in loading the map, so I added adding a fallback for slow loading to the to-do list.

## Conclusion

## License
[MIT](LICENSE) @ [follywolly](https://folkertjan.nl/)
