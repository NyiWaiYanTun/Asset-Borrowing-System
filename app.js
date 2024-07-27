const express = require('express');
const app = express();
const path = require('path');
const con = require('./config/db.js');
const session = require('express-session');
const memorystore = require('memorystore')(session);
// --------------------------------------------------Self-written js imports----------------------------------------------------------------------
const auth = require('./lib/auth.js');
const photo = require('./lib/photo.js')
const edit = require('./lib/edit.js');
const transaction = require('./lib/transaction.js');
const scheduler= require('./lib/scheduler.js');
const verify= require('./lib/verify.js')
// --------------------------------------------------middleware setups----------------------------------------------------------------------------
app.use(session({
    cookie: { maxAge: 24 * 60 * 60 * 1000 },//7 days
    secret: 'todayisagoodday',
    resave: false,
    saveUninitialized: true,
    store: new memorystore({
        checkPeriod: 24 * 60 * 60 * 1000
    })
}));
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// --------------------------------------------------Linking html files with server--------------------------------------------------------------
app.get('/', function (req, res) {
    if (req.session.role) {
        if (req.session.role == 1) {
            res.redirect('/StudentHome');
        } else if (req.session.role == 2) {
            res.redirect('/LecturerDashboard');
        } else if (req.session.role == 3) {
            res.redirect('/StaffDashboard');
        }
    } else {
        res.sendFile(path.join(__dirname, 'ZLandingPage.html'));
    }
});
app.get('/Register', function (req, res) {
    res.sendFile(path.join(__dirname, 'ZRegister.html'));
});
app.get('/StudentLogin', function (req, res) {
    if (req.session.role) {
        if (req.session.role == 1) {
            res.redirect('/StudentHome');
        } else if (req.session.role == 2) {
            res.redirect('/LecturerDashboard');
        } else if (req.session.role == 3) {
            res.redirect('/StaffDashboard');
        }
    } else {
        res.sendFile(path.join(__dirname, 'StudentLogin.html'));
    }
});
app.get('/StudentHome', function (req, res) {
    if (req.session.role == undefined) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'StudentHome.html'));
    }
});
app.get('/StudentAssetList', function (req, res) {
    if (req.session.role == undefined) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'StudentAssetList.html'));
    }
});
app.get('/StudentRequestedItem', function (req, res) {
    if (req.session.role == undefined) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'StudentRequestedItem.html'));
    }
});
app.get('/StudentHistory', function (req, res) {
    if (req.session.role == undefined) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'StudentHistory.html'));
    }
});
app.get('/StudentProfile', function (req, res) {
    if (req.session.role == undefined) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'StudentProfile.html'));
    }
});
app.get('/StaffLogin', function (req, res) {
    if (req.session.role) {
        if (req.session.role == 1) {
            res.redirect('/StudentHome');
        } else if (req.session.role == 2) {
            res.redirect('/LecturerDashboard');
        } else if (req.session.role == 3) {
            res.redirect('/StaffDashboard');
        }
    } else {
        res.sendFile(path.join(__dirname, 'StaffLogin.html'));
    }
});
app.get('/StaffDashboard', function (req, res) {
    if (req.session.role == undefined) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'StaffDashboard.html'));
    }
});
app.get('/StaffAssetList', function (req, res) {
    if (req.session.role == undefined) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'StaffAssetList.html'));
    }
});
app.get('/StaffAddItem', function (req, res) {
    if (req.session.role == undefined) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'StaffAddItem.html'));
    }
});
app.get('/StaffTakeOutItem', function (req, res) {
    if (req.session.role == undefined) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'StaffTakeOutItem.html'));
    }
});
app.get('/StaffReturnItem', function (req, res) {
    if (req.session.role == undefined) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'StaffReturnItem.html'));
    }
});
app.get('/StaffHistory', function (req, res) {
    if (req.session.role == undefined) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'StaffHistory.html'));
    }
});
app.get('/StaffEditItem', function (req, res) {
    if (req.session.role == undefined) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'StaffEditItem.html'));
    }
});
app.get('/StaffProfile', function (req, res) {
    if (req.session.role == undefined) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'StaffProfile.html'));
    }
});
app.get('/StaffNews', function (req, res) {
    if (req.session.role == undefined) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'StaffNews.html'));
    }
});
app.get('/LecturerLogin', function (req, res) {
    if (req.session.role) {
        if (req.session.role == 1) {
            res.redirect('/StudentHome');
        } else if (req.session.role == 2) {
            res.redirect('/LecturerDashboard');
        } else if (req.session.role == 3) {
            res.redirect('/StaffDashboard');
        }
    } else {
        res.sendFile(path.join(__dirname, 'LecturerLogin.html'));
    }
});
app.get('/LecturerDashboard', function (req, res) {
    if (req.session.role == undefined) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'LecturerDashboard.html'));
    }
});
app.get('/LecturerAssetList', function (req, res) {
    if (req.session.role == undefined) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'LecturerAssetList.html'));
    }
});
app.get('/LecturerBorrowRequest', function (req, res) {
    if (req.session.role == undefined) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'LecturerBorrowRequest.html'));
    }
});
app.get('/LecturerHistory', function (req, res) {
    if (req.session.role == undefined) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'LecturerHistory.html'));
    }
});
app.get('/LecturerProfile', function (req, res) {
    if (req.session.role == undefined) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'LecturerProfile.html'));
    }
});
// --------------------------------------------------user info routes---------------------------------------------------------------------
app.get('/user', (req, res) => {
    res.json({ 'userID': req.session.userID, 'name': req.session.name, 'email': req.session.email, 'role': req.session.role, 'pp': req.session.pp });
})
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('server error');
        } else {
            res.status(200).send('/');
        }
    });
})
// --------------------------------------------------Register----------------------------------------------------------------------------
app.post('/register', photo.upload.single('image'), function (req, res) {
    const { name, email, password, confirmPassword } = req.body;
    const profilePictureUrl = req.file ? `/public/img/inc/${req.file.filename}` : '/public/img/no-photo.jpg';
    auth.Register(name, email, password, confirmPassword, profilePictureUrl, res);
});
// --------------------------------------------------Login-------------------------------------------------------------------------------
app.post('/StudentLogin', function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const remember = req.body.remember;
    auth.Login(email, password, 1, remember, req, res);
});
app.post('/StaffLogin', function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const remember = req.body.remember;
    auth.Login(email, password, 3, remember, req, res);
});
app.post('/LecturerLogin', function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const remember = req.body.remember;
    auth.Login(email, password, 2, remember, req, res);
});
// --------------------------------------------------Edit profile-------------------------------------------------------------------------------
//profile edit
app.post('/EditProfile', photo.upload.single('image'), function (req, res) {
    const { name, id, isPhotoRemoved, pp } = req.body;
    if (req.file) {
        console.log('changed');
        profilePictureUrl = `/public/img/inc/${req.file.filename}`;
        photo.deletePhoto(pp);
    } else if (isPhotoRemoved == "true") {
        console.log('removed');
        profilePictureUrl = '/public/img/no-photo.jpg';
        photo.deletePhoto(pp);
    } else {
        console.log('unchanged');
        profilePictureUrl = pp;
    }
    edit.editProfile(id, name, profilePictureUrl, req, res);
});
app.post('/ChangePassword', (req, res) => {
    const old = req.body.old;
    const new1 = req.body.new1;
    const new2 = req.body.new2;
    const id = req.body.id;
    edit.changePassword(old, new1, new2, id, res);
})
// --------------------------------------------------Assets-------------------------------------------------------------------------
//browse assets 
app.get('/assets', (req, res) => {
    con.query('SELECT assets.id AS id, assets.name AS name, asset_type.name AS type, assets.status AS status, assets.description AS desp FROM assets LEFT JOIN asset_type ON assets.type_id = asset_type.id;', (err, result) => {
        if (err) {
            console.error("Error selecting assets:", err);
            return res.status(500).send("Server error");
        } else if (result.length < 1) {
            console.log('no data');
            return res.status(400).send("No asset to show");
        } else {
            res.json(result);//200
        }

    });
})
//edit assets
app.post('/getEditAsset', (req, res) => {
    const id = req.body.id;
    con.query('SELECT assets.name AS name, assets.type_id AS type, assets.status AS status, assets.description AS desp FROM assets where assets.id= ?;', [id], (err, result) => {
        if (err) {
            console.error("Error selecting asset:", err);
            return res.status(500).send("Server error");
        } else if (result.length != 1) {
            console.log('no data');
            return res.status(400).send("No asset to show");
        } else {
            console.log(result[0].desp);
            res.status(200).json(result[0]);//200
        }
    })
})
app.post('/editAsset', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const type = req.body.type;
    const status = req.body.status;
    const desp = req.body.desp;
    edit.editAsset(id, name, type, status, desp, res);
})
//disable asset
app.post('/disableAsset', (req, res) => {
    const id = req.body.id;
    edit.disable(id, res);
})
//add asset
app.post('/addAsset', (req, res) => {
    const name = req.body.name;
    const type = req.body.type;
    const status = req.body.status;
    const desp = req.body.desp;
    edit.addAsset(name, type, status, desp, res);
})
// --------------------------------------------------transactions-------------------------------------------------------------------------
//students
//when clicked on request this item
app.post('/requestAsset', (req, res) => {
    const userID = req.body.userID;
    const assetID = req.body.assetID;
    const remark = req.body.remark;
    transaction.requestAsset(userID, assetID, remark, res);
})
//to load all the requested items
app.post('/requestedAssets', (req, res) => {
    const userID = req.body.userID;
    con.query(`SELECT assets.id AS assetID, 
                assets.name AS assetName, 
                asset_type.name AS assetType,
                asset_transaction.borrower_id AS borrower,
                asset_transaction.status AS status,
                asset_transaction.remark AS remark,
                DATE_FORMAT(asset_transaction.booked_date, '%Y-%m-%d') AS booked_date,
                asset_transaction.validated_date != CURDATE() AS notToday
                FROM asset_transaction 
                LEFT JOIN assets ON asset_transaction.asset_id = assets.id 
                LEFT JOIN asset_type ON assets.type_id = asset_type.id
                WHERE asset_transaction.borrower_id = ? AND asset_transaction.status IN ('pending', 'approved', 'disapproved');`, [userID], (err, result) => {
        if (err) {
            console.error('error selecting: ', err);
            return res.status(500).send('server error');
        } else {
            res.status(200).json(result);
        }
    });
})
//to load all the history of a student
app.post('/studentHistory', (req, res) => {
    const userID = req.body.userID;
    con.query(`SELECT assets.id AS assetID, 
                assets.name AS assetName, 
                asset_type.name AS assetType,
                asset_transaction.borrower_id AS borrower,
                DATE_FORMAT(asset_transaction.borrow_date, '%Y-%m-%d') AS borrow_date,
                DATE_FORMAT(asset_transaction.returned_date, '%Y-%m-%d') AS return_date,
                users.name AS approved_by,
                asset_transaction.status AS status,
                asset_transaction.remark AS remark
                FROM asset_transaction 
                LEFT JOIN assets ON asset_transaction.asset_id = assets.id 
                LEFT JOIN asset_type ON assets.type_id = asset_type.id
                LEFT JOIN users ON asset_transaction.validator_id = users.id
                WHERE asset_transaction.borrower_id = ? AND asset_transaction.status IN ('returned');`, [userID], (err, result) => {
        if (err) {
            console.error('error selecting: ', err);
            return res.status(500).send('server error');
        } else {
            res.status(200).json(result);
        }
    });
})
//when clicked on cancel request
app.post('/cancelRequest', (req, res) => {
    const assetID = req.body.assetID;
    console.log(assetID);
    con.query("UPDATE asset_transaction SET status= ? WHERE asset_id= ?;", ['cancelled', assetID], (err, result) => {
        if (err) {
            console.error('Error updating transaction: ', err);
            return res.status(500).send('server error');
        } else {
            con.query("UPDATE assets SET status= ? WHERE id= ?;", ['available', assetID], (err, result) => {
                if (err) {
                    console.error('Error updating assets: ', err);
                    return res.status(500).send('server error');
                } else {
                    console.log('successful');
                    return res.status(200).send('ok');
                }
            })
        }
    })
})
//lecturer
// to load all the borrow requests
app.post('/borrowRequests', (req, res) => {
    //const userID = req.body.userID;
    con.query(`SELECT asset_transaction.id AS id,
                assets.id AS assetID, 
                assets.name AS assetName, 
                asset_type.name AS assetType,
                users.name AS borrower,
                asset_transaction.status AS status,
                asset_transaction.remark AS remark,
                DATE_FORMAT(asset_transaction.booked_date, '%Y-%m-%d') AS booked_date
                FROM asset_transaction 
                LEFT JOIN assets ON asset_transaction.asset_id = assets.id 
                LEFT JOIN asset_type ON assets.type_id = asset_type.id
                LEFT JOIN users ON asset_transaction.borrower_id= users.id
                WHERE asset_transaction.status= ?;`, ["pending"], (err, result) => {
        if (err) {
            console.error('error selecting: ', err);
            return res.status(500).send('server error');
        } else {
            res.status(200).json(result);
        }
    });
})
//to approve the request
app.post('/approve', (req, res) => {
    const id = req.body.id;
    const assetID = req.body.assetID;
    const userID = req.body.userID;
    transaction.approve(id, userID, assetID, res);
})
//to reject the request
app.post('/reject', (req, res) => {
    const id = req.body.id;
    const assetID = req.body.assetID;
    const userID = req.body.userID;
    transaction.reject(id, userID, res);
})
//to load the history of a lecturer
app.post('/lecturerHistory', (req, res) => {
    const userID = req.body.userID;
    con.query(`SELECT asset_transaction.id AS id,
                assets.id AS assetID, 
                assets.name AS assetName, 
                asset_type.name AS assetType,
                users.name AS borrower,
                asset_transaction.status AS status,
                DATE_FORMAT(asset_transaction.validated_date, '%Y-%m-%d') AS validated_date
                FROM asset_transaction 
                LEFT JOIN assets ON asset_transaction.asset_id = assets.id 
                LEFT JOIN asset_type ON assets.type_id = asset_type.id
                LEFT JOIN users ON asset_transaction.borrower_id= users.id
                WHERE asset_transaction.status NOT IN ('pending') AND asset_transaction.validator_id= ?;`, [userID], (err, result) => {
        if (err) {
            console.error('error selecting: ', err);
            return res.status(500).send('server error');
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
})
// Staff
//to load items to be taken out
app.get('/takeoutLoad', (req, res) => {
    con.query(`SELECT asset_transaction.id AS id,
                assets.id AS assetID, 
                assets.name AS assetName, 
                asset_type.name AS assetType,
                users.name AS borrower,
                DATE_FORMAT(asset_transaction.booked_date, '%Y-%m-%d') AS booked_date
                FROM asset_transaction 
                LEFT JOIN assets ON asset_transaction.asset_id = assets.id 
                LEFT JOIN asset_type ON assets.type_id = asset_type.id
                LEFT JOIN users ON asset_transaction.borrower_id= users.id
                WHERE asset_transaction.status= ?;`, ['approved'], (err, result) => {
        if (err) {
            console.error('error selecting: ', err);
            return res.status(500).send('server error');
        } else {
            res.status(200).json(result);
        }
    });
})
//to take out item
app.post('/takeout', (req, res) => {
    const staffID = req.body.userID;
    const tranID = req.body.tranID;
    const assetID = req.body.assetID;
    transaction.takeout(staffID, tranID, assetID, res);
})
//to load items to be returned
app.get('/returnLoad', (req, res) => {
    con.query(`SELECT asset_transaction.id AS id,
                assets.id AS assetID, 
                assets.name AS assetName, 
                asset_type.name AS assetType,
                users.name AS borrower,
                DATE_FORMAT(asset_transaction.borrow_date, '%Y-%m-%d') AS borrow_date
                FROM asset_transaction 
                LEFT JOIN assets ON asset_transaction.asset_id = assets.id 
                LEFT JOIN asset_type ON assets.type_id = asset_type.id
                LEFT JOIN users ON asset_transaction.borrower_id= users.id
                WHERE asset_transaction.status in( ?, ?);`, ['holding', 'overdue'], (err, result) => {
        if (err) {
            console.error('error selecting: ', err);
            return res.status(500).send('server error');
        } else {
            res.status(200).json(result);
        }
    });
})//to return item
app.post('/return', (req, res) => {
    const staffID = req.body.userID;
    const tranID = req.body.tranID;
    const assetID = req.body.assetID;
    transaction.returnItem(staffID, tranID, assetID, res);
})
//to load history for staff
app.get('/staffHistoryLoad', (req, res) => {
    con.query(`SELECT asset_transaction.id AS id,
                assets.id AS assetID, 
                assets.name AS assetName, 
                asset_type.name AS assetType,
                users.name AS borrower,
                asset_transaction.status AS status,
                asset_transaction.borrow_date AS borrow_date,
                asset_transaction.expected_return_date AS _due_date,
                asset_transaction.returned_date AS return_date
                FROM asset_transaction 
                LEFT JOIN assets ON asset_transaction.asset_id = assets.id 
                LEFT JOIN asset_type ON assets.type_id = asset_type.id
                LEFT JOIN users ON asset_transaction.borrower_id= users.id
                WHERE asset_transaction.status IN ('disapproved', 'timeout', 'returned', 'cancelled');`, (err, result) => {
        if (err) {
            console.error('error selecting: ', err);
            return res.status(500).send('server error');
        } else {
            res.status(200).json(result);
        }
    });
})
//Dashboard
app.get('/dashboard', (req, res) => {
    con.query(` SELECT
                    asset_type.name AS asset_type,
                    statuses.status AS status,
                    COALESCE(COUNT(assets.id), 0) AS count
                FROM
                    (SELECT DISTINCT status FROM assets) AS statuses
                CROSS JOIN
                    asset_type
                LEFT JOIN
                    assets ON assets.type_id = asset_type.id AND assets.status = statuses.status
                GROUP BY
                    asset_type.name, statuses.status
                ORDER BY
                    asset_type.name, statuses.status;`,(err, result)=>{
                    if(err){
                        console.error('error selecting: ', err);
                        return res.status(500).send();
                    }else{
                        console.log('successful');
                        return res.status(200).json(result);
                    }
                })
});
// --------------------------------------------------transactions-------------------------------------------------------------------------
app.post('/AddNews', photo.upload.single('image'), function (req, res) {
    const { title, desp} = req.body;
    if (req.file) {
        console.log('added');
        profilePictureUrl = `/public/img/inc/${req.file.filename}`;
    } else{
        console.log('no photo');
        profilePictureUrl = '/public/img/anouncement.jpg';
    }
    edit.AddNews(title, desp, profilePictureUrl, res);
});
app.get('/news', (req,res)=>{
    con.query('SELECT title, desp, img FROM news ORDER BY id DESC LIMIT 6;', (err, result)=>{
        if(err){
            console.error('error selecting: ', err);
            return res.status(500).send('server error');
        }else{
            console.log('successful');
            return res.status(200).json(result);
        }
    })
});
// --------------------------------------------------email verification-------------------------------------------------------------------------
app.post('/sendVerificationEmail', async (req, res) => {
    const email = req.body.email;
    verify.sendEmail(email, res);
  });
  

app.get('/verify/:token', (req, res) => {
    const { token } = req.params;
    verify.verifyToken(token, res);
  });
// Listening to the port
app.listen(4000, () => {
    console.log('Server is running at port 4000...');
});