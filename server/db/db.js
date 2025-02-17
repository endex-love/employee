import mysql from 'mysql'

const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"employee"
})
conn.connect(function(err){
    if(err){
        console.log("connection error")

    } else {
        console.log("connected")
    }
})
export default conn;