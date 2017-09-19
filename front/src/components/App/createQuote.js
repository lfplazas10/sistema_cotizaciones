//Se pudo haber definido como una constante dentro de el archivo index.js
import fetch from 'isomorphic-fetch';

export function createQuote(data) {
    return fetch('/cotizacion', {
        method: 'POST',
        mode: 'CORS',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res;
    }).catch(err => err);
}
