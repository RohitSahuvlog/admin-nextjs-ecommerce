
import Cors from 'cors';

export const cors = Cors({
    methods: ['POST', 'GET', 'HEAD', 'OPTIONS'], // Allowed methods
    origin: '*', // Allow all origins (change it to your specific origin in production)
});

export function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}
