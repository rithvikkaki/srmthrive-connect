
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [fullName, setFullName] = useState("");
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Supabase Auth login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session || !data.user) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error?.message || "Invalid email or password. Please try again.",
      });
      return;
    }

    // Check if profile exists, if not prompt for full name.
    const userId = data.user.id;

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, full_name")
      .eq("id", userId)
      .maybeSingle();

    if (profileError) {
      toast({
        variant: "destructive",
        title: "Profile error",
        description: profileError.message,
      });
      return;
    }

    if (!profile) {
      // Prompt user to provide name
      setPendingUserId(userId);
      setShowNamePrompt(true);
    } else {
      // Profile exists—go to app
      navigate("/app");
    }
  };

  // Save new profile with entered name
  const handleNameSubmit = async () => {
    if (!fullName.trim() || !pendingUserId) return;

    const { error } = await supabase
      .from("profiles")
      .insert([
        {
          id: pendingUserId,
          full_name: fullName.trim(),
          joined: new Date().toISOString().slice(0, 10),
        },
      ]);

    if (error) {
      toast({
        variant: "destructive",
        title: "Failed to save profile",
        description: error.message,
      });
      return;
    }
    setShowNamePrompt(false);
    setFullName("");
    setPendingUserId(null);
    toast({
      title: "Welcome!",
      description: "Your profile was created.",
    });
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="grid md:grid-cols-2 w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl">
        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/80 z-10"></div>
          <img 
            src="/lovable-uploads/f33df9d5-9f59-46db-9816-b298958f8a1b.png" 
            alt="Connect" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-12 left-10 z-20">
            <h1 className="text-white text-3xl font-serif italic tracking-wide mb-4">
              <span className="text-thrive-400">SRM</span>Thrive
            </h1>
            <p className="text-white/80 max-w-xs">
              Connect, collaborate, and thrive with the SRM University community.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12">
          <div className="mb-8 text-center md:text-left">
            <Link to="/" className="inline-block md:hidden mb-6">
              <h1 className="text-2xl font-serif italic tracking-wide">
                <span className="text-thrive-500">SRM</span>Thrive
              </h1>
            </Link>
            <h2 className="text-2xl font-bold">Login to your account</h2>
            <p className="text-muted-foreground mt-2">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="yourname@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-thrive-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full">
              LOGIN
            </Button>

            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-thrive-600 hover:underline">
                  CREATE ACCOUNT
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Dialog open={showNamePrompt} onOpenChange={() => setShowNamePrompt(false)}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle>Welcome!</DialogTitle>
            <DialogDescription>
              Please enter your full name to complete your profile.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Full Name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              autoFocus
            />
            <Button
              onClick={handleNameSubmit}
              disabled={!fullName.trim()}
              className="w-full bg-thrive-500 hover:bg-thrive-600"
            >
              Save Name &amp; Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;

