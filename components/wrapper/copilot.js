"use client";

import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { usePathname } from "next/navigation"

export default function Copilot({ children }) {
  const pathname = usePathname();
  const inActive = pathname === "/home"

  return (
    <CopilotKit runtimeUrl={`${process.env.NEXT_PUBLIC_SERVER_URL}/ai/copilot`}>
      {children}
      {!inActive && (
        <CopilotPopup
  className="!fixed !bottom-16 sm:!bottom-4 !right-4 !z-[9999]"
  instructions="You are a helpful AI assistant."
  labels={{
    title: "AI Assistant",
    initial: "Hi, I'm Virat assistant! How can I help you?",
  }}
/>
      )}
    </CopilotKit>
  );
}
