import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
function NewMeetupPage(){
   async function addmeetuphadler(enteredmeetupdata){
        const response=await fetch('/api/new-meetup',{
            method:'POST',
            body:JSON.stringify(enteredmeetupdata),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data=await response.json()
        console.log(data)
        router.push('/')
    }
    return <NewMeetupForm onAddMeetup={addmeetuphadler}/>

}
export default NewMeetupPage