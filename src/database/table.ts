import connection from "./connection";

export const createItemsTable = async (): Promise<void> => {
    const query = `
        CREATE TABLE IF NOT EXISTS items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            item VARCHAR(255) NOT NULL
        );
    `;

    try {
        await new Promise<void>((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) {
                    reject(new Error('Error creating items table: ' + err.message));
                } else {
                    console.log('Items table created or already exists');
                    resolve();
                }
            });
        });
    } catch (error) {
        console.error('Error creating items table:', error);
    }
};

export const createCombinationsTable = async (): Promise<void> => {
    const query = `
        CREATE TABLE IF NOT EXISTS combinations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            combination JSON NOT NULL
        );
    `;

    try {
        await new Promise<void>((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) {
                    reject(new Error('Error creating combinations table: ' + err.message));
                } else {
                    console.log('Combinations table created or already exists');
                    resolve();
                }
            });
        });
    } catch (error) {
        console.error('Error creating combinations table:', error);
    }
};

export const createResponsesTable = async (): Promise<void> => {
    const query = `
        CREATE TABLE IF NOT EXISTS responses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            response JSON NOT NULL
        );
    `;

    try {
        await new Promise<void>((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) {
                    reject(new Error('Error creating responses table: ' + err.message));
                } else {
                    console.log('Responses table created or already exists');
                    resolve();
                }
            });
        });
    } catch (error) {
        console.error('Error creating responses table:', error);
    }
};


export const createNecessaryTable = async (): Promise<void> => {
    await createItemsTable();
    await createCombinationsTable();
    await createResponsesTable();
};