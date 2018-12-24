
Angelo De Laurentis and Bibek Shrestha
Under supervision of John Morton for Cal Poly ITS

link to site: https://angelodel01.github.io/

What we want to show with this site:
   - Single Page app in Vanilla javascript
      - Routing with deep links
      - Dynamic scalable framework
   - Querying APIs (Accessing an open stock API)
      - https://angelodel01.github.io/#stock
   - Querying protected APIs (Accessing github repos given access token)
      - https://angelodel01.github.io/#repo
   - Querying OpenID protected API (Handled with redirect to AWS cognito sign in)
      - https://angelodel01.github.io/#protected
   - Connecting to self made API hosted on Amazon SAM
      - https://angelodel01.github.io/#personSearch



Project layout:
   This website is built entirely out of html generated javascript except for the main home page that you first see when you load the site.
   - README.md
      This file.

   - index.html
      The base html for the website. Includes the header at the top of all the pages and the 4 buttons on the home page that you use to navigate to the different pages of the website.

   - format.css
      All the formatting for the website.

   - DOMFunction.js
      General use functions that dynamically update the DOM.

   - personSearch.js, protected.js, repo.js, stock.js
      Implements the main functionality of pulling and displaying the data for their respective pages.

   - source.js
      Navigation/routing logic and initial rendering for each page, ie: building buttons, text boxes etc...



Javascript approach:
   - DOMFunction.js (check comments on file for more)
      - All "create" functions create respective html elements with given id as their id and append them to the element specified by the given parentId. If no parentId is given then document body is used as default.
      - All functions pertaining to deleting/hiding objects are here too.

   - personSearch.js
      - Uses fetch api function to make a api call to get the calpoly users matching the inputted search param.
      - Displays and updates the matched result in a html "table" element.
      - Error message is displayed if the input is invalid.

   - protected.js
      - Redirects to the AWS cognito sign-in if the cookie is missing.
      - Uses fetch api function to make a api call with authorization token to get the protected data on pets.
      - Displays the result in a html "table" element.

   - repo.js
      - Uses fetch api function to make a api call to get the repos from the inputted access token.
      - Displays and updates the matched result in a html "table" element.
      - Error message is displayed if the input is invalid.

   - stock.js
      - Uses XMLHttpRequest to make a api call to get the stock data of the inputted stock symbol.
      - Displays and updates the matched result in a html "table" element.
      - Error message is displayed if the input is invalid.

   - source.js (check comments on file for more)
      - Initialization functions
      - Button click functions
      - Cookie handlers
