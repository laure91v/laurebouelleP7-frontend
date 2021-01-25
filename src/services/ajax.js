export const AJAX_GET_POST = (url, method, dataToSend) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.open(method, url);
        
        xhr.addEventListener('load', () => {
            
            if(xhr.status === 200 || xhr.status === 201) {
                
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject({
                    error: 'Une erreur est survenue, statut de la requête : ' + xhr.status,
                    response: xhr.responseText
                });
            }
        });

        xhr.addEventListener('error', error => {
            reject({
                error: 'Une erreur est survenue, statut de la requête : ' + xhr.status,
                response: error
            });
        });
        const storedData = localStorage.getItem('groupomania_P7');
        if(storedData) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + JSON.parse(storedData).token);
        }
       
        if(dataToSend) {
            dataToSend = JSON.stringify(dataToSend);
            xhr.setRequestHeader('content-type', 'application/json');
        }

        xhr.send(dataToSend);
        
        
    });
};