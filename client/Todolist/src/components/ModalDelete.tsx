import React from 'react'
import { store } from '../store/store'
import { disableModalDelete } from '../store/reducers/ModalReducer'
import { resetTask } from '../store/reducers/TasksReducer';
import { useDispatch, useSelector } from 'react-redux';
import { State, Task } from '../interfaces';
import { deleteTask } from '../store/reducers/TasksReducer';
export default function ModalDelete() {
    const task:Task=useSelector((state:State)=>state.tasks.task)
    const dispatch=useDispatch();
    const closeModal=()=>{
        store.dispatch(disableModalDelete());
        store.dispatch(resetTask());
    }
    const okdeleteTask=()=>{
        dispatch(deleteTask(task.id));
       closeModal();
    }
  return (
    <div className="overlay">
    <div className="modal-custom">
      <div className="modal-header-custom">
        <h5>Xác nhận</h5>
        <i onClick={closeModal} className="fas fa-xmark" />
      </div>
      <div className="modal-body-custom">
        <p>Bạn chắc chắn muốn xóa công việc?</p>
      </div>
      <div className="modal-footer-footer">
        <button onClick={closeModal} className="btn btn-light">Hủy</button>
        <button onClick={okdeleteTask} className="btn btn-danger">Xóa</button>
      </div>
    </div>
  </div>
  )
}
