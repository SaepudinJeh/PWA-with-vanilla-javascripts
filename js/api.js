const API_KEY = 'e80ea94242284179806d19329a5e67ed';
const BASE_URL = "https://api.football-data.org/v2/";
const LEAGUE_ID = 2014;

const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const TEAM = `${BASE_URL}competitions/${LEAGUE_ID}/teams`;


const Api = {
    async getStanding() {
        try {
            const res = await fetch(ENDPOINT_COMPETITION, {
                headers: {
                    'X-Auth-Token': API_KEY
                }
            });
            return await res.json();
        } catch (err) {
            return console.log(err);
        }
    },

    async getAllTeams() {
        try {
            const res = await fetch(TEAM, {
                headers: {
                    'X-Auth-Token': API_KEY
                }
            });
            return await res.json();
        } catch (err) {
            return console.log(err);
        }
    },

    async getDetailteams(id) {
        try {
            const res = await fetch(`${BASE_URL}teams/${id}`, {
                headers: {
                    'X-Auth-Token': API_KEY
                }
            });
            return await res.json();
        } catch (err) {
            return console.log(err);
        }
    }

};