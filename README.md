# NomNom Notes

NomNom Notes is an application carefully designed for food lovers in mind to keep track of all the restaurants you want to try in one place. Search and add restaurants to a personal must-try checklist so that when it comes time to eat out, you never forget which restaurants you want to visit again. After experiencing a restaurant, simply check it off your list and decide whether it's worthy to become a favourite or is a pass.

Elevate your dining experiences with NomNom Notes, your ultimate restaurant companion, as remembering where to dine should be as enjoyable as the meal itself.

Note: To use NomNom Notes, you'll need to set up and connect it to the [server repository](https://github.com/ckatieng/katie-ng-nomnomnotes-server.git).


## Features

**Discover & Add:** 

Did you just hear about an amazing restaurant from a friend? Or did you discover a new restaurant on social media? On NomNom Notes, you can explore the most updated database of restaurants and easily add them to your personal "Must-Try" checklist. If you're unsure, view more details about the restaurant and decide for yourself whether it should make your list. Haven't heard of any restaurants recently? Take a look at the "Top 10" list that are rated right within the app for new discoveries. 

**Auto-Order by City:** 

The lists will automatically order restaurants based on their respective cities (such as Coquitlam, Burnaby, Vancouver, Richmond), ensuring a more organized list where you can seamlessly explore based on your location. No manual sorting required! 

**Add to Favourites & Share:** 

Create a curated list of your favourite dining spots and share it with others via a unique URL, enabling real-time updates and the option for friends to add the restaurants to their own lists.

**Review & Rate:** 

After visiting a restaurant, simply check it off your list and decide whether it's worthy to become a favourite or is a pass. Even if it's a pass, you'll still have access to the restaurants that you have visited but feel free to delete and remove it altogether. You also have the option to provide a rating after your dining experience and influence the "Top 10" list.

**Dark Mode:**

Prefer a dark interface? Enable dark mode for a more comfortable viewing experience in low-light environments and enjoy the ease of switching based on your mood or preference!


## How to Use

Clone the client repository:

```bash
git clone git@github.com:ckatieng/katie-ng-nomnomnotes-client.git
```

Go to the client project directory:

```bash
cd katie-ng-nomnomnotes-client
```

Install client dependencies:

```bash
npm install
```

Configure the server URL:

By default, the client expects the server to be running at "http://localhost:5050". If you've configured your server to run on a different port, you'll need to update this configuration in the client.

- Open the `config.jsx` file located in the `utils` folder of the client's source code.
- Modify the `serverUrl` property to match the URL where your server is running. For example:

```javascript
const config = {
    // Updated server URL and port
    serverUrl: "http://localhost:YOUR_SERVER_PORT",
};

export default config;
```

Start the client:

```bash
npm start
```

Note: To use NomNom Notes, it's essential to run both the server and client sides simultaneously. Make sure to run the server side before the client side.


## Tech Stack

**Client:** React, JavaScript, SCSS (BEM), Material UI, Axios, Google Maps API

**Server:** Node.js, Express, Knex.js, JavaScript, Axios, Google Maps API

**Database:** MySQL


## Roadmap

- **User Authentication:** Integrate Passport.js to provide user authentication features like login and signup

- **Location-Based Services:** Add a map feature that allows users to find nearby restaurants on their lists based on their current location to enhance user experience and convenience

- **Mobile App Development:** Expand the application by developing a mobile application using React Native to provide a richer mobile experience


## Credits

Graphics: 
- [https://elements.envato.com/food-icons-5FDDJXG](https://elements.envato.com/food-icons-5FDDJXG)


## Thank You

Thank you for taking the time to checkout NomNom Notes! Feel free to reach out if you have any questions or comments.


---
LinkedIn [@katiecng](https://www.linkedin.com/in/katiecng/) <br>
GitHub [@ckatieng](https://github.com/ckatieng)