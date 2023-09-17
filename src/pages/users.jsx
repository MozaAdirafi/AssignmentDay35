import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchusers } from "../redux/slice/usersSlice";
import "./users.css";

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    dispatch(fetchusers());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
      {users.map((user) => (
        <main className="card" key={user.id}>
        <div className="card-container">
          <div className="avatar">
            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
          </div>
          <div className="user-info">
            <h2>
              {user.first_name} {user.last_name}
            </h2>
          </div>
        </div>
        <div className="cta">
          <button className="follow">Edit</button>
          <button className="message">Delete</button>
        </div>
      </main>
      
      ))}
    </div>
  );
}

export default Users;
