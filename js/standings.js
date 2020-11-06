window.addEventListener('DOMContentLoaded', async () => {
    const data = await Api.getStanding();
    showCardStandings(data);
});


function showCardStandings(data) {
    let standings = "";

    const elms = document.getElementById('homeStandings');
    data.standings[0].table.forEach( standing => {
        standings += `
            <tr>
                <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                <td>${standing.team.name}</td>
                <td>${standing.won}</td>
                <td>${standing.draw}</td>
                <td>${standing.lost}</td>
                <td>${standing.points}</td>
            </tr>
        `;
    });

    elms.innerHTML = `
        <table class="centered striped">
            <thead>
                <tr>
                    <th></th>
                    <th>Team Name</th>
                    <th>Won</th>
                    <th>Draw</th>
                    <th>Lost</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody id="standings">
                ${standings}
            </tbody>
        </table>
    `;
}