import connection from '../database/connection';
import {ResponseData} from "../types/responseType";

const insertItem = (item: string): Promise<void> => {
    const query = 'INSERT INTO items (item) VALUES (?)';
    return new Promise((resolve, reject) => {
        connection.query(query, [item], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};

const insertCombinations = (combinations: string[][]): Promise<void> => {
    const query = 'INSERT INTO combinations (combination) VALUES ?';
    const values = combinations.map(comb => [JSON.stringify(comb)]);
    return new Promise((resolve, reject) => {
        connection.query(query, [values], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};

const insertResponse = (response : ResponseData): Promise<void> => {
    const query = 'INSERT INTO responses (response) VALUES (?)';
    return new Promise((resolve, reject) => {
        connection.query(query, [JSON.stringify(response)], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};


export const getResponses = () => {
    const query = "SELECT * FROM responses";
    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

export const insertDataWithTransaction = async (items: string[], combinations: string[][]): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        connection.beginTransaction(async (err) => {
            if (err) return reject(err);

            try {
                await Promise.all(items.map(item => insertItem(item)));

                await insertCombinations(combinations);

                const response: ResponseData = {
                    items,
                    combinations,
                    totalCombinations: combinations.length,
                    createdAt: new Date(),
                };

                await insertResponse(response);

                connection.commit((commitErr) => {
                    if (commitErr) {
                        return connection.rollback(() => reject(commitErr));
                    }
                    resolve(response);
                });

            } catch (error) {
                connection.rollback(() => reject(error));
            }
        });
    });
};
