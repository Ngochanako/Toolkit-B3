import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Task, Tasks } from "../../interfaces"; // Import Task và Tasks interface

const initialTasks :Tasks= {
    listTask: [],
    task: {
        id: 0,
        detail: '',
        status: true,
    }
};

// Tạo một async thunk để lấy danh sách các task từ API
export const getTasks:any = createAsyncThunk<Task[], void>(
    "tasks/getAllTask",
    async () => {
        const response = await axios.get("http://localhost:3000/tasks");
        return response.data;
    }
);
export const addTask:any = createAsyncThunk<Task, Task>(
    "tasks/addTask",
    async (task) => {
        const response = await axios.post("http://localhost:3000/tasks", task);
        return response.data;
    }
);
export const deleteTask:any=createAsyncThunk(
    "tasks/deleteTask",
    async(id:number)=>{
        await axios.delete(`http://localhost:3000/tasks/${id}`);
        return id;
    }
)
export const updateTask:any=createAsyncThunk(
    "tasks/updateTask",
    async(task:Task)=>{        
       const response= await axios.put(`http://localhost:3000/tasks/${task.id}`,task);
        return response.data;        
    }
)
export const filterTasksCompleted:any=createAsyncThunk(
    "tasks/filterTaskComplete",
    async()=>{
        const response=await axios.get('http://localhost:3000/tasks?status=false');
        return response.data;
    }
)
export const filterTasksUnComplete:any=createAsyncThunk(
    "tasks/filterTaskComplete",
    async()=>{
        const response=await axios.get('http://localhost:3000/tasks?status=true');
        return response.data;
    }
)
// Tạo slice cho task với tên, trạng thái ban đầu, và các reducers
const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialTasks,
    reducers: {
        setTask: (state, action: PayloadAction<Task>) => {
            state.task = action.payload;
        },
        resetTask:(state)=>{
            state.task=initialTasks.task;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.listTask = action.payload;
            })
            .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.listTask.push(action.payload);
            })
            .addCase(deleteTask.fulfilled,(state,action)=>{
                state.listTask=state.listTask.filter(btn=>btn.id!==action.payload);
            })
            .addCase(updateTask.fulfilled,(state,action)=>{
                state.listTask=state.listTask.map(btn=>btn.id===action.payload.id?action.payload:btn);
            })
            .addCase(filterTasksCompleted.fulfilled,(state,action)=>{
                state.listTask=action.payload;
            })
    }
});
export const { setTask,resetTask } = tasksSlice.actions;
export default tasksSlice.reducer;
