window.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const teamId = urlParams.get('id');

    const data = await Api.getDetailteams(teamId);
    showCardDetail(data);
    saveData(data);
})


function showCardDetail(data) {
    const elms = document.querySelector('.body-content');
    cardDetails = `
        <div class="card image-card">
            <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" />
            </div>
        </div>
        <div class="row card">
            <table class="centered responsive-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Shortname</th>
                        <th>Adress</th>
                        <th>Phone</th>
                        <th>Website</th>
                        <th>Email</th>
                        <th>Club Color</th>
                        <th>Venue</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${data.name}</td>
                        <td>${data.shortName}</td>
                        <td>${data.address}</td>
                        <td>${data.phone}</td>
                        <td>${data.website}</td>
                        <td>${data.email}</td>
                        <td>${data.clubColors}</td>
                        <td>${data.venue}</td>
                        </tr>
                </tbody>
            </table>
        </div>`;
        
    elms.innerHTML = cardDetails;
}

async function saveData(data) {
    const button = document.getElementById('save')
    if (await Db.getTeam(data.id)) {
        button.innerHTML = 'delete'
    }

    button.addEventListener('click', async () => {
        let exist = await Db.getTeam(data.id)

        if (exist) {
            Db.deleteTeam(data.id)
            button.innerHTML = 'bookmark'
            console.log('Team berhasil dihapus!')
        } else {
            Db.addTeam(data)
            button.innerHTML = 'delete'
            console.log('Team berhasil ditambahkan!')
        }
    })
}