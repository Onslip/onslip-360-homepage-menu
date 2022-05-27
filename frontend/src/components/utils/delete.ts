export function deleteImage(url: string, id: number) {
    fetch(url, {
        method: 'delete',
        body: JSON.stringify(id),
    })
    console.log(JSON.stringify(id))
}