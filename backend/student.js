const getStudent = (req, res) => {
    if (req.session.student) {
        res.send({ loggedin: true, student : req.session.student })
    }
    else {
        res.send({ loggedin: false });
    }
}