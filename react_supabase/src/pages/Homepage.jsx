import { useEffect, useState } from "react";
import { supabase } from "../client";
import loader from "../assets/loader.svg";
import "./style.css";

const Homepage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({ full_name: "", bio: "", phone: "" });

  const data = sessionStorage.getItem("token");
  const userEmail = JSON.parse(data).user.email;

  async function getUsers() {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*");
      if (!error) {
        setUsers(data);
        setLoading(false);
      }
    } catch (er) {
      console.log(er);
    }
  }

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({ full_name: user.full_name, bio: user.bio, phone: user.phone });
    setIsEditModalOpen(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateUser = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .update({ full_name: formData.full_name, bio: formData.bio, phone: formData.phone })
        .eq("email", selectedUser.email);
      if (!error) {
        getUsers();
        setIsEditModalOpen(false);
      }
    } catch (er) {
      console.log(er);
    }
  };

  const deleteUser = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .delete()
        .eq("email", selectedUser.email);
      if (!error) {
        getUsers();
        setIsDeleteModalOpen(false);
      }
    } catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="homepage">
      {loading ? (
        <img src={loader} alt="loader-svg" />
      ) : (
        <>
          <h1>Hi {userEmail}!👋</h1>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Bio</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.full_name}</td>
                    <td>{user.email}</td>
                    <td>{user.bio}</td>
                    <td>{user.phone}</td>
                    <td>
                      <button className="button edit-button" onClick={() => handleEdit(user)}>Edit</button>
                      <button className="button delete-button" onClick={() => handleDelete(user)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit Modal */}
          {isEditModalOpen && (
            <div className="modal" style={{ display: "flex" }}>
              <div className="modal-content">
                <span className="close" onClick={() => setIsEditModalOpen(false)}>&times;</span>
                <h2>Edit User</h2>
                <form>
                  <label>Full Name</label>
                  <input type="text" name="full_name" value={formData.full_name} onChange={handleFormChange} />
                  <label>Bio</label>
                  <input type="text" name="bio" value={formData.bio} onChange={handleFormChange} />
                  <label>Phone</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleFormChange} />
                  <button type="button" onClick={updateUser}>Save</button>
                </form>
              </div>
            </div>
          )}

          {/* Delete Modal */}
          {isDeleteModalOpen && (
            <div className="modal" style={{ display: "flex" }}>
              <div className="modal-content">
                <span className="close" onClick={() => setIsDeleteModalOpen(false)}>&times;</span>
                <h2>Delete User</h2>
                <p>Are you sure you want to delete the user?</p>
                <div className="modal-buttons">
                  <button className="confirm-button" onClick={deleteUser}>Yes</button>
                  <button className="cancel-button" onClick={() => setIsDeleteModalOpen(false)}>No</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Homepage;
