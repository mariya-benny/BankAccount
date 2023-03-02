// BankAccount.js
class BankAccount {
    constructor(name, gender, dob, email, mobile, address, initialBalance, adharNo, panNo) {
      this.name = name;
      this.gender = gender;
      this.dob = dob;
      this.email = email;
      this.mobile = mobile;
      this.address = address;
      this.balance = initialBalance;
      this.adharNo = adharNo;
      this.panNo = panNo;
      this.ledger = [];
    }
  
    updateKYC(name, dob, email, mobile, adharNo, panNo) {
      this.name = name;
      this.dob = dob;
      this.email = email;
      this.mobile = mobile;
      this.adharNo = adharNo;
      this.panNo = panNo;
    }
  
    depositMoney(amount) {
      this.balance += amount;
      this.ledger.push({
        type: "Deposit",
        amount: amount,
        balance: this.balance
      });
    }
  
    withdrawMoney(amount) {
      if (this.balance >= amount) {
        this.balance -= amount;
        this.ledger.push({
          type: "Withdrawal",
          amount: amount,
          balance: this.balance
        });
      } else {
        console.log("Insufficient balance");
      }
    }
  
    transferMoney(toAccount, amount) {
      if (this.balance >= amount) {
        this.balance -= amount;
        toAccount.depositMoney(amount);
        this.ledger.push({
          type: "Transfer",
          to: toAccount.name,
          amount: amount,
          balance: this.balance
        });
      } else {
        console.log("Insufficient balance");
      }
    }
  
    receiveMoney(fromAccount, amount) {
      fromAccount.transferMoney(this, amount);
    }
  }
  
  module.exports = BankAccount;
  