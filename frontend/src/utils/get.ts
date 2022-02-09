export async function GetData(URL: string) {
    return await fetch(URL)
        .then(rsp => rsp.json())
        .then(data => data = JSON.parse(JSON.stringify(data)))
        .catch(err => alert(err + ': Kunde inte hitta API:t. Kolla så att du har inmatat rätt API-info'));;
}