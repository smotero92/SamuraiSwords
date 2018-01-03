function dice(sides = 6) {
    return Math.ceil(Math.random() * sides);
};

module.exports = dice;
