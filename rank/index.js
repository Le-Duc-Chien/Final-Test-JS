let teams = [];

function addTeam() {
  let teamName = document.getElementById("teamName").value.trim();
  let teamPoints = parseInt(document.getElementById("teamPoints").value.trim());
  let teamGD = parseInt(document.getElementById("teamGD").value.trim());

  if (teamName === "" || isNaN(teamPoints) || isNaN(teamGD)) {
    alert("Vui lòng nhập đầy đủ và chính xác thông tin đội bóng.");
    return;
  }

  for (let team of teams) {
    if (team.name === teamName) {
      alert("Đội bóng đã tồn tại. Vui lòng nhập tên đội bóng khác.");
      return;
    }
  }

  teams.push({ name: teamName, points: teamPoints, GD: teamGD });

  displayRankedTeams();

  document.getElementById("teamName").value = "";
  document.getElementById("teamPoints").value = "";
  document.getElementById("teamGD").value = "";
}

function rankTeams(teams) {
  teams.sort((a, b) => {
    if (a.points !== b.points) {
      return b.points - a.points;
    } else {
      if (a.GD !== b.GD) {
        return b.GD - a.GD;
      } else {
        return a.name.localeCompare(b.name);
      }
    }
  });

  return teams;
}

function displayRankedTeams() {
  let teamTable = document.getElementById("teamTable");
  teamTable.innerHTML = "";

  let rankedTeams = rankTeams(teams);
  rankedTeams.forEach((team, index) => {
    let row = `<tr>
                        <td>${index + 1}</td>
                        <td>${team.name}</td>
                        <td>${team.points}</td>
                        <td>${team.GD}</td>
                        <td>
                            <button onclick="editTeam(${index})">Sửa</button>
                            <button onclick="deleteTeam(${index})">Xóa</button>
                        </td>
                   </tr>`;
    teamTable.innerHTML += row;
  });
}

function editTeam(index) {
  let newName = prompt("Nhập tên mới cho đội bóng:");
  if (newName === null || newName.trim() === "") {
    alert("Tên đội bóng không được để trống.");
    return;
  }

  teams[index].name = newName.trim();
  displayRankedTeams();
}

function deleteTeam(index) {
  if (
    confirm(`Bạn có chắc chắn muốn xóa đội bóng "${teams[index].name}" không?`)
  ) {
    teams.splice(index, 1);
    displayRankedTeams();
  }
}

displayRankedTeams();
