Font:
(Line 20 of style.css) The body font-family was changed to 'Merriweather'.

Box-shadow:
(Line 487 of style.css) The images on the home page were given a box-shadow of 0px 0px 9px 2px rgba(10, 10, 10, 0.2).
(Line 295 of style.css) The box-shadow for the images on the project pages (which use the project-img class) was adjusted to 0 0 10px 1px rgba(10, 10, 10, 0.2).

Colours:
(Line 140 of styles.css) The background of the sidebar was changed to #2a2b2d.This also meant changing the background of the body on line 25. Additionally, the background-color of the buttons was changed to the same colour on line 300. To make the text within the sidebar more visible following this change, I also...
(Line 170 of styles.css) The description within the sidebar had its text color changed to #b2b8b3, using the '.sidebar p' class.
(Line 179 of styles.css) The link text within the sidebar had its text color changed to #828583, using the '.sidebar a' class.

Links:
(Line 16 of layout.pug) The thumbnail image at the top of the sidebar was placed inside a link to the home page.
(Line 21 of layout.pug) I placed the name in the menu inside a link to the home page.

Transitions and transforms:
For the images on the home route via index.pug, I added a rotating 3D cube, which rotates through 3 other images when the user hovers over the image. I also added a transition to add a semi-transparent overlay to the last image in the cube, with a button over it. The user can click through any of the cube to get to the project page. To do this:
(Lines 16 to 23 of index.pug) inside a link to the project page, a container with class of .photo-cube was created to represent the cube. Inside of this, the 4 images to make up the cube were added, with classes defined for each of them (.front, .left, .right, .back). Additionally, another element was added (.back-overlay) to represent a semi-transparent overlay that will transition to appear over the back of the cube during the cubes rotation. This element was also given the same class as the back image of the cube (.back) so that it would be positioned in the same way.
(Line 388 of styles.css) The .photo-cube container was given a transition for it's transform property of 2 seconds. (Lines 397-398) The transition happens on hover, and is defined to rotate 270 degrees, until we see the back of the cube.
(Lines 425-441 of styles.css) The individual sides of the cube were transformed in order to make up the shape of the cube, using the classes defined for each of them (.front, .left, .right, .back).
(Lines 444-455 of styles.css) The .back-overlay was given a transition to change it's background colour to a semi-transparent overlay (it is not visible by default as it has no content). The transition has a delay of 1.5s so that it happens as the back of the cube becomes visible towards the end of the cube's transition. It's z-index is also increased to ensure that it is visible over the back image of the cube. The .back-overlay element also has the .back class to ensure it is positioned exactly as the back image of the cube. (Line 459) The transition is triggered when the cube is hovered over.
(Lines 464-474) The button inside the 3D cube is also given a transition. It's visibility is hidden by default, but it will transition to visible (line 478) when the cube is hovered over. It has a transition delay of 1.4s, so this happens towards the end of the cube's transition as the back of the cube (over which the button is placed, since it is a child of the .back-overlay element) becomes visible.

Making the cube responsive:
The width of the cube is set to 90% of its parent, making it responsive to screen width. However, this means that we need to make the transform values of each side of the cube dynamic as well. To do this...
(Lines 419-422 of styles.css) For the transform properties of the sides of the cube, CSS variables were used which were added in the ::root pseudo-element. These variables were added as the values for the relevant transform properties for the cube's sides (.front, .left, .right, .back). This was done to allow us to dynamically update these variables in JavaScript. Since one value will be positive and one negative, we created two variables.
(Lines 20-26 of script.js) In JavaScript, we stored this root element in a variable. We also stored the first cube element on the page, so that we could later extract it's width.
(Lines 40-41 of script.js) We created listeners for the page "load" and screen "resize" events, as this is when the width of the cubes can change. We will call the 'setTransformAmounts' function on these events. This function will update the variables used for the transform properties of the cube's sides, so these values reflect the newly-computed width of the cube.
(Lines 29-37 of script.js) The 'setTransformAmounts' gets the computed styles of the cube. This will contain the width amount in pixels of the cube. We store this on line 32, using parseInt to remove the 'px' from the end. We can then use this to calculate the values for the transform variables. These values are half of the width, but one of them is positive and the other is negative. The variables are then updated (lines 35-36) so that the sides of the cube which use them are positioned correctly.

Other:
(Line 258 of styles.css) .cell was given text-align: center in order to center the headlines on the home page within their parent element. Similarly, the cube parent was given margin: 0 auto; in order to center the cubes within their parent (line 386). 
(Line 372 of styles.css) I added the default-space class to provide some padding for the error and page-not-found templates.
I added two of my own projects, which were WordPress websites. Since these didn't have GitHub links, I added a property 'type' to these WordPress projects in data.json, then a condition to project.pug to only display the GitHub link buttons if the project didn't have a 'type' equal to 'Website' (line 23 of project.pug). For all of the JavaScript projects, the GitHub link button displays as per the template.