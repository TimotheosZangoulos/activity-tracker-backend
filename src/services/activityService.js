const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

let dataIsLoaded = false;
let activities = [];
let adjacencyMatrix = [];

// Get activities from activity-properties.csv
const getActivitiesFromFS = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(path.join(__dirname, "../../../activity-properties.csv"))
      .pipe(csv())
      .on("data", (row) => {
        const start = dayjs(row.StartDate, "D/M/YYYY");
        const end = dayjs(row.EndDate, "D/M/YYYY");
        results.push({
          nodeId: parseInt(row.NodeId, 10),
          start,
          end
        });
      })
      .on("end", () => {
        console.log("Activiries loaded:", results.length, "entries");
        resolve(results)
      })
      .on("error", reject);
  });
};

// Get the adjacency matrix from adjacency-matrix.csv
const getAdjacencyMatrixFromFS = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(path.join(__dirname, "../../../adjacency-matrix.csv"))
      .pipe(csv({ headers: false }))
      .on("data", (row) => {
        const values = Object.values(row).map(v => parseInt(v, 10));
        results.push(values);
      })
      .on("end", () => {
        console.log("Matrix loaded:", results.length, "x", results[0].length, "entries");
        resolve(results);
      })
      .on("error", reject);
  });
};

// Checks if there is a link between 'primaryIndex' and 'secondaryIndex'. 'connectionType' defines the direction of the link
function isConnected(adjacencyMatrix, primaryIndex, secondaryIndex, connectionType) {
  switch (connectionType){
    case "prerequisite":
      return adjacencyMatrix[secondaryIndex][primaryIndex] === 1
    case "dependency":
      return adjacencyMatrix[primaryIndex][secondaryIndex] === 1
    default:
      return false;
  }
}

// Recursive function that returns all connected nodes to activity with index 'index'
const getConnectedNodes = (index, adjacencyMatrix, connectionType, visited = new Set()) => {
  for (let i = 0; i < adjacencyMatrix.length; i++) {
    if (isConnected(adjacencyMatrix, index, i, connectionType) && !visited.has(i)){
        visited.add(i);
        getConnectedNodes(i, adjacencyMatrix, connectionType, visited);
    }
  }

  // Translate indexes to NodeIds 
  return Array.from(visited).map(i => activities[i].nodeId);
};

const getNormalizedActivitiesData = () => {
  return activities.map((activity, index) => {
    const duration = activity.end.diff(activity.start, "day") + 1; 

    const directPrerequisites = [];
    for (let i = 0; i < adjacencyMatrix.length; i++) {
      if (adjacencyMatrix[i][index] === 1){
        directPrerequisites.push(activities[i].nodeId);
      }
    }

    const directDependencies = [];
    for (let j = 0; j < adjacencyMatrix.length; j++) {
      if (adjacencyMatrix[index][j] === 1){
        directDependencies.push(activities[j].nodeId);
      }
    }

    return {
      nodeId: activity.nodeId,
      startDate: activity.start,
      endDate: activity.end,
      duration: duration,
      directPrerequisites: directPrerequisites,
      allPrerequisites: getConnectedNodes(index, adjacencyMatrix, "prerequisite"),
      directDependencies: directDependencies,
      allDependencies: getConnectedNodes(index, adjacencyMatrix, "dependency")
    };
  });
};

const loadDataFromFS = async () => {
  // Acts like a simple caching mechaninsm. No need to re-read the csv files for every requiest
  if (!dataIsLoaded) {
    activities = await getActivitiesFromFS();
    adjacencyMatrix = await getAdjacencyMatrixFromFS();
    dataIsLoaded = true;
  }
};

const getActivitiesData = async () => {
  await loadDataFromFS();
  return getNormalizedActivitiesData();
};

const dataUpdated = () => {
  dataIsLoaded = false;
  activities = [];
  adjacencyMatrix = [];
}

module.exports = { 
  getActivitiesData,
  dataUpdated
};
