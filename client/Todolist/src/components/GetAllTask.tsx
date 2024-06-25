import React, { useEffect, useState } from 'react'
import { State, Task, Tasks } from '../interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, filterTasksCompleted, filterTasksUnComplete, getTasks, resetTask, setTask } from '../store/reducers/TasksReducer';
import ModalWarn from './ModalWarn';
import { activeModalDelete, activeModalInput, activeModalWarn } from '../store/reducers/ModalReducer';
import ModalDelete from './ModalDelete';
import { store } from '../store/store';
import { updateTask } from '../store/reducers/TasksReducer';
import ModalInput from './ModalInput';
export default function GetAllTask() {
    //Initiliazation
    const tasks:Tasks=useSelector((state:State)=>state.tasks);
    const [taskDetail,setTaskdetail]=useState<string>('');
    const modal=useSelector((state:State)=>state.modal)
    const [typeSubmit,setTypeSubmit]=useState<string>('add');
    //function loadData
    const loadData=()=>{
        store.dispatch(getTasks())
    }
    //get data from API
    useEffect(()=>{
      loadData()},[])
    //function handleChange
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        let value=e.target.value.trim();
        setTaskdetail(value);
    }
    //add Task
    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        if(!taskDetail){
            store.dispatch(activeModalWarn());
            return;
        }
        if(tasks.listTask.find(btn=>btn.detail===taskDetail)){
            store.dispatch(activeModalInput())
            return;           
        }
        if(typeSubmit==='add'){
            let newTask={
                id:Math.floor(Math.random()*1000000000)+new Date().getMilliseconds(),
                detail:taskDetail,
                status:true,
            }
            store.dispatch(addTask(newTask));
        }else{
            store.dispatch(updateTask({...tasks.task,detail:taskDetail}));
            setTypeSubmit("add");
            store.dispatch(resetTask());
        }
        setTaskdetail('');
    }
    //delete Task
    const handleDelete=(idTask:number)=>{
        store.dispatch(activeModalDelete());
        store.dispatch(setTask({...tasks.task,id:idTask}));
    }
    //updateTask
    const updateTaskById=(idTask:number)=>{
        store.dispatch(setTask({...tasks.task,id:idTask}));
        setTypeSubmit('update');
        let taskUpdate=tasks.listTask.find(btn=>btn.id===idTask);
        if(taskUpdate){
            setTaskdetail(taskUpdate.detail);
        }
    }
    //change Checked
    const handleChecked=(idTask:number)=>{
        let taskChangeStatus=tasks.listTask.find(btn=>btn.id===idTask)
        store.dispatch(updateTask({...taskChangeStatus,status:!taskChangeStatus?.status}))
    }
    //filter
    const getAllTask=()=>{
        store.dispatch(getTasks());
    }
    const getTasksCompleted=()=>{
        store.dispatch(getTasks());
        store.dispatch(filterTasksCompleted());
    }
    const getTasksUnComplete=()=>{
        store.dispatch(getTasks());
        store.dispatch(filterTasksUnComplete());
    }
  return (
      <>
  <section className="vh-100 gradient-custom">
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">
          <div className="card">
            <div className="card-body p-5">
              <form className="d-flex justify-content-center align-items-center mb-4">
                <div className="form-outline flex-fill">
                  <input onChange={handleChange} type="text" id="form2" className="form-control" value={taskDetail}/>
                  <label className="form-label" htmlFor="form2">
                    Nhập tên công việc
                  </label>
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-info ms-2">
                  {typeSubmit==='add'?'Thêm':'Cập nhập'}
                </button>
              </form>
              {/* Tabs navs */}
              <ul className="nav nav-tabs mb-4 pb-2">
                <li className="nav-item" role="presentation">
                  <a onClick={getAllTask} className="nav-link active">Tất cả</a>
                </li>
                <li className="nav-item" role="presentation">
                  <a onClick={getTasksCompleted} className="nav-link">Đã hoàn thành</a>
                </li>
                <li className="nav-item" role="presentation">
                  <a onClick={getTasksUnComplete} className="nav-link">Chưa hoàn thành</a>
                </li>
              </ul>
              {/* Tabs navs */}
              {/* Tabs content */}
              <div className="tab-content" id="ex1-content">
                <div className="tab-pane fade show active">
                  <ul className="list-group mb-0">
                     {tasks.listTask.map(btn=>(
                        <li key={btn.id}
                        className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
                        style={{ backgroundColor: "#f4f6f7" }}
                      >
                        <div>
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            checked={!btn.status}
                            onChange={()=>handleChecked(btn.id)}
                          />
                          {!btn.status?<s>{btn.detail}</s>:<span>{btn.detail}</span>}
                        </div>
                        <div className="d-flex gap-3">
                          <i onClick={()=>updateTaskById(btn.id)} className="fas fa-pen-to-square text-warning" />
                          <i onClick={()=>handleDelete(btn.id)} className="far fa-trash-can text-danger" />
                        </div>
                      </li> 
                    ))} 
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Modal xác nhận xóa */}
{modal.delete&&<ModalDelete/>}
  {/* Modal cảnh báo lỗi */}
  {modal.warn&&<ModalWarn/>}
    {/* Modal cảnh báo trùng công việc */}
    {modal.input&&<ModalInput/>}
</>
  )
}
