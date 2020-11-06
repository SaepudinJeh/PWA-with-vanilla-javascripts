window.addEventListener('DOMContentLoaded', async () => {
    const data = await Db.getAllTeams();
    showCardBookmark(data);
})


function showCardBookmark(data) {
    let teams = "";
    const elms = document.getElementById('bookmark');
    data.forEach( team => {
        teams += `
        <div class="col s6 m3">
            <a href="detail.html?id=${team.id}" class="card">
                <div class="card-image" style="padding: 15px;">
                    <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}">
                </div>
            </a>
        </div>
        `;
    });
    elms.innerHTML = teams;
}