export const url = 'https://lm.qwikpace.com/api/v1';

//export const url = 'http://a90689165673642adb46ae8886bc24b2-989850680.us-east-2.elb.amazonaws.com/api';

export const loginHeaders = () => {
    return {
        'Content-Type': 'application/json'
    };
};

export const getHeaders = () => {
    const t = JSON.parse(localStorage.getItem('user'));
    return {
        'Accept-Type': 'application/json',
        Authorization: 'Bearer ' + t.token
    };
};

export const postHeaders = () => {
    const t = JSON.parse(localStorage.getItem('user'));
    return {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + t.token
    };
};

export const getCurrentTime = () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    return today.toISOString();
};
