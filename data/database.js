const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb'); 

let database;

const initDb = async (callback) => {
    if (database) {
        console.log('✅ Db is already initialized!');
        return callback(null, database);
    }

    if (!process.env.MONGODB_URL) {
        console.error("❌ ERROR: MONGODB_URL no está definida en .env");
        process.exit(1);
    }

    try {
        const client = await MongoClient.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        database = client.db("ContactsDB"); 
        console.log('✅ MongoDB Connected Successfully');
        callback(null, database);
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err);
        callback(err);
    }
};

const getDatabase = () => {
    if (!database) {
        throw new Error('❌ Database not initialized');
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
};
