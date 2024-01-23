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
import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const onLogin = async (values: z.infer<typeof formSchema>) => {
    const usersCollection = pb.collection("users");
    try {
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

  const onGitHubLogin = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    update("github");
  };

  const onGoogleLogin = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    update("google");
  };

  const update = async (provider: string) => {
    const usersCollection = pb.collection("users");

    usersCollection
      .authWithOAuth2({ provider })
      .then(() => navigate("/"))
      .catch((e) => {
        if (e instanceof ClientResponseError) {
          toast({ description: e.originalError.message, variant: "destructive" });
        }
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onLogin)}>
        <Card className="w-96">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign in to your account</CardTitle>
            <CardDescription>Enter your email below to access your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline" onClick={onGitHubLogin}>
                <img src={GitHubLogo} alt="GitHub Logo" className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline" onClick={onGoogleLogin}>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} autoComplete="true" />
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

export default Login;
