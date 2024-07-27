const schedule = require('node-schedule');
const con = require('../config/db');
const transaction = require('../lib/transaction');

// Schedule a job to run every day at a specific time to check for timeout
const timeoutJob = schedule.scheduleJob('0 18 * * *', async () => {
    try {
      // Run your query to update the status from approved to timeout after one day
      con.query('UPDATE asset_transaction SET status = ? WHERE status = ? AND validated_date < CURDATE();', ['timeout', 'approved'], (err, result) => {
        if (err) {
          console.error('Server error:', err);
        } else {
          console.log('Schedule executed successfully');
        }
      });
    } catch (error) {
      console.error('Error checking for timeout:', error);
    }
  });

  const overdueJob = schedule.scheduleJob('0 0 * * *', async () => {
    try {
      // Run your query to update the status from approved to timeout after one day
      con.query('UPDATE asset_transaction SET status = ? WHERE status = ? AND expected_return_date < CURDATE();', ['overdue', 'holding'], (err, result) => {
        if (err) {
          console.error('Server error:', err);
        } else {
          console.log('Schedule executed successfully');
        }
      });
    } catch (error) {
      console.error('Error checking for timeout:', error);
    }
  });
  const verification = schedule.scheduleJob('0 0 * * *', async () => {
    try {
      // Run your query to update the status from approved to timeout after one day
      con.query('DELETE FROM userrs WHERE isVerified = ?;', [0], (err, result) => {
        if (err) {
          console.error('Server error:', err);
        } else {
          console.log('Schedule executed successfully');
        }
      });
    } catch (error) {
      console.error('Error checking for timeout:', error);
    }
  });