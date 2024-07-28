const path = require('path');
const con = require('../config/db.js');
const requestAsset = (userID, assetID, remark, res) => {
    con.query("SELECT * FROM asset_transaction WHERE borrower_id= ? AND booked_date= CURDATE() AND status != ? AND status != ?", [userID, 'cancelled', 'disapproved'], (err, result) => {
        if (err) {
            console.error('Error selecting: ', err);
            return res.status(500).text('server error');
        } else if (result.length != 0) {
            console.log('Already booked today');
            console.log(result.length);
            console.log(result[0]);
            return res.status(400).send('Maximum request for today has been reached!')
        } else {
            con.query('INSERT INTO asset_transaction(asset_id, borrower_id, status, booked_date, remark) VALUES(?, ?, ?, CURDATE(), ?);', [assetID, userID, 'pending', remark], (err, resulr) => {
                if (err) {
                    console.error('error inserting: ', err);
                    return res.status(500).send('server error');
                } else {
                    console.log('request item successful');
                    return res.status(200).send('ok');
                }
            });
        }
    });
}
const takeout = (staffID, tranID, assetID, res) => {
    con.query('UPDATE asset_transaction SET issued_by_id= ?, borrow_date= CURDATE(), expected_return_date= DATE_ADD(CURDATE(), INTERVAL 7 DAY), status= ? WHERE id= ?;', [staffID, 'holding', tranID], (err, result) => {
        if (err) {
            console.error('Error updating trans: ', err);
            return res.status(500).text('server error');
        } else {
            con.query('UPDATE assets SET status= ? WHERE id= ?;', ['borrowed', assetID], (err, result)=>{
                if (err) {
                    console.error('Error updating assets: ', err);
                    return res.status(500).text('server error');
                } else{
                    console.log('ok');
                    return res.status(200).send('ok');
                }
            })
        }
    })
}
const returnItem = (staffID, tranID, assetID, res)=>{
    con.query('UPDATE asset_transaction SET receiver_id= ?, returned_date= CURDATE(), status= ? WHERE id= ?;', [staffID, 'returned', tranID], (err, result) => {
        if (err) {
            console.error('Error updating trans: ', err);
            return res.status(500).text('server error');
        } else {
            con.query('UPDATE assets SET status= ? WHERE id= ?;', ['available', assetID], (err, result)=>{
                if (err) {
                    console.error('Error updating assets: ', err);
                    return res.status(500).text('server error');
                } else{
                    console.log('ok');
                    return res.status(200).send('ok');
                }
            })
        }
    })
}
const approve= (id, userID, assetID, res)=>{
    con.query('SELECT status FROM assets where id= ?;', [assetID], (err, result) => {
        if (err) {
            console.error('error selecting assets: ', err);
            return res.status(500).send('server error');
        } else {
            if (result[0].status != 'available') {
                console.error('not available');
                return res.status(400).send('Already approved');
            } else {
                con.query('UPDATE asset_transaction SET status= ?, validator_id= ?, validated_date= CURDATE() where id= ?;', ['approved', userID, id], (err, result) => {
                    if (err) {
                        console.error('error updating transaction: ', err);
                        return res.status(500).send('server error');
                    } else {
                        console.log('transaction successful');
                        con.query('UPDATE assets SET status= ? where id= ?;', ['waiting for patron', assetID], (err, result) => {
                            if (err) {
                                console.error('error updating assets: ', err);
                                return res.status(500).send('server error');
                            } else {
                                console.log('assets successful');
                                return res.status(200).send();
                            }
                        });
                    }
                });
            }
        }
    });
}
const reject= (id, userID, res)=>{
    con.query('UPDATE asset_transaction SET status= ?, validator_id= ?, validated_date= CURDATE() where id= ?;', ['disapproved', userID, id], (err, result) => {
        if (err) {
            console.error('error updating transaction: ', err);
            return res.status(500).send('server error');
        } else {
            console.log('rejected successfully');
            return res.status(200).send();
        }
    });
}
module.exports = {
    requestAsset,
    takeout,
    returnItem,
    approve,
    reject
}