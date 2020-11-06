const dbPromise = idb.open('football-teams', 4, upgradeDb => {
    const detailObjectStore = upgradeDb.createObjectStore('clubs', {
        keyPath: "id"
    });
    detailObjectStore.createIndex('team', 'team', {
        unique: true
    });
});

const Db = {
    addTeam(team) {
        return dbPromise.then(db => {
            const tx = db.transaction('clubs', 'readwrite')
            tx.objectStore('clubs').put(team)
            return tx.complete
        })
    },

    getTeam(id) {
        return dbPromise.then(db => {
            const tx = db.transaction('clubs', 'readonly')
            return tx.objectStore('clubs').get(id)
        })
    },

    getAllTeams() {
        return dbPromise.then(db => {
            const tx = db.transaction('clubs', 'readonly')
            return tx.objectStore('clubs').getAll()
        })
    },

    deleteTeam(id) {
        dbPromise.then(db => {
            const tx = db.transaction('clubs', 'readwrite')
            return tx.objectStore('clubs').delete(id)
        })
    }
}

