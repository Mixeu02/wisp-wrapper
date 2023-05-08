
// Util

async function getData(url, token) {
    const tokenHeader = `Authorization: Bearer ${token}`

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.wisp.v1+json",
        tokenHeader
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: null, // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

// Classes

class panel{
    constructor(name, token){
        this.name = name
        this.token = token
    }

    async init(){
        return await getData(`https://${this.name}/api/client/ENDPOINT`, this.token);
    }
}

module.exports = panel;