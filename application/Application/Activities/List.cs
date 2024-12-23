
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities 
{
    public class List 
    {
        // Declaring an inner class "Query" that implements IRequest<List<Activity>>.
        // This represents a query to retrieve a list of activities.
        public class Query : IRequest<List<Activity>> { }

        // Declaring an inner class "Handler" that implements IRequestHandler<Query, List<Activity>>.
        // This handles the logic for the "Query" to retrieve activities.
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            // Declaring a private readonly field to hold the database context instance.
            private readonly DatabaseContext context;

            // Constructor that accepts a DatabaseContext instance and assigns it to the field.
            // This ensures the handler has access to the database.
            public Handler(DatabaseContext context)
            {
                this.context = context; // Assigning the injected DatabaseContext to the private field.
            }

            // Implementing the Handle method to process the Query and return a list of activities.
            // This is executed when the query is dispatched.
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                // Accessing the "Activities" DbSet from the database context and converting it to a list asynchronously.
                return await this.context.Activities.ToListAsync();
            }
        }
    }
}
