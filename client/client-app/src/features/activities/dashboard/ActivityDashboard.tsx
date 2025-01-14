import React from "react";
import { Activity } from "../../../models/activity";
import { Grid, GridColumn } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";


interface Props{
    activities : Activity[];
    selectedActivity : Activity | undefined;
    selectActivity: (id : string) => void;
    cancelSelectedActivity: () => void;
    editMode: boolean;
    openForm :(id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity : Activity) => void;
    deleteActivity: (id : string) => void;
    submitting : boolean;
    deleting : boolean;
}

export default function ActivityDashboard(
    {
        activities, 
        selectedActivity, 
        selectActivity, 
        cancelSelectedActivity,
        editMode,
        openForm,
        closeForm,
        createOrEdit,
        deleteActivity,
        submitting,
        deleting
    } : Props){
    return (
        <>
            <Grid>
                <GridColumn width='10'>
                    <ActivityList 
                        activities={activities} 
                        selectActivity = {selectActivity} 
                        deleteActivity = {deleteActivity}
                        deleting = {deleting}
                    />
                </GridColumn>
                <GridColumn width='6'>
                    {selectedActivity && 
                    <ActivityDetails 
                        activity={selectedActivity} 
                        cancelSelectedActivity = {cancelSelectedActivity}
                        openForm = {openForm}
                    />}
                    {editMode && <ActivityForm  submitting = {submitting} closeForm = {closeForm} activity={selectedActivity} createOrEdit={createOrEdit}/>}
                </GridColumn>
            </Grid>
        </>
        
    )
}