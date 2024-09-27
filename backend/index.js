const express = require('express');
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());
app.use(session({
    secret: "nekisecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: true
    }
}));


const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "mojabaza",
    timezone: "utc"
});

// useful

const mysqlDateFormat = (date) => {
    let year = date.toISOString().slice(0, 4);
    let month = date.toISOString().slice(5, 7);
    let day = date.toISOString().slice(8, 10);
    return (day + "." + month + "." + year + ".");
}

// STUDENT

app.get("/", (req, res) => {
    if (req.session.student) {
        res.send({ loggedin: true, uloga: req.session.uloga, student: req.session.student })
    }
    else if (req.session.osoblje) {
        res.send({ loggedin: true, uloga: req.session.uloga, student: req.session.osoblje })
    }
    else {
        res.send({ loggedin: false });
    }
});

app.post("/logout", (req, res) => {
    req.session.student = null;
    req.session.osoblje = null;
    req.session.destroy();
    res.send("Uspjesno si se odjavio.");
});

app.post("/login", (req, res) => {
    const jmbg = req.body.jmbg;
    const password = req.body.password;

    if (jmbg && password) {

        db.query("SELECT * FROM nastavno_osoblje WHERE jmbg = ? AND lozinka = ?", [jmbg, password], (err, result) => {
            if (err) res.send(err);

            else if (result.length == 1) {
                req.session.osoblje = result[0];
                req.session.uloga = result[0].uloga.toLowerCase();
                res.send({ ...result[0], loggedin: true, uloga: req.session.uloga });
            }
            else {
                db.query("SELECT * FROM student WHERE jmbg = ? AND lozinka = ?", [jmbg, password], (err, result) => {
                    if (err) res.send(err);

                    else if (result.length == 1) {
                        req.session.student = result[0];
                        req.session.uloga = "student";
                        res.send({ ...result[0], loggedin: true, uloga: req.session.uloga });
                    }
                    else {
                        res.send("JMBG i lozinka se ne poklapaju.");
                    }
                })
            }
        })
    }
    else {
        res.send("Morate unijeti JMBG i password za prijavu.");
    }
});

app.post("/student/register", (req, res) => {

    const jmbg = req.body.jmbg;
    const lozinka = req.body.lozinka;
    const ime = req.body.ime;
    const prezime = req.body.prezime;
    const datum_rodjenja = req.body.datum_rodjenja;
    const mjesto_rodjenja = req.body.mjesto_rodjenja;
    const spol = req.body.spol;
    const drzavljanstvo = req.body.drzavljanstvo;
    const adresa_boravista = req.body.adresa_boravista;
    const telefon = req.body.telefon;
    const mail = req.body.mail;
    const broj_indeksa = req.body.broj_indeksa;
    const semestar = req.body.semestar;
    const akademska_godina_upisa = req.body.akademska_godina_upisa;
    const uloga = req.body.uloga;

    if (jmbg) {
        db.query("SELECT * FROM student WHERE jmbg = ?", [jmbg], (err, result) => {
            if (err) {
                res.send(err);
            }

            if (result.length === 0) {
                if
                    (
                    jmbg &&
                    lozinka &&
                    ime &&
                    prezime &&
                    datum_rodjenja &&
                    mjesto_rodjenja &&
                    spol &&
                    drzavljanstvo &&
                    adresa_boravista &&
                    telefon &&
                    mail &&
                    broj_indeksa &&
                    semestar &&
                    akademska_godina_upisa &&
                    uloga
                ) {
                    db.query(
                        `INSERT INTO student
                (
                    jmbg,
                    lozinka,
                    ime,
                    prezime,
                    datum_rodjenja,
                    mjesto_rodjenja,
                    spol,
                    drzavljanstvo,
                    adresa_boravista,
                    telefon,
                    mail,
                    broj_indeksa,
                    semestar,
                    akademska_godina_upisa,
                    uloga
                )
            VALUES(
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )`,
                        [
                            jmbg,
                            lozinka,
                            ime,
                            prezime,
                            datum_rodjenja,
                            mjesto_rodjenja,
                            spol,
                            drzavljanstvo,
                            adresa_boravista,
                            telefon,
                            mail,
                            broj_indeksa,
                            semestar,
                            akademska_godina_upisa,
                            uloga
                        ],
                        (err, result) => {
                            if (err) res.send({ err: err });
                            if (result) {
                                res.send(result);
                            }
                        }
                    )
                }
                else {
                    res.send("Morate popuniti sva polja.");
                }
            }
            else {
                res.send("Korisnik sa tim jmbgom vec postoji.");
            }
        })
    }
});

// OBAVJESTENJA

app.get("/obavjestenja", (req, res) => {
    db.query("SELECT * FROM obavjestenja", (err, result) => {
        if (err) {
            res.send(err);
        }

        if (result.length < 1) {
            res.send("Nema obavjestenja.");
        }
        else {
            res.send(result);
        }
    })
})

app.post("/obavjestenja/dodaj", (req, res) => {

    const naslov = req.body.naslov;
    const obavjestenje = req.body.obavjestenje;

    if (!(naslov && obavjestenje)) {
        res.send("Morate popuniti polja naslov i obavjestenje.");
        return;
    }

    db.query("INSERT INTO obavjestenja (naslov, obavjestenje, datum) VALUES (?, ?, ?)",
        [naslov, obavjestenje, mysqlDateFormat(new Date())],
        (err, result) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(result);
            }
        })
})

// predmeti

app.get("/predmeti", (req, res) => {
    db.query("SELECT * FROM predmet", (err, result) => {
        if (err) {
            res.send(err);
        }

        if (result.length < 1) {
            res.send("Nema predmeta.");
        }
        else {
            res.send(result);
        }
    })
})

app.post("/predmet/dodaj", (req, res) => {

    const naziv = req.body.naziv;
    const semestar = req.body.semestar;

    if (!(naziv && semestar)) {
        res.send("Morate popuniti polja naziv i semestar.");
        return;
    }

    db.query("INSERT INTO predmet (naziv, semestar) VALUES (?, ?)",
        [naziv, semestar],
        (err, result) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(result);
            }
        })
})

// ispiti

app.get("/ispiti", (req, res) => {
    db.query("select * from ispit as e where TIMESTAMP(e.datum_vrijeme) >= NOW()", (err, result) => {
        if(err) res.send(err);
        else {
            if(result.length > 0) {
                res.send(result);
            }
            else {
                res.send("Nije pronadjen nijedan ispit.");
            }
        }
    })
})

app.post("/ispit/dodaj", (req, res) => {

    const predmet_id = req.body.predmet_id;
    const datum_vrijeme = req.body.datum_vrijeme;

    if (!(predmet_id && datum_vrijeme)) {
        res.send("Morate popuniti polja predmet_id i datum_vrijeme.");
        return;
    }

    db.query("SELECT * FROM predmet where id = ?", [predmet_id], (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            if (result) {
                if (result.length > 0) {
                    db.query("INSERT INTO ispit (predmet_id, datum_vrijeme) VALUES (?, ?)", [predmet_id, datum_vrijeme], (err, result) => {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.send(result);
                        }
                    })
                }
                else {
                    res.send("Ne postoji taj predmet u bazi.");
                }
            }
        }
    })
})

app.get("/polozeniispiti/:student_id", (req, res) => {
    if(req.params.student_id) {
        db.query("SELECT * FROM polozeni_ispiti WHERE student_id = ?", [req.params.student_id], (err, result) => {
            if(err) {
                res.send(err);
            }
            else if(result.length > 0) {
                res.send(result);
            }
            else {
                res.send("Nije pronadjen student sa tim id-em");
            }
        })
    }
    else res.send("student_id nije validan");
})

// QR

app.get("/qrstuff/:jmbg", (req, res) => {
    if (req.params.jmbg.length === 13) {
        db.query("SELECT * FROM student WHERE jmbg = ?", [req.params.jmbg], (err, result) => {
            if (err) {
                res.send(err);
            }
            else {
                if (result.length > 0) {
                    res.send("JMBG: " + result[0].jmbg + "<br>LOZINKA: " + result[0].lozinka);
                }
                else {
                    res.send("INVALID JMBG");
                }
            }
        })
    }
    else {
        res.send("INVALID JMBG");
    }
})

app.listen(3001, () => {
    console.log("Startan projekat");
})