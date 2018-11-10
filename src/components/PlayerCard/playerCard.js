import './playerCard.scss';

const createPlayerCard = (player) => {
  const domString = `
    <li class="player-team-${player.team.toLowerCase()} ${player.subsitute ? 'player-card-subsitute' : ''}">
      <div class="img-holder">
        <img class="player-img" src="${player.picture}">
      </div>
      <h3 class="player-name">${player.name}</h3>
      <h5 class="player-position-${player.position.toLowerCase()}">${player.position}</h5>
    </li>
  `;
  return domString;
};

export default createPlayerCard;
