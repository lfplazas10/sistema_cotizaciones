import fetch from 'isomorphic-fetch';

export function deleteItem(id) {
    return fetch('/producto/' + id, {
        method: 'DELETE',
        mode: 'CORS'
    }).then(res => { return res
     }).catch(err => err);
}