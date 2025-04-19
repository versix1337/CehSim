import { useState, useEffect } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

const missionFlags = {
  whois: false,
  nslookup: false,
  dig: false,
  theharvester: false,
};

const checkAllFlags = () => {
  return Object.values(missionFlags).every(Boolean);
};

const commands = {
  whois: (term) => {
    if (!missionFlags.whois) {
      missionFlags.whois = true;
      term.writeln("[+] Whois mission completed!");
    }
    term.writeln("\nDomain Name: example.com");
    term.writeln("Registrar: Hacker Registrar Inc.");
    term.writeln("Creation Date: 2020-01-01");
    term.writeln("Expiration Date: 2030-01-01\n");
    checkMissionComplete(term);
  },
  nslookup: (term) => {
    if (!missionFlags.nslookup) {
      missionFlags.nslookup = true;
      term.writeln("[+] Nslookup mission completed!");
    }
    term.writeln("\nName:    example.com");
    term.writeln("Address: 93.184.216.34\n");
    checkMissionComplete(term);
  },
  dig: (term) => {
    if (!missionFlags.dig) {
      missionFlags.dig = true;
      term.writeln("[+] Dig mission completed!");
    }
    term.writeln("\n; <<>> DiG 9.10.6 <<>> example.com");
    term.writeln(";; ANSWER SECTION:");
    term.writeln("example.com.    3600    IN    A    93.184.216.34\n");
    checkMissionComplete(term);
  },
  theharvester: (term) => {
    if (!missionFlags.theharvester) {
      missionFlags.theharvester = true;
      term.writeln("[+] Email harvesting mission completed!");
    }
    term.writeln("\nEmails found:");
    term.writeln("admin@example.com");
    term.writeln("contact@example.com\n");
    checkMissionComplete(term);
  },
  clear: (term) => {
    term.clear();
    term.writeln("[i] Screen cleared.");
  },
  help: (term) => {
    term.writeln("\nAvailable reconnaissance commands:");
    term.writeln("whois - Perform a whois lookup on example.com");
    term.writeln("nslookup -
