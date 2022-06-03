export async function GetData(path: string): Promise<any> {
    return fetch(path)
        .then(rsp => rsp.json())
        .then(data => data = JSON.parse(JSON.stringify(data)))
        .catch(err => err)
}