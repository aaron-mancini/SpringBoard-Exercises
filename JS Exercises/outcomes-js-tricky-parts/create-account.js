function createAccount(pin, amount = 0) {
    return {
        checkBalance(pinCheck) {
            if (pin !== pinCheck) return "Invalid PIN.";
            return `$${amount}`;
        },
        deposit(pinCheck, newAmount) {
            if(pin === pinCheck) {
                amount += newAmount;
                return `Succesfully deposited $${newAmount}. Current balance: $${amount}.`;
            } else {
                return "Invalid PIN.";
            }
        },
        withdraw(pinCheck, newAmount) {
            if(pin === pinCheck) {
                if (amount > newAmount) {
                    amount -= newAmount;
                    return `Succesfully withdrew $${newAmount}. Current balance: $${amount}.`;
                } else {
                    return "Withdrawal amount exceeds account balance. Transaction cancelled.";
                }
            } else {
                return "Invalid PIN.";
            }
        },
        changePin(oldPin, newPin) {
            if (oldPin === pin) {
                pin = newPin;
                return "PIN successfully changed!"
            } else {
                return "Invalid PIN."
            }
        }
    }




}

module.exports = { createAccount };
