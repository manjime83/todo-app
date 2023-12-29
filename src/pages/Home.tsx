import { Button } from "@/components/ui/button";
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
          <Button asChild>
            <Link to="/signup">Sign up</Link>
          </Button>
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default Home;
