export function deleteImage(endpoint: string, id: number) {
    const baseUrl = 'http://localhost:8080'
    fetch(baseUrl + endpoint, {
        method: 'delete',
        body: JSON.stringify(id),
    })
    console.log(JSON.stringify(id))
}