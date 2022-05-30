export async function PostData(endpoint: string, data: any) {
    const baseUrl = 'http://localhost:8080'
    try {
        const response = await fetch(baseUrl + endpoint, {
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

export async function PostImage(endpoint: string, data: any) {
    const baseUrl = 'http://localhost:8080'
    try {
        const response = await fetch(baseUrl + endpoint, {
            method: 'post',
            body: data,
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        console.log(response);
    } catch (err) {
        console.log(err);
    }
}