<h1 align="center">Stockbit React Dev Test</h1>

<p align="center">
Simple website app to fetch movies with detail page from [www.omdbapi.com](<http://www.omdbapi.com/> "www.omdbapi.com") 
</p>

## Features

* Auto-suggesstion movie search by title or IMDB ID
* Display list of movies
* Inifinite scroll in movie list page
* Single page for single movie detail
* Toggle dark / light theme

## Installing

* Install dependenciess by execute:
```
yarn add {dependencies}
```

### Executing program

* Running the app by execute:
```
yarn start
```
## Available Commands

* Execute the app by using
```
yarn start
```

The app is built using `create-react-app` so this command Runs the app in Development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. You also need to run the server file as well to completely run the app. The page will reload if you make edits.
You will also see any lint errors in the console.

### `"npm run build": "react-scripts build"`,

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app will be ready to deploy!

### `"npm run test": "react-scripts test"`,

Launches the test runner in the interactive watch mode.

### `"npm run dev": "concurrently "nodemon server" "npm run start"`,

For running the server and app together I am using concurrently this helps a lot in the MERN application as it runs both the server (client and server) concurrently. So you can work on them both together.

### `"serve": "node server"`

For running the server file on you can use this command.

### `npm run serve`

## Built With

- React JS
- Redux
- Redux-toolkit
- Chakra UI
- Axios
- Framer Motion
- React router dom


## Author

**Abi Fauzan**

- [Profile](https://www.linkedin.com/in/abifauzan/ "Abi Fauzan")
- [Email](mailto:abifauzan234@gmail.com?subject=Hi "Hi!")

## 🤝 Support

Contributions, issues, and feature requests are welcome!

Give a ⭐️ if you like this project!