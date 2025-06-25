import React, { useState,useEffect } from "react";
import { Link,useLocation } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
export default function Dashboard() {


  const [name, setName] = useState('');
 const [tasks, setTasks] = useState([]);
 const [editTaskId, setEditTaskId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    StartDateTime: "",
    EndDateTime: "",
    isBilled: false,
    isStatus: false,
    Price:0
  });

  const [filters, setFilters] = useState({
  startDate: "",
  endDate: "",
  status: "",
  billed: ""
});

  useEffect(() => {
    const storedData = localStorage.getItem('UserProfile');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setName(parsedData.displayName);
    }
  }, []);

const handleFilterChange = (e) => {
  const { name, value } = e.target;
  setFilters((prev) => ({ ...prev, [name]: value }));
};

  useEffect(() => {
    const fetchFilteredTasks = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (filters.status) queryParams.append("status", filters.status);
        if (filters.billed) queryParams.append("billed", filters.billed);

        const response = await axios.get(`http://localhost:5000/api/filtertask?${queryParams.toString()}`);
        setTasks(response.data);
      } catch (error) {
        toast.error("Failed to fetch filtered tasks", { position: "top-center" });
      }
    };

    fetchFilteredTasks();
  }, [filters]);

const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/gettask");
      setTasks(response.data);
    } catch (error) {
      toast.error("Failed to fetch tasks", { position: "top-center" });
    }
  };

 useEffect(() => {
  fetchTasks();
}, []);
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? e.target.checked : value
    });
  };


  const handlePayWithCard = async (taskId) => {
     try {
      const response = await axios.post('http://localhost:5000/api/payment',{
        taskId:taskId
      });
      if (response.status === 200) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  const handleSubmitTask = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/createtask',{
     title:formData.title,
     description:formData.description,
     StartDateTime:formData.StartDateTime,
     EndDateTime:formData.EndDateTime,
     isBilled:formData.isBilled,
     isStatus:formData.isStatus,
     Price:formData.Price
    })
    console.log(response);
    if(response.status===201){
       toast.success("Task Create successful!", { position: "top-center" });
        setFormData({
        title: "",
        description: "",
        StartDateTime: "",
        EndDateTime: "",
        isBilled: false,
        isStatus: false,
        Price: 0
      });

      fetchTasks();
    }
   
  } catch (error) {
    toast.error("Task Donot Create successful!", { position: "top-center" });
  }
};

const GetTask=async(task)=>{
  try {
    if(task._id){
      setEditTaskId(task._id);
       const response = await axios.get(`http://localhost:5000/api/gettask/${task._id}`)
       if(response.status===201){
        setFormData({
        
        title:response.data.title,
        description:response.data.description,
        StartDateTime:response.data.StartDateTime.slice(0,16),
        EndDateTime:response.data.EndDateTime.slice(0,16),
        isBilled:response.data.isBilled,
        isStatus:response.data.isStatus,
      });
       }
    }
    
  } catch (error) {
     console.log(error);
  }

}

const handleEditTask=async(id)=>{
  try {
    const response = await axios.put(`http://localhost:5000/api/updatetask/${id}`,{
     title:formData.title,
     description:formData.description,
     StartDateTime:formData.StartDateTime,
     EndDateTime:formData.EndDateTime,
     isBilled:formData.isBilled,
     isStatus:formData.isStatus
    })
    if(response.status===200){
        toast.success("Task Update successfully!", { position: "top-center" });
        fetchTasks();
    }

  } catch (error) {
     toast.error("Task Doesnot Update successful!", { position: "top-center" });
  }
} 

const handleDeleteTask=async(task)=>{
  try{
    if(task._id){

  
    const response = await axios.delete(`http://localhost:5000/api/deletetask/${task._id}`)
    if(response.status===200){
        toast.success("Task Delete successfully!", { position: "top-center" });
        fetchTasks();
    }
  }

  }
  catch (error) {
     toast.error("Task Doesnot Delete successful!", { position: "top-center" });
  }
}
 return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <aside className="bg-dark text-white p-3" style={{ width: "250px" }}>
        <h2 className="mb-4">📝 To-Do App</h2>
        <nav className="nav flex-column">
          <Link to="/dashboard" className="nav-link text-white">Dashboard</Link>
          <Link to="/dashboard/profile" className="nav-link text-white">Profile</Link>
          <Link to="/" className="nav-link text-danger">Logout</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Header */}
        <header className="d-flex justify-content-between align-items-center bg-light p-3 border-bottom">
          <h4 className="mb-0">Dashboard</h4>
          <div className="d-flex align-items-center gap-3">
            <span>Welcome, {name}</span>
            <button className="btn btn-danger btn-sm">Logout</button>
          </div>
        </header>

        {/* Body */}
        <main className="p-4 bg-light flex-grow-1">
          {/* Filters */}
          <div className="container mb-4">
            <h4 className="mb-3">Filter Tasks</h4>
            <div className="row g-3">
             
              <div className="col-md-3">
                <label className="form-label">Status</label>
                <select className="form-select" name="status" value={filters.status} onChange={handleFilterChange}>
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Billed</label>
                <select className="form-select" name="billed" value={filters.billed} onChange={handleFilterChange}>
                  <option value="">All</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Add Task Button */}
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTodoModal">+ Add Task</button>
          </div>

          {/* Task Table */}
          <table className="table table-bordered bg-white">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
                <th>Billed</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <tr key={task._id}>
                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{new Date(task.StartDateTime).toLocaleString()}</td>
                    <td>{new Date(task.EndDateTime).toLocaleString()}</td>
                    <td>{task.isStatus ? "Completed" : "Pending"}</td>
                    <td>{task.isBilled ? "Yes" : "No"}</td>
                    <td>Rs. {task.Price}</td>
                    <td>
                      <button className="btn btn-sm btn-success" onClick={() => handlePayWithCard(task._id)} disabled={task.isBilled}>
                        {task.isBilled ? "Paid" : "Pay"}
                      </button>
                      <button className="btn btn-dark mx-2 btn-sm" data-bs-toggle="modal" data-bs-target="#editTodoModal" onClick={() => GetTask(task)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTask(task)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">No tasks found</td>
                </tr>
              )}
            </tbody>
          </table>
        </main>
      </div>

      {/* Modals */}
      {/* Add Task Modal */}
      <div className="modal fade" id="addTodoModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <form className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Task</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              {/* Title */}
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} />
              </div>
              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" name="description" value={formData.description} onChange={handleChange}></textarea>
              </div>
              {/* Dates */}
              <div className="mb-3">
                <label className="form-label">Start Date & Time</label>
                <input type="datetime-local" className="form-control" name="StartDateTime" value={formData.StartDateTime} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">End Date & Time</label>
                <input type="datetime-local" className="form-control" name="EndDateTime" value={formData.EndDateTime} onChange={handleChange} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-success" onClick={handleSubmitTask}>Add</button>
            </div>
          </form>
        </div>
      </div>

      {/* Edit Task Modal */}
      <div className="modal fade" id="editTodoModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <form className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Task</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              {/* All Fields */}
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" name="description" value={formData.description} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Start Date & Time</label>
                <input type="datetime-local" className="form-control" name="StartDateTime" value={formData.StartDateTime} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">End Date & Time</label>
                <input type="datetime-local" className="form-control" name="EndDateTime" value={formData.EndDateTime} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Is Billed</label>
                <select className="form-select" name="isBilled" value={formData.isBilled} onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select className="form-select" name="isStatus" value={formData.isStatus} onChange={handleChange}>
                  <option value={false}>Pending</option>
                  <option value={true}>Completed</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-success" onClick={() => handleEditTask(editTaskId)}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}
