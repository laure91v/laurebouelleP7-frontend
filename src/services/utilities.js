export const VALIDATE_EMAIL = (mail) => { 
    console.log(mail);
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,9})*$/.test(mail))
    {
        console.log('coucou');
    return true;
    }
    return false;
};

export const FORMAT_DATE = (dateString) =>{
    const simpleDates = dateString.split(".")[0].split("T");
    const leftDates = simpleDates[0].split("-").reverse().join("-");

    return leftDates + " " + simpleDates[1];
}


//2021-01-12T16: 40: 39.000Z