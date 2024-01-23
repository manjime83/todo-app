import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import pb from "@/lib/pocketbase";
import { TasksResponse } from "@/lib/pocketbase-types";
import { cn } from "@/lib/utils";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [mode, setMode] = useState<"add" | "edit" | "list">("list");
  const [tasks, setTasks] = useState<TasksResponse[]>([]);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const tasksCollection = pb.collection("tasks");
    tasksCollection
      .getFullList({ sort: "created" })
      .then((data) => {
        setTasks(data);
      })
      .catch((e) => {
        if (e instanceof Error) {
          toast({ description: e.message, variant: "destructive" });
        }
      });
  }, []);

  const logout = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    pb.authStore.clear();
    navigate(0);
  };

  return (
    <Card className="min-h-96 w-96">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Tasks</CardTitle>
          {pb.authStore.isValid && <Button onClick={logout}>Logout</Button>}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between rounded-md border p-4">
            <p className={cn("text-sm font-medium leading-none", { "line-through": task.completed })}>{task.name}</p>
            <Switch
              checked={task.completed}
              onCheckedChange={() => {
                pb.collection("tasks")
                  .update(task.id, { completed: !task.completed })
                  .then(() => {
                    tasks.find((t) => t.id === task.id)!.completed = !task.completed;
                    toast({ description: "Task marked as completed" });
                  });
              }}
            />
          </div>
        ))}
      </CardContent>
      <CardFooter className="space-x-4">
        <Button type="submit" className="w-full" variant={"secondary"}>
          Add New Task
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Home;
