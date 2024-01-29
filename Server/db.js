const { MongoClient } =require('mongodb');
let dbConnection

module.exports={
    connectToDB: (cb) => {
        MongoClient.connect("mongodb+srv://satya:Satya12345@cluster0.8thgg4a.mongodb.net/?retryWrites=true&w=majority")
        .then((client) =>{
            dbConnection = client.db('ExpenseTracker')
            return cb()
        
        })
        .catch(err =>{
            return cb(err)
        })
    },
    getDb:function(){
        return dbConnection
    }
}