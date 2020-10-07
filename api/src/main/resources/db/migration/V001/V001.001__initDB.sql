create table players
(
    id serial not null,
    ami_code varchar(14) not null,
    nick_name varchar(32) not null
);

create unique index players_ami_code_uindex
    on players (ami_code);

create unique index players_id_uindex
    on players (id);

alter table players
    add constraint players_pk
        primary key (id);
