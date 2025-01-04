import { useEffect, useState } from "react"
import { Activity } from "../../models/activity"
import axios from "axios";
import { Container} from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";


function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>(' http://localhost:5161/api/activities')
      .then(response => {
        console.log(response);
        setActivities(response.data)
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
    activity.id 
      ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
      : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id : string){
    setActivities([...activities.filter(x => x.id !== id)])
  }

  function handleFormClose(){
    setEditMode(false);
  }

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
        />
      </Container>
     
    </>
  )
}

export default App
