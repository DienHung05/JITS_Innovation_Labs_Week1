const BASE = 'http://localhost:1337';

export async function api(path,body) {
    const res = await fetch(BASE + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body || {}),
    });
    return res.json();
}