const convertDate = date => {
    const mydate = new Date(date);
    return mydate.getDate() + "." + (mydate.getMonth() + 1) + "." + mydate.getFullYear();
}

export default convertDate;