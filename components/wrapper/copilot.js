"use client";

import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import { useSession } from "next-auth/react";
import "@copilotkit/react-ui/styles.css";

export default function Copilot({ children }) {
  const { data: session } = useSession();
  return (
    <CopilotKit runtimeUrl={`${process.env.NEXT_PUBLIC_SERVER_URL}/ai/copilot`}>
      {children}
      {session && (
        <div className="fixed bottom-4 right-4 z-[9999]">
          <CopilotPopup
            instructions="You are a helpful AI assistant."
            labels={{
              title: "AI Assistant",
              initial: "Hi, I'm Virat assistant! How can I help you?",
            }}
          />
        </div>
      )}
    </CopilotKit>
  );
}
