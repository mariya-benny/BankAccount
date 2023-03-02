const Account = require('../models/account');

// Function to open a new account
exports.openAccount = (req, res) => {
  const {
    name,
    gender,
    dob,
    email,
    mobile,
    address,
    initialBalance,
    adharNo,
    panNo
  } = req.body;

  const account = new Account({
    name,
    gender,
    dob,
    email,
    mobile,
    address,
    initialBalance,
    adharNo,
    panNo
  });

  account.save((err, account) => {
    if (err) {
      return res.status(400).json({
        error: "Error creating account"
      });
    }
    res.json(account);
  });
};

// Function to update KYC details
exports.updateKYC = (req, res) => {
  const {
    name,
    dob,
    email,
    mobile,
    adharNo,
    panNo
  } = req.body;

  Account.findByIdAndUpdate(req.params.id, {
    name,
    dob,
    email,
    mobile,
    adharNo,
    panNo
  }, {
    new: true
  }, (err, account) => {
    if (err || !account) {
      return res.status(400).json({
        error: "Account not found"
      });
    }
    res.json(account);
  });
};

// Function to deposit money
exports.depositMoney = (req, res) => {
  const {
    amount
  } = req.body;

  Account.findByIdAndUpdate(req.params.id, {
    $inc: {
      balance: amount
    },
    $push: {
      ledger: {
        type: "credit",
        amount: amount,
        date: new Date()
      }
    }
  }, {
    new: true
  }, (err, account) => {
    if (err || !account) {
      return res.status(400).json({
        error: "Account not found"
      });
    }
    res.json(account);
  });
};

// Function to withdraw money
exports.withdrawMoney = (req, res) => {
  const {
    amount
  } = req.body;

  Account.findByIdAndUpdate(req.params.id, {
    $inc: {
      balance: -amount
    },
    $push: {
      ledger: {
        type: "debit",
        amount: amount,
        date: new Date()
      }
    }
  }, {
    new: true
  }, (err, account) => {
    if (err || !account) {
      return res.status(400).json({
        error: "Account not found"
      });
    }

    if (account.balance < 0) {
      return res.status(400).json({
        error: "Insufficient balance"
      });
    }

    res.json(account);
  });
};

// Function to transfer money
exports.transferMoney = (req, res) => {
  const {
    toName,
    amount
  } = req.body;

  // Find account to transfer money to
  Account.findOne({
    name: toName
  }, (err, toAccount) => {
    if (err || !toAccount) {
      return res.status(400).json({
        error: "Account not found"
      });
    }

   
