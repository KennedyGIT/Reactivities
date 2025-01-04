import React from 'react'
import { Button, ButtonGroup, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from 'semantic-ui-react'
import { Activity } from '../../../models/activity'


interface Props{
    activity : Activity;
    cancelSelectedActivity: () => void;
    openForm: (id: string) => void;
}


export default function ActivityDetails({activity, cancelSelectedActivity, openForm} : Props){
    return (
    <Card fluid>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
        <CardContent>
        <CardHeader>{activity.title}</CardHeader>
        <CardMeta>
            <span className='date'>{activity.date}</span>
        </CardMeta>
        <CardDescription>
           {activity.description}
        </CardDescription>
        </CardContent>
        <CardContent extra>
            <ButtonGroup widths={2}>
                <Button onClick={() => openForm(activity.id)}basic color='blue' content='edit'/>
                <Button onClick={cancelSelectedActivity}basic color='grey' content='cancel'/>
            </ButtonGroup>
        </CardContent>
    </Card>
    )
}