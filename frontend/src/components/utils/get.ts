export async function GetData(URL: string): Promise<any> {
    return fetch(URL)
        .then(rsp => rsp.json())
        .then(data => data = JSON.parse(JSON.stringify(data)))
        .catch(err => err)
}