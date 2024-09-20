"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { UserButton } from '@clerk/nextjs';

function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      {/* Header */}
      <header className="w-full bg-white shadow-sm p-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Image src="/logo.svg" alt="Logo" width={120} height={50} />
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="#about">About</Link>
              </li>
              <li>
                <Link href="/dashboard/billing">Pricing</Link>
              </li>
              <li>
                <Link href="#contact">Contact</Link>
              </li>
              {/* User button for authentication */}
              <li>
                <UserButton />
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full flex flex-col items-center text-center py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <h1 className="text-5xl font-bold mb-4">InspireAI</h1>
        <p className="text-xl mb-6">
          Revolutionize your content creation with our AI-powered app, delivering engaging and high-quality text in seconds.
        </p>
        <Button
          onClick={handleGetStarted}
          className="rounded-full bg-white text-black hover:ring-1 hover:ring-black-800 focus:outline-none"
        >
          Get Started
        </Button>
      </section>

      {/* Features Section */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-primary text-white rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">25+ templates</h3>
              <p className="text-white-700">
                Responsive, and mobile-first project on the web
              </p>
            </div>
            <div className="p-6 bg-primary text-white rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">Customizable</h3>
              <p className="text-white-700">
                Components are easily customized and extendable.
              </p>
            </div>
            <div className="p-6 bg-primary text-white rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-white-700">
                Contact us 24 hours a day, 7 days a week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-xl mb-6">
            At InspireAI, we are dedicated to providing cutting-edge AI solutions to help you create high-quality content effortlessly. Our team of experts is passionate about innovation and excellence, ensuring that our app delivers the best results for your content creation needs.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-xl mb-6">Have questions? Get in touch with us!</p>
          <form className="max-w-xl mx-auto">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg border"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg border"
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Your Message"
                className="w-full p-3 rounded-lg border"
                rows={4}  // Ensure rows is a number
              ></textarea>
            </div>
            <Button className="rounded-full bg-indigo-600 text-white">
              Send Message
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 InspireAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
