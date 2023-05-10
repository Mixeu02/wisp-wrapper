async function getFetch(url, token, returnJSON) {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.wisp.v1+json",
        "Authorization": "Bearer " + token
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
    });
    return returnJSON ? response.json() : null;
  }
  
async function postFetch(url, token, params, returnJSON) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.wisp.v1+json",
        "Authorization": "Bearer " + token
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
      body: JSON.stringify(params)
    });
    return returnJSON ? response.json() : null; // parses JSON response into native JavaScript objects
}
  
async function patchFetch(url, token, params, returnJSON) {
    const response = await fetch(url, {
      method: "PATCH",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.wisp.v1+json",
        "Authorization": "Bearer " + token,
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
      body: JSON.stringify(params)
    });
    return returnJSON ? response.json() : null; // parses JSON response into native JavaScript objects
}

module.exports = { getFetch, postFetch, patchFetch };