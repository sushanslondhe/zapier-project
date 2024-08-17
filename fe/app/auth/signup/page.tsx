"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios.post("/");
  };
  return (
    <div>
      <section>
        <div className="flex min-h-screen flex-col bg-background">
          <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-md space-y-8">
              <div>
                <h1
                  className="text-center text-4xl font-bold tracking-tight"
                  style={{ color: "#ff4f00" }}
                >
                  Simplify Your Workflow
                </h1>
                <p className="mt-4 text-center text-lg text-muted-foreground">
                  Sign up for our powerful automation platform and streamline
                  your business processes.
                </p>
              </div>
              <div className="rounded-lg bg-card p-8 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="John Doe"
                      required
                      minLength={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button
                    variant="primaryButton"
                    type="submit"
                    className="w-full"
                  >
                    Sign up
                  </Button>
                </form>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/"
                  className="font-semibold text-[#ff4f00] text-primary hover:underline"
                  prefetch={false}
                >
                  Log in
                </Link>
              </p>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
