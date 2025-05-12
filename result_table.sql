create table if not exists result (
                                      id serial primary key,
                                      x numeric not null,
                                      y numeric not null,
                                      r numeric not null,
                                      status boolean not null,
                                      request_time timestamp with time zone default CURRENT_TIMESTAMP
);
create table if not exists points (
                                      id serial primary key,
                                      x numeric not null,
                                      y numeric not null,
                                      r numeric not null,
                                      status boolean not null,
                                      request_time timestamp with time zone default CURRENT_TIMESTAMP
);