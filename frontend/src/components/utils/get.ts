export async function GetData(URL: string) {
    return await fetch(URL)
        .then(rsp => rsp.json())
        .then(data => data = JSON.parse(JSON.stringify(data)))
}