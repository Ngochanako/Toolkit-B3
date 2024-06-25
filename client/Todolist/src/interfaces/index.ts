export interface Task{
    id:number,
    detail:string,
    status:boolean,
}
export interface Tasks{
    listTask:Task[],
    task:Task,
}
export type Modal={
    warn:boolean,
    delete:boolean,
    input:boolean,
}
export interface State{
    tasks:Tasks;
    modal:Modal,
}