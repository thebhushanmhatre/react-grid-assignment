# React Grid Assignment

## Assignment: Frontend Dashboard with AG Grid

At FactWise, we use client-side AG Grid for all our tables and grids. We’d like you to create a robust and scalable functional dashboard using AG Grid that can handle large data sets efficiently.

### Requirements:

- Create a dashboard displaying tabular data using AG Grid in React (client-side rendering).
- Use the sample dataset attached (20 rows) ([Stored locally for the sake of this assignment](./src/data/factwiseData.json))
- Feel free to be as creative as you can, while keeping the layout clean and professional.

### Steps to run on your local machine

- Clone this repo
- Install the packages using "npm install"
- Run the app using "npm run dev"

### Folder Structure and how to navigate in this app and the practices that I like following

- Start from App.tsx in src folder
- pages/ - This folder contains the 2 pages: Employees Grid and Employee Details page
- components/ - This folder contains the reusable components: GridBuilder, Dropdown,
- hooks/ - This folder is for custom hooks: useColDefs and useFetchData
- models/ - This folder contains the type definitions
- utilities/ - This is for various operations that you need to do across the app.
- data/ - This folder contains the sample dataset (This ideally won't be present in code in PROD env)

Other folder not present here but i generally like having them are:

- services/ - For API Calls, to be used in customHooks
- constants/ - For constant, config files, telemetry names, user/client friendly static messages
