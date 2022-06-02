const mysql = require('mysql')
const input = require('readline-sync')

const db_Conn = mysql.createConnection({     // create connection js file with database on terminal
    host: "localhost",
    user: "root",                            // root
    database: "user",                       // database name
    password: "Aadarsh@123"                 // mysql password.
})

const start = async() =>{
    console.log("1. Press 1 for Sign-up\n2. Press 2 for Log-in\n3. Press 3 for update\n4. Press 4 for Delete");
    const op = input.questionInt("Enter your Option: ");
    function connec() {
        db_Conn.connect((err)=>{
            if(err) console.log(err);
            console.log("conntected")
        })

    }

    // for Create or Sign-up.
    if (op == 1) {
        const Id =input.question('Enter your ID: ')
        connec()
        db_Conn.query(`select * from student where id =${Id}`, (err, data) => {
            if (err) {
                console.log("Some error are coming...");
            }
            if (data[0] == undefined) {
                const name = input.question("Enter your name: ")
                const city = input.question("Enter your City name: ")
                const state = input.question("Enter your State name: ")
                db_Conn.connect((err)=>{
                    if(err) console.log(err);
                    console.log("conntected")
                })
                db_Conn.query(`insert into student (id, name, city, state) values ("${Id}", "${name}", "${city}", "${state}")`, (err, data) => {
                    if (err) {
                        console.log("kuchh to gadbad hai daya...");
                    }
                    else {
                        console.log(data)
                        console.log('Sign-up Successfully');
                        start()
                    }
                })
            }
            else {
                console.log("Dublicate ID are not allowed...");
            }
        })
    }
    // for Read and Log-in
    else if (op == 2) {
        const Id = input.questionInt("Enter your ID for conforming: ")
        connec()
        db_Conn.query(`select * from student where id = "${Id}"`, (err, data) => {
            console.log(data);
            if (err) {
                console.log("Some error are coming...");
            }
            else if (data.length > 0) {
                console.log("you have log-in successfuly");
            }
            else {
                console.log("Sorry Your id didn't match");
            }
        })
    }
    // For UPDATING...
    else if (op == 3) {
        const Id = input.questionInt("Conform your ID please: ")
        connec()
        db_Conn.query(`select * from student where id =${Id}`, (err, data) => {
            console.log(data);                   // this will show a particular data of a given ID.
            if (err) {
                console.log('Some error');
            }
            else if(data.length > 0){
                const name = input.question("Enter your Updated name: ")
                const city = input.question("Enter your updated city name: ")
                const state = input.question("Enter your updated state name: ")
                db_Conn.connect((err) => {              // this 3 lines makes connections so that connection will not disconnect...
                    if (err) console.log(err)
                    console.log("Connected.")
                })
                db_Conn.query(`update student set name ="${name}", city = "${city}", state = "${state}" where id = ${Id}`, (err, data) => {
                    if (err) console.log(err);
                    console.log("Your data has been updated...");
                })
            }
            else {
                console.log("Please take valid input.");
            }
        })
    }
    // For DELETING
    else if (op == 4) {
        const Id = input.question("Enter your ID for conforming: ")
        connec()
        db_Conn.query(`select * from student where id = ${Id}`, (err, data) => {
            console.log(data);
            if (err) {
                console.log("Error is Coming...");
            }
            else if (data.length > 0) {
                db_Conn.query(`delete from student where id = ${Id}`, (err, data) => {
                    if (err) console.log(err);
                    console.log("Your data has been Deleted...");
                })
            }
            else {
                console.log("Please take valid input.");
            }
        })
    }
    else{
        return 'you are out of everything...'
    }

}
start();
