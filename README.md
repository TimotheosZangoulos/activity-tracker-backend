# ActivityTracker Backend
This project shows information about activities and it's dependencies.

Create a directory that holds the activity-tracker-backend and in the same directory, place the data files (activity-properties.csv, adjecency-matrix.csv). 
The application folder and the data file must be in the same level. 
The directory structure should look like this:
    -- ProjectDirectory
    --- activity-tracker-backend
    --- activity-properties.csv
    --- adjacency-matrix.csv
 

## Setup Instructions
### 1. Make sure you have installed [Node.js](https://nodejs.org/)
### 2. Clone The repository
### 3. Navigate to activity-tracker-backend directory
### 4. Install Depencencies > npm install
### 5. Run the backend > node server.js
### 6. The backend application is running in Port 5000


## API Endpoints
### 1. GET /activities
#### Request Body: none
#### Retrieve all information about all activities
### 2. POST /data/updated
#### Request Body: none
#### Alert the backend the the data file (.csv) changed. Make the caching functionality to reset
