import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import React from "react";
import Content from "./Content";

export default function Navbar() {
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-2xl font-semibold">🧘 DIRO Pilates</h1>
      <span>
        Transform your body and mind with our premium Pilates sessions
      </span>
    </div>
  );
}
