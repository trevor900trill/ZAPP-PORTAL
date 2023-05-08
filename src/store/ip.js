//PROD URL
export const url = 'https://prod.zapp.co.ke/portal';

//LOCAL URL
// export const url = 'http://192.168.0.30:5000/portal';

export const loginHeaders = () => {
    return {
        'Content-Type': 'application/json'
    };
};

export const getHeaders = () => {
    const t = JSON.parse(localStorage.getItem('user'));
    return {
        'Accept-Type': 'application/json',
        Authorization: 'Bearer ' + t.access_token
    };
};

export const postHeaders = () => {
    const t = JSON.parse(localStorage.getItem('user'));
    return {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + t.access_token
    };
};

export const getCurrentTime = () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    return today.toISOString();
};
