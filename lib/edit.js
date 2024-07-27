const path = require('path');
const con = require('../config/db.js');
const bcrypt = require('bcrypt');

const editProfile = (id, name, profilePictureUrl, req, res) => {
    con.query('UPDATE users SET name=?, profile_pic=? WHERE id=?;', [name, profilePictureUrl, id], function (err, result) {
        if (err) {
            console.error("Error updating user info: ", err);
            return res.status(500).send("Server error");
        } else {
            console.log("Profile Edit successful");
            req.session.name = name;
            req.session.pp = profilePictureUrl;
            res.status(200).send("Profile updated");
        }
    })
}
const changePassword = (old, new1, new2, id, res) => {
    if(!old|| !new1 || !new2){
        console.log("No input: ");
        return res.status(400).send('please enter password');
    }
    con.query('SELECT psw FROM users WHERE id= ?;', [id], (err, result) => {
        if (err) {
            console.error("Error selecting user: ", err);
            return res.status(500).send('Sever error');
        } else {
            if (result.length != 1) {
                console.error("id not found");
                return res.status(400).send('user not found');
            } else {
                bcrypt.compare(old, result[0].psw, (err, same) => {
                    if (err) {
                        console.error("Hashing error: ", err);
                        return res.status(500).send('Server error');
                    } else {
                        if (same) {
                            if (new1.length < 4) {
                                return res.status(400).send("Passwords needs to be at least 4 characters long");
                            } else if (new1 != new2) {
                                return res.status(400).send("Passwords do not match");
                            }
                            postPassword(new1, id, res);
                        } else {
                            console.error("Old password is incorrect");
                            return res.status(400).send('Old password is incorrect');
                        }
                    }
                })
            }
        }
    })
}
function postPassword(new1, id, res) {
    bcrypt.hash(new1, 10, (err, hash) => {
        if (err) {
            console.error("Hashing error: ", err);
            return res.status(500).send('Server error');
        } else {
            con.query('UPDATE users SET psw=? WHERE id=?;', [hash, id], (err, result) => {
                if (err) {
                    console.error("Updating psw error: ", err);
                    return res.status(500).send('Server error');
                } else {
                    res.status(200).send("Password changed");
                }
            })
        }
    })
}
const editAsset=(id, name, type, status, desp, res)=>{
    if(!name || !type || !status ){
        return res.status(400).send("All fields are required.");
    }
    con.query('UPDATE assets SET name= ?, type_id= ?, status= ?, description= ? WHERE id= ?;',[name, type, status, desp, id],(err, result)=>{
        if(err){
            console.error('Error updating table: ', err);
            return res.status(500).send('Server error');
        }else {
            return res.status(200).send('changes saved');
        }
    })
}
const disable = (id, res)=>{
    con.query('UPDATE assets SET status= ? WHERE id= ?;', ['disabled', id], (err, result)=>{
        if(err){
            console.error("Error updating: ", err);
            return res.status(500).send('server error');
        }else{
            console.log('disabling success');
            return res.status(200).send('ok');
        }
    })
}
const addAsset= (name , type, status, desp, res)=>{
    con.query('INSERT INTO assets (name, type_id, status, description) VALUES(?, ?, ?, ?);', [name, type, status, desp], (err, result)=>{
        if(err){
            console.error('Error inserting asset: ', err);
            return res.status(500).send('server error');
        }else{
            console.log('asset added');
            res.status(200).send('/StaffAssetList');
        }
    })
}
const AddNews= (title, desp, profilePictureUrl, res)=>{
    console.log('Hello'+ title+ desp+ profilePictureUrl);
    con.query("INSERT INTO news (title, desp, img) VALUES(?, ?, ?);", [title, desp, profilePictureUrl], (err, result)=>{
        if(err){
            console.error('Error inserting news: ', err);
            return res.status(500).send('server error');
        }else{
            console.log('news added');
            res.status(200).send();
        }
    })
}
module.exports = {
    editProfile,
    changePassword,
    editAsset,
    disable, 
    addAsset,
    AddNews
}