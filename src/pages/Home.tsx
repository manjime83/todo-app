import { Button, buttonVariants } from "@/components/ui/button";
import pb from "@/lib/pocketbase";
import { UsersResponse } from "@/lib/pocketbase-types";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState<UsersResponse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const usersCollection = pb.collection("users");

    usersCollection
      .getFullList()
      .then((data) => {
        setUsers(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const logout = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    pb.authStore.clear();
    navigate(0);
  };

  return (
    <>
      <ul>
        {users?.map((item) => {
          return (
            <li key={item.id}>
              <pre>{JSON.stringify(item, null, 2)}</pre>
            </li>
          );
        })}
      </ul>
      {pb.authStore.isValid ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <div>
          <Link to="/signup" className={buttonVariants()}>
            Sign up
          </Link>
          <Link to="/login" className={buttonVariants()}>
            Login
          </Link>
        </div>
      )}
    </>
  );
};

export default Home;
