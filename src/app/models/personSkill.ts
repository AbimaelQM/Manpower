import { Area } from "./area";
import { Person } from "./person";
import { Skill } from "./skill";
import { SkillLevel } from "./skillLevel";

export interface PersonSkill{
    id: number,
    person:Person,
    area:Area,
    skill:Skill,
    skillLevel:SkillLevel
}