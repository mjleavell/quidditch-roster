import axios from 'axios';

import apiKeys from '../../db/apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllPlayersFromDb = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/players.json`)
    .then((result) => {
      // problem: result is an object and I need it to be an array
      const allPlayersObject = result.data;
      const allPlayersArray = [];
      // have to wrap in an if statement if the array is empty
      // aka when users can start deleting data
      if (allPlayersObject != null) {
        // below gives you an array of strings and we have to loop over it and add player id to it
        Object.keys(allPlayersObject).forEach((playerId) => {
        // we have to use bracket notation because we cant use dot notation with strings
          const newPlayer = allPlayersObject[playerId];
          newPlayer.id = playerId;
          allPlayersArray.push(newPlayer);
        });
      }
      // console below will tell us what we are passing back
      console.log('array', allPlayersArray);
      resolve(allPlayersArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const getPlayersByTeam = teamId => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/players.json`)
    .then((data) => {
      const allPlayers = data.data;
      const correctPlayers = allPlayers.filter(x => x.teamId === teamId);
      resolve(correctPlayers);
    })
    .catch((err) => {
      reject(err);
    });
});

const getAllTeamsFromDb = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/teams.json`)
    .then((result) => {
      const allTeamsObject = result.data;
      const allTeamsArray = [];
      if (allTeamsObject != null) {
        Object.keys(allTeamsObject).forEach((teamId) => {
          const newTeam = allTeamsObject[teamId];
          newTeam.id = teamId;
          allTeamsArray.push(newTeam);
        });
      }
      console.log('array', allTeamsArray);
      resolve(allTeamsArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const getAllPositionsFromDb = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/positions.json`)
    .then((result) => {
      const allPositionsObject = result.data;
      const allPositionsArray = [];
      if (allPositionsObject != null) {
        Object.keys(allPositionsObject).forEach((positionId) => {
          const newPosition = allPositionsObject[positionId];
          newPosition.id = positionId;
          allPositionsArray.push(newPosition);
        });
      }
      console.log('array', allPositionsArray);
      resolve(allPositionsArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const getFullPlayerInfo = players => Promise.all([getAllTeamsFromDb(), getAllPositionsFromDb()])
  .then((dataArray) => {
    const playersFromDb = players;
    const teamsFromDb = dataArray[0];
    const positionsFromDb = dataArray[1];
    const newPlayers = [];
    playersFromDb.forEach((player) => {
      const newPlayer = player;
      teamsFromDb.forEach((team) => {
        if (player.teamId === team.id) {
          newPlayer.team = team.name;
        }
      });
      positionsFromDb.forEach((position) => {
        if (player.positionId === position.id) {
          newPlayer.position = position.name;
        }
      });
      newPlayers.push(newPlayer);
    });
    return Promise.resolve(newPlayers);
  })
  .catch((error) => {
    console.error({ error });
  });

export default {
  getAllPlayersFromDb,
  getPlayersByTeam,
  getAllTeamsFromDb,
  getFullPlayerInfo,
};
