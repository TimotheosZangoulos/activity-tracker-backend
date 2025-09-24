This project shows information about activities and it's dependencies.

Create a directory that holds the activity-tracker-backend and in the same directory, place the data files (activity-properties.csv, adjecency-matrix.csv). 
The applicatio folder and the data file must be in the same level.
 

## Setup Instructions
### 1. Clone The repository
### 2. Navigate to activity-tracker-backend directory
### 3. Install Depencencies > npm install
### 4. Run the backend > ng serve
### 5. The application is running in Port 5000


## API Endpoints
### 1. GET /activities
#### Retrieve all information about all activities
### 2. POST /data/updated
#### Request Body: none
#### Alert the backend the the data file (.csv) changed. Make the caching functionality to reset
