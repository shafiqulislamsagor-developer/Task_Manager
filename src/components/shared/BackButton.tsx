"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function BackButton() {
  const navigate = useRouter();
  return <Button onClick={() => navigate.back()}>Back</Button>;
}
