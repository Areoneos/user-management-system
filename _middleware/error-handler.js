module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    switch  (true) {
        case typeof err === 'string':
            //custom application error
            const is404 = err.toLowerCase().endsWith('Not Found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ message: err });
        case err.name === 'Unauthorized error':
            // jwt authentication error
            return res.status(401).json({ message: 'Unauthorized' });
        default:
            return res.status(500).json({ message: err.message });
    }
}