using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DatabaseContext context;

            public Handler(DatabaseContext context)
            {
                this.context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(request.Activity.Id);

                context.Activities.Remove(activity);

                await context.SaveChangesAsync();
            }
        }
    }
}
