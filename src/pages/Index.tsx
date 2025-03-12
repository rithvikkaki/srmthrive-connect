
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Calendar, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-serif italic tracking-wide">
              <span className="text-thrive-500">SRM</span>Thrive
            </h1>
          </Link>
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-slide-in">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Connect, Collaborate, and Thrive at SRM
                </h1>
                <p className="text-lg text-muted-foreground">
                  A comprehensive platform for job postings, internships, and research collaborations 
                  designed specifically for SRM University students.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-thrive-300/50 to-thrive-500/80 rounded-full blur-3xl opacity-20 absolute -top-10 -right-10 w-2/3"></div>
                <img 
                  src="/lovable-uploads/f4be1a62-8e4b-453f-91ad-f2e9e48c7469.png" 
                  alt="SRMThrive Platform" 
                  className="relative z-10 w-full max-w-md mx-auto rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Your Complete Campus Companion</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                SRMThrive brings together everything you need for a successful academic journey in one place.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-thrive-500/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-thrive-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Research Collaboration</h3>
                <p className="text-muted-foreground">
                  Connect with fellow students and faculty for research projects and academic collaborations.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-thrive-500/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-thrive-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Job & Internship Portal</h3>
                <p className="text-muted-foreground">
                  Discover and apply for job opportunities and internships tailored for SRM students.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-thrive-500/10 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-thrive-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Events & Deadlines</h3>
                <p className="text-muted-foreground">
                  Stay up-to-date with campus events, academic deadlines, and important announcements.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Join the SRMThrive Community</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Connect with thousands of students, alumni, and faculty members from SRM University.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-thrive-50 to-thrive-100 rounded-lg p-8 text-center shadow-sm">
              <h3 className="text-2xl font-semibold mb-4">Ready to Thrive?</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Sign up now and take advantage of all the resources and opportunities available to the SRM community.
              </p>
              <Link to="/register">
                <Button size="lg">
                  Create Your Account <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-serif italic">
                <span className="text-thrive-500">SRM</span>Thrive
              </h2>
              <p className="text-sm text-muted-foreground">© 2023 SRMThrive. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
