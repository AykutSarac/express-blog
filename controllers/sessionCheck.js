module.exports = (req, res) => {
    if (!req.user) {
        return false;
    } else {
        return true;
    }
}