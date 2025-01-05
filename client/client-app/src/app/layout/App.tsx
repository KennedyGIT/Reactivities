import { useEffect, useState } from "react"
import { Activity } from "../../models/activity"
import { Container} from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import client from "../service/client";
import LoadingComponent from "./LoadingComponent";
import {v4 as uuid } from 'uuid';


function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    client.Activities.list()
      .then(response => {
        const activities: Activity[] = [];
        response.forEach(activity => {
          activity.date = activity.date.split('T')[0];
          activities.push(activity);
        }) 
        setActivities(activities);
        setLoading(false);
      })
  }, [])

  function handleSelectedActivity(id : string){
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCanceledSelectedActivity(){
    setSelectedActivity(undefined);
  }


  //This method handle the rendering of the Activity form for Editing and Activity Creation
  //It checks if an Id Exists to know if it will set the activity to undefined or set it to the model of the selected activity
  function handleFormOpen(id?: string){
    id ? handleSelectedActivity(id) : handleCanceledSelectedActivity();
    setEditMode(true);
  }

  function handleCreateOrEditActivity(activity: Activity){

    setSubmitting(true);
    if(activity.id){
      client.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      })
    }
    else{
      activity.id = uuid();
      client.Activities.create(activity).then(() => {
          setActivities([...activities, activity])
          setEditMode(false);
          setSelectedActivity(activity);
          setSubmitting(false);
      })
    }    
  }

  function handleDeleteActivity(id : string){
    setActivities([...activities.filter(x => x.id !== id)])
  }

  function handleFormClose(){
    setEditMode(false);
  }

  if(loading) return <LoadingComponent content="Please wait..."/>

  return (
    <>
      <NavBar openForm = {handleFormOpen}/>

      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity = {handleSelectedActivity}
          cancelSelectedActivity = {handleCanceledSelectedActivity}
          editMode={editMode}
          openForm = {handleFormOpen}
          closeForm = {handleFormClose}
          deleteActivity = {handleDeleteActivity}
          createOrEdit = {handleCreateOrEditActivity}
          submitting = {submitting}
        />
      </Container>
     
    </>
  )
}

export default App
