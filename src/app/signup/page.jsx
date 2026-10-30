"use client";

import { Label, ListBox, Select } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { imageUploader } from "@/lib/imageUploader";
import { Icon } from "@iconify/react";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  TextField,
  Card,
} from "@heroui/react";

import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export default function SignUppage() {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    console.log(user);

    const image = await imageUploader(user.image);

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      image: image.url,
      plan: "free",
    });

    console.log(data);
    console.log(error);

    if (data) {
      toast.success("Registration successful!");
      redirect("/login");
    }

    if (error) {
      toast.error("Registration failed!");
    }
  };

  const handlegooglesignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-4">
      <div className="mx-auto max-w-4xl">

        {/* Signup Card */}
        <Card className="overflow-hidden border border-blue-100 bg-white shadow-lg">
          <div className="grid md:grid-cols-2">

            {/* Left Image */}
            <div className="relative hidden min-h-[450px] md:block">
              <Image
                src="/asset/signupImage.png"
                alt="signup image"
                fill
                className="rounded-md object-cover"
              />
            </div>

            {/* Right Signup Form */}
            <div className="flex items-center justify-center px-5 py-5 md:px-6 md:py-4">
              <div className="w-full max-w-sm">

                {/* Heading */}
                <div className="mb-4 text-center">
                  <h1 className="text-2xl font-bold text-blue-700">
                    Create Your Account
                  </h1>

                  <p className="mt-1 text-xs text-blue-600">
                    Join us and enjoy fresh, quality products
                  </p>
                </div>

                {/* Form */}
                <Form
                  onSubmit={onSubmit}
                  className="mx-auto flex max-w-4xl flex-col gap-2.5"
                >

                  {/* Full Name */}
                  <TextField
                    isRequired
                    name="name"
                    type="text"
                  >
                    <Label className="text-blue-600">
                      Full Name
                    </Label>

                    <Input
                      placeholder="Enter your name"
                      className="border border-blue-200 bg-blue-50/40"
                    />

                    <FieldError />
                  </TextField>

                  {/* Email */}
                  <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                      if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                          value
                        )
                      ) {
                        return "Please enter a valid email address";
                      }

                      return null;
                    }}
                  >
                    <Label className="text-blue-600">
                      Email
                    </Label>

                    <Input
                      placeholder="Enter your email address"
                      className="border border-blue-200 bg-blue-50/40"
                    />

                    <FieldError />
                  </TextField>

                  {/* Password */}
                  <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                      if (value.length < 8) {
                        return "Password must be at least 8 characters";
                      }

                      if (!/[A-Z]/.test(value)) {
                        return "Password must contain at least one uppercase letter";
                      }

                      if (!/[0-9]/.test(value)) {
                        return "Password must contain at least one number";
                      }

                      return null;
                    }}
                  >
                    <Label className="text-blue-600">
                      Password
                    </Label>

                    <Input
                      placeholder="Enter your password"
                      className="border border-blue-200 bg-blue-50/40"
                    />

                    <Description>
                      Must be at least 8 characters with 1 uppercase
                      and 1 number
                    </Description>

                    <FieldError />
                  </TextField>

                  <TextField name="image" isRequired>
  <Label className="text-blue-600">
    Upload Image
  </Label>

  <input
    name="image"
    type="file"
    accept="image/*"
    required
    className="mt-1 w-full rounded-xl border border-blue-200 bg-blue-50/40 px-3 py-2 text-sm"
  />

  <FieldError />
</TextField>

                  {/* Role */}
                  <Select
                    className="w-full"
                    placeholder="Select one"
                    name="role"
                  >
                    <Label className="text-blue-600">
                      Role
                    </Label>

                    <Select.Trigger className="border border-blue-200">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover>
                      <ListBox>

                        <ListBox.Item
                          id="client"
                          textValue="client"
                        >
                          Client
                          <ListBox.ItemIndicator />
                        </ListBox.Item>

                        <ListBox.Item
                          id="freelancer"
                          textValue="freelancer"
                        >
                          Freelancer
                          <ListBox.ItemIndicator />
                        </ListBox.Item>

                      </ListBox>
                    </Select.Popover>
                  </Select>

                  {/* Create Account Button */}
                  <Button
                    type="submit"
                    className="mt-1 w-full bg-blue-600 font-semibold text-white hover:bg-blue-700"
                  >
                    Create Account
                  </Button>
                </Form>

                <div className="py-1 text-center text-gray-400">
                  or
                </div>

                {/* Google Sign In */}
                <Button
                  onClick={handlegooglesignIn}
                  className="w-full"
                  variant="tertiary"
                >
                  <Icon icon="devicon:google" />
                  Sign in with Google
                </Button>

                {/* Login Text */}
                <p className="mt-3 text-center text-xs text-gray-500">
                  Already have an account?{" "}

                  <Link href="/login">
                    <span className="cursor-pointer font-semibold text-blue-600 hover:text-blue-700">
                      Login
                    </span>
                  </Link>
                </p>

              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
