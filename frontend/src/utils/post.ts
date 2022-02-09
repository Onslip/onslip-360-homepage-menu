export async function PostData(URL: string, data: any) {
    try {
        const response = await fetch(URL, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        console.log(response);
    } catch (err) {
        console.log(err);
    }
}