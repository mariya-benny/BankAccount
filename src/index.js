const express = require('express');
const bodyParser = require('body-parser');
const Account = require('./models/Account');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes

// Open account
app.post('/account', (req, res) => {
  const { name, gender, dob, email, mobile, address, initialBalance, adharNo, panNo } = req.body;
  const account = new Account(name, gender, dob, email, mobile, address, initialBalance, adharNo, panNo);
  res.json({ message: 'Account opened successfully!', account });
});

// Update KYC
app.put('/account/:id/kyc', (req, res) => {
  const { id } = req.params;
  const { name, dob, email, mobile, adharNo, panNo } = req.body;
  const account = Account.findById(id);
  if (!account) return res.status(404).json({ message: 'Account not found' });
  account.updateKYC(name, dob, email, mobile, adharNo, panNo);
  res.json({ message: 'KYC details updated successfully!', account });
});

// Deposit money
app.post('/account/:id/deposit', (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  const account = Account.findById(id);
  if (!account) return res.status(404).json({ message: 'Account not found' });
  account.depositMoney(amount);
  res.json({ message: 'Money deposited successfully!', account });
});

// Withdraw money
app.post('/account/:id/withdraw', (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  const account = Account.findById(id);
  if (!account) return res.status(404).json({ message: 'Account not found' });
  const result = account.withdrawMoney(amount);
  if (result === 'insufficient balance') return res.status(400).json({ message: 'Insufficient balance' });
  res.json({ message: 'Money withdrawn successfully!', account });
});

// Transfer money
app.post('/account/:id/transfer', (req, res) => {
  const { id } = req.params;
  const { toName, amount } = req.body;
  const account = Account.findById(id);
  if (!account) return res.status(404).json({ message: 'Account not found' });
  const result = account.transferMoney(toName, amount);
  if (result === 'insufficient balance') return res.status(400).json({ message: 'Insufficient balance' });
  if (result === 'account not found') return res.status(404).json({ message: 'Account not found' });
  res.json({ message: 'Money transferred successfully!', account });
});

// Receive money
app.post('/account/:id/receive', (req, res) => {
  const { id } = req.params;
  const { fromName, amount } = req.body;
  const account = Account.findById(id);
  if (!account) return res.status(404).json({ message: 'Account not found' });
  const result = account.receiveMoney(fromName, amount);
  if (result === 'account not found') return res.status(404).json({ message: 'Account not found' });
  res.json({ message: 'Money received successfully!', account });
});

app.listen(port, () => {
  console.log(`App`)})

