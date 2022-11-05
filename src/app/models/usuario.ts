import { role } from "./roleEnum";
import { Teams } from "./team";

export interface Usuario {

    id: number,
    name: string,
    email: string,
    password: string,
    active: boolean,
    role: role,
    teams: Array<Teams>
}
