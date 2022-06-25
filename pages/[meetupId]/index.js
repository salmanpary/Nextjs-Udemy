import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient,ObjectId} from 'mongodb'
function HomePage(props) {
  return (
    <>
      <MeetupDetail
        image={props.meetupdata.image}
        title={props.meetupdata.title}
        address={props.meetupdata.address}
        description={props.meetupdata.description}
      />
    </>
  );
}
export async function  getStaticPaths(){
    const client=await MongoClient.connect('mongodb+srv://salmanpary:salmandb@cluster0.ob2xn2v.mongodb.net/?retryWrites=true&w=majority')
        const db=client.db()
        const meetupscollection=db.collection('meetups')
         const meetups=await  meetupscollection.find({},{_id:1}).toArray()
            client.close()
    return {
        paths:meetups.map(meetup=>({
            params:{
               meetupId:meetup._id.toString()
            }
        })),
        fallback:false
    }
}
export async function getStaticProps(context) {
    const meetupid = context.params.meetupId;
    console.log(meetupid)
    const client=await MongoClient.connect('mongodb+srv://salmanpary:salmandb@cluster0.ob2xn2v.mongodb.net/?retryWrites=true&w=majority')
        const db=client.db()
        const meetupscollection=db.collection('meetups')
        const selectedmeetup=await meetupscollection.findOne({_id:ObjectId(meetupid)})
     
  return {
    props: {
        meetupdata: {
            id:selectedmeetup._id.toString(),
            title:selectedmeetup.title,
            image:selectedmeetup.image,
            address:selectedmeetup.address,
            description:selectedmeetup.description
            
        },
    },
  };
}
export default HomePage;
