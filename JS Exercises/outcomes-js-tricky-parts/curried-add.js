function curriedAdd(total) {
    if (total === undefined) return 0;
    return function add(num){
        if(num){
            total += num;
            return add;
        } else {
            return total;
        }
    }
}

module.exports = { curriedAdd };
