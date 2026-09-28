"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/home/");
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <Link href="/home/">Continue to ARA Lab</Link>
    </main>
  );
}