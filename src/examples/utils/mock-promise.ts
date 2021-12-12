export default function MockPromise() {
    return new Promise(async (res, rej) => {
        try {
            const response = await (
                await fetch("http://localhost:5000/mock.json")
            ).json();
            res(response);
        } catch (e) {
            rej(e);
        }
    })
}