﻿using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DatabaseContext context;
            private readonly IMapper mapper;

            public Handler(DatabaseContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(request.Activity.Id);

                mapper.Map(request.Activity, activity);

                await context.SaveChangesAsync();
            }
        }
    }
}
