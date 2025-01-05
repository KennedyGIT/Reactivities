using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Activity>>> GetActivities() 
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid Id)
        {
            return await Mediator.Send(new Details.Query() { Id = Id });
        }



        [HttpPost]
        public async Task<ActionResult> CreateActivity(Activity activity) 
        {

            await Mediator.Send(new Create.Command() { Activity = activity });

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditActivity(Guid Id, Activity activity)
        {
            activity.Id = Id;

            await Mediator.Send(new Edit.Command() { Activity = activity });

            return Ok();
        }



        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(Guid Id)
        {

            await Mediator.Send(new Delete.Command() { Id = Id });

            return Ok();
        }
    }
}
