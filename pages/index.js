import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from 'next/head'
const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "Meetup 1",
    image:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    address: "123 Main St, New York, NY 10001",
    description: "This is a dummy description",
  },
];
function HomePage(props) {
  return<>
    <Head>
        <title>React Meetups</title>
        <meta 
        name='hahaa'
        content="sadjflkasjdflkajk hjhdjkhsdjfhd"
        />
    </Head>
  <MeetupList meetups={props.meetups} />;

  </>
}
// export async function getStaticProps() {
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//     revalidate:10
//   };
// }
export async function getServerSideProps(context){
    const client=await MongoClient.connect('mongodb+srv://salmanpary:salmandb@cluster0.ob2xn2v.mongodb.net/?retryWrites=true&w=majority')
        const db=client.db()
        const meetupscollection=db.collection('meetups')
       const meetups=await  meetupscollection.find().toArray()
         client.close()
    return {
        props:{
            meetups:meetups.map((meetup)=>({
                title:meetup.title,
                image:meetup.image,
                address:meetup.address,
                description:meetup.description,
                id:meetup._id.toString()
            }))
        }
    }
}
export default HomePage;
