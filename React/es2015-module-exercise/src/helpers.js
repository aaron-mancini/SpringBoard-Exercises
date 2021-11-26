function choice(items) {
    let rand = Math.floor(Math.random() * items.length)
    return items[rand];
}

function remove(items, item) {
    let index = items.indexOf(item);
    if (index >= 0) {
        return items.splice( index, 1);
    }
    return undefined;
}

export { choice, remove };