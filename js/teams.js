window.addEventListener('DOMContentLoaded', async () => {
    const data = await Api.getAllTeams();
    showCardTeams(data);
})


function showCardTeams(data) {
    let teams = "";
    const elms = document.getElementById('homeTeams');
    data.teams.forEach( team => {
        teams += `
        <div class="col s6 m3">
            <a href="./pages/detail.html?id=${team.id}" class="card">
                <div class="card-image" style="padding: 15px;">
                    <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}">
                </div>
            </a>
        </div>
        `;
    });
    elms.innerHTML = teams;
}