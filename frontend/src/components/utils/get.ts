export async function GetData(endpoint: string): Promise<any> {
    const baseUrl = 'http://localhost:8080'
    return fetch(baseUrl + endpoint)
        .then(rsp => rsp.json())
        .then(data => data = JSON.parse(JSON.stringify(data)))
        .catch(err => err)
}