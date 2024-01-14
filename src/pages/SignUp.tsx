import GitHubLogo from "@/assets/github.svg";
import GoogleLogo from "@/assets/google.svg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import pb from "@/lib/pocketbase";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientResponseError } from "pocketbase";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(72),
    passwordConfirm: z.string(),
  })
  .refine(
    ({ password, passwordConfirm }) => {
      return password === passwordConfirm;
    },
    {
      message: "The password and confirmation password do not match.",
      path: ["passwordConfirm"],
    },
  );

const SignUp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const onSignIn = async (values: z.infer<typeof formSchema>) => {
    const usersCollection = pb.collection("users");
    try {
      await usersCollection.create(values);
      await usersCollection.authWithPassword(values.email, values.password);
      navigate("/");
    } catch (e) {
      if (e instanceof ClientResponseError) {
        const messages = Object.values(e.response.data).map((item) => {
          return (item as { code: string; message: string }).message;
        });
        toast({ description: messages.join(", "), variant: "destructive" });
      }
    }
  };

  const onGitHubSignIn = () => {
    update("github");
  };

  const onGoogleSignIn = () => {
    update("google");
  };

  const update = async (provider: string) => {
    const usersCollection = pb.collection("users");
    usersCollection
      .authWithOAuth2({ provider })
      .then(async (authData) => {
        if (authData.meta && (authData.record.name === "" || authData.record.avatar === "")) {
          const formData = new FormData();
          if (authData.meta.username) formData.append("username", authData.meta.username);
          if (authData.meta.name) formData.append("name", authData.meta.name);
          if (authData.meta.avatarUrl) {
            const data = await fetch(authData.meta.avatarUrl).then((response) => response.blob());
            const avatar = new File([data], authData.record.id, { type: data.type });
            formData.append("avatar", avatar);
          }
          await usersCollection.update(authData.record.id, formData);
        }
      })
      .then(() => navigate("/"));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSignIn)}>
        <Card className="w-96">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>Enter your email below to create your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline" onClick={onGitHubSignIn}>
                <img src={GitHubLogo} alt="GitHub Logo" className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline" onClick={onGoogleSignIn}>
                <img src={GoogleLogo} alt="Google Logo" className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="space-x-4">
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default SignUp;
