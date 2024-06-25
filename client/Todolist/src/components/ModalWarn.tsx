import React from 'react'
import { useDispatch } from 'react-redux'
import { disableModalWarn } from '../store/reducers/ModalReducer';

export default function ModalWarn() {
    const dispatch=useDispatch();
    const closeModal=()=>{
        dispatch(disableModalWarn());
    }
  return (
        <div className="overlay">
           <div className="modal-custom">
                <div className="modal-header-custom">
                    <h5>Cảnh báo</h5>
                    <i onClick={closeModal} className="fas fa-xmark" />
                </div>
                <div className="modal-body-custom">
                    <p>Tên công việc không được phép để trống.</p>
                </div>
                <div className="modal-footer-footer">
                     <button onClick={closeModal} className="btn btn-light">Đóng</button>
                </div>
            </div>
        </div>
  )
}
