import { useState } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

const missionFlags = {
  whois: false,
  nslookup: false,
  dig: false,
  theharvester: false,
};

const checkAllFlags = () => Object.values(missionFlags).every(Boolean);

const commands = {
  whois: (term) => {
    if (!missionFlags.whois) {
      missionFlags.whois = true;
      term.writeln("[+] Whois mission completed!");
    }
    term.writeln("Domain Name: example.com");
    term.writeln("Registrar: Hacker Registrar Inc.");
    term.writeln("Creation Date: 2020-01-01");
    term.writeln("Expiration Date: 2030-01-01");
    checkMissionComplete(term);
  },
  nslookup: (term) => {
    if (!missionFlags.nslookup) {
      missionFlags.nslookup = true;
      term.writeln("[+] Nslookup mission completed!");
    }
    term.writeln("Name:    example.com");
    term.writeln("Address: 93.184.216.34");
    checkMissionComplete(term);
  },
  dig: (term) => {
    if (!missionFlags.dig) {
      missionFlags.dig = true;
      term.writeln("[+] Dig mission completed!");
    }
    term.writeln("; <<>> DiG 9.10.6 <<>> example.com");
    term.writeln(";; ANSWER SECTION:");
    term.writeln("example.com.    3600    IN    A    93.184.216.34");
    checkMissionComplete(term);
  },
  theharvester: (term) => {
    if (!missionFlags.theharvester) {
      missionFlags.theharvester = true;
      term.writeln("[+] Email harvesting mission completed!");
    }
    term.writeln("Emails found:");
    term.writeln("admin@example.com");
    term.writeln("contact@example.com");
    checkMissionComplete(term);
  },
  clear: (term) => {
    term.clear();
    term.writeln("[i] Screen cleared.");
  },
  help: (term) => {
    term.writeln("Available reconnaissance commands:");
    term.writeln("whois - Perform a whois lookup on example.com");
    term.writeln("nslookup - Get the IP address of example.com");
    term.writeln("dig - Perform a DNS query");
    term.writeln("theharvester - Simulate email harvesting");
    term.writeln("clear - Clear the screen");
    term.writeln("help - Show this help message");
  },
};

const checkMissionComplete = (term) => {
  if (checkAllFlags()) {
    term.writeln("🎉 All Level 1 missions completed! Use 'clear' and type 'next' to continue to the next level.");
  }
};

export default function HackingSimulator() {
  const [terminal, setTerminal] = useState(null);

  const initTerminal = (node) => {
    if (!node || terminal) return;
    const term = new Terminal({
      cols: 100,
      rows: 30,
      theme: {
        background: "#000000",
        foreground: "#00FF00",
      },
      fontFamily: "monospace",
      fontSize: 14,
      cursorBlink: true,
    });

    term.open(node);
    term.writeln("██████████████████████████████████████████████████████████████████");
    term.writeln("█░░░░░░░░░░ Welcome to CEH Hacking Simulator - Level 1 ░░░░░░░░░░█");
    term.writeln("█ Objective: Complete all 4 reconnaissance missions              █");
    term.writeln('█ Use "help" to view commands. Use "clear" to clean your screen █');
    term.writeln("██████████████████████████████████████████████████████████████████");
    term.write("> ");
    handleInput(term);
    setTerminal(term);
  };

  const handleInput = (term) => {
    let command = "";
    term.onKey(({ key, domEvent }) => {
      const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;
      if (domEvent.key === "Enter") {
        term.write("\n");
        const cmd = command.trim().toLowerCase();
        if (commands[cmd]) {
          commands[cmd](term);
        } else if (cmd === "next" && checkAllFlags()) {
          term.writeln("➡️ Loading Level 2: Scanning...");
          term.writeln("(Coming soon!)");
        } else {
          term.writeln(`Command not recognized: ${cmd}`);
        }
        command = "";
        term.write("> ");
      } else if (domEvent.key === "Backspace") {
        if (command.length > 0) {
          command = command.slice(0, -1);
          term.write("\b \b");
        }
      } else if (printable) {
        command += key;
        term.write(key);
      }
    });
  };

  return (
    <div className="w-full h-screen bg-black text-green-500 p-2">
      <div ref={initTerminal} className="h-full w-full" />
    </div>
  );
}
