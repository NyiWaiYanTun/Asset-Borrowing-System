const path = require('path');
const con = require('../config/db.js');
const bcrypt = require('bcrypt');
// --------------------------------------------------Email domain check----------------------------------------------------------------------------
var isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
// -----------------------------------------------------Register------------------------------------------------------------------------------------
var Register = (name, email, password, confirmPassword, profilePictureUrl, res) => {
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).send("All fields are required.");
  }
  //  check if email looks like an email
  if (isValidEmail(email) == false) {
    return res.status(400).send("Enter a valid email");
  }
  // Check if email is already in use
  con.query('SELECT * FROM users WHERE email = ?', [email], function (err, result) {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).send("Server error");
    }
    if (result.length != 0) {
      // Email already exists in the database
      console.log("already in use");
      return res.status(400).send("Email already in use.");
    } else {
      // Perform user registration
      if (password.length < 4) {
        console.log("Passwords needs to be at least 4 characters long");
        return res.status(400).send("Passwords needs to be at least 4 characters long");
      }
      if (password != confirmPassword) {
        console.log("Passwords do not match");
        return res.status(400).send("Passwords do not match");
      }
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
          console.error("Hashing error:", err);
          return res.status(500).send("Server error");
        } else {
          con.query('INSERT INTO users (name, email, psw, profile_pic, type_id) VALUES (?, ?, ?, ?, ?);', [name, email, hash, profilePictureUrl, 1], function (err, result) {
            if (err) {
              console.error("Error inserting new user:", err);
              return res.status(500).send("Server error");
            }
            else {
              console.log("Register successful");
              res.status(200).send("verify your email");
            }
          })
        }
      })
    }
  });
}
// --------------------------------------------------Login---------------------------------------------------------------------------------------------
var Login = (email, password, role, remember, req, res) => {
  if (!email || !password) {
    return res.status(400).send("All fields are required.");
  }
  con.query('SELECT id, email, name, psw, profile_pic, type_id, isVerified  FROM users WHERE email = ? AND type_id = ?', [email, role], function (err, result) {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).send("Server error");
    } else if (result.length != 1) {
      console.log("Email not found");
      return res.status(400).send("Email not found");
    } else if(!result[0].isVerified){
      return res.status(400).send("Please verify your email first");
    }else {
      bcrypt.compare(password, result[0].psw, function (err, same) {
        if (err) {
          console.error("Error checking password:", err);
          return res.status(500).send("Server error");
        }
        else {
          if (same) {
            if (remember == false) {
              req.session.cookie.maxAge = 60 * 60 * 1000; //1 hour
            } else {
              req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000; //7 days
            }
            req.session.userID = result[0].id;
            req.session.name = result[0].name;
            req.session.email = result[0].email;
            req.session.pp = result[0].profile_pic;
            req.session.role = result[0].type_id;
            let nextPage = '';
            if (req.session.role == 1) {
              nextPage = '/StudentHome';
            } else if (req.session.role == 2) {
              nextPage = '/LecturerDashboard';
            } else if (req.session.role == 3) {
              nextPage = '/StaffDashboard';
            }
            return res.status(200).send(nextPage);
          } else {
            console.log("Wrong password");
            return res.status(400).send("Wrong password");
          }
        }
      })
    }
  })
}

// --------------------------------------------------Exports----------------------------------------------------------------------------
module.exports = {
  isValidEmail,
  Register,
  Login
}