import { Address } from "./address"
import { Area } from "./area"
import { Modality } from "./modality"
import { Person } from "./person"
import { Skill } from "./skill"
import { SkillLevel } from "./skillLevel"
import { SubTeam } from "./subteam"
import { Teams } from "./team"
import { Type } from "./type"

export interface Job {
    id:number,
    type:Type,
    modality:Modality,
    active:boolean,
    skillLevel:SkillLevel,
    area: Area,
    skill:Skill,
    address:Address,
    team:Teams,
    subTeam: SubTeam,
    description:string,
    person:Person | null;
}
