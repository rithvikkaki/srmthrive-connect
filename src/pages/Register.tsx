
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Register = () => {
  const [institutionName, setInstitutionName] = useState("SRM University");
  const [email, setEmail] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store user credentials in localStorage for basic authentication
    localStorage.setItem("srm-user-email", email);
    localStorage.setItem("srm-user-password", password);
    
    toast({
      title: "Account created successfully",
      description: "Please login with your credentials",
    });
    
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="grid md:grid-cols-2 w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl">
        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/80 z-10"></div>
          <img 
            src="/lovable-uploads/abca9c68-f4bd-439c-8c93-fda9733c7658.png" 
            alt="Connect" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-12 left-10 z-20">
            <h1 className="text-white text-3xl font-serif italic tracking-wide mb-4">
              <span className="text-thrive-400">SRM</span>Thrive
            </h1>
            <p className="text-white/80 max-w-xs">
              Join the SRM University community platform for opportunities and connections.
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
            <h2 className="text-2xl font-bold">Create your account</h2>
            <p className="text-muted-foreground mt-2">
              Join SRMThrive to access job postings, internships, and research opportunities
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="institution" className="block text-sm font-medium">
                Institution Name
              </label>
              <Input
                id="institution"
                type="text"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                readOnly
                className="w-full bg-muted"
              />
            </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="registrationNo" className="block text-sm font-medium">
                  Registration No
                </label>
                <Input
                  id="registrationNo"
                  type="text"
                  placeholder="Enter your reg. number"
                  value={registrationNo}
                  onChange={(e) => setRegistrationNo(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="collegeId" className="block text-sm font-medium">
                  College ID
                </label>
                <Input
                  id="collegeId"
                  type="text"
                  placeholder="Enter your college ID"
                  value={collegeId}
                  onChange={(e) => setCollegeId(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Create Password
              </label>
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

            <Button type="submit" className="w-full mt-6">
              SIGNUP
            </Button>

            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-thrive-600 hover:underline">
                  LOGIN
                </Link>
              </p>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">SIGNUP AS STUDENT</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
