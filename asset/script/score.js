fetch('http://localhost:3000/scores')
.then(response => response.json())
.then(data => {
  let jsonData = '';
  data.players.forEach(player => {
    jsonData += `<tr>
    <td>${player.name}</td>
    <td>${player.score}</td>
    </tr>`;
  });
  document.querySelector("#json-data tbody").innerHTML = jsonData;
})
.catch(error => console.error(error));