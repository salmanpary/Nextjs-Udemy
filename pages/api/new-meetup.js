import {MongoClient} from 'mongodb'
import router from 'next/router'
async function handler(req,res){
    if(req.method==='POST'){
        const data=req.body 
        const {title,image,address,description}=data
        const client=await MongoClient.connect('mongodb+srv://salmanpary:salmandb@cluster0.ob2xn2v.mongodb.net/?retryWrites=true&w=majority')
        const db=client.db()
        const meetupscollection=db.collection('meetups')
const result=await meetupscollection.insertOne(data)
console.log(result)
client.close()
res.status(201).json({message:'Meetup added successfully'})
    }
}
export default handler