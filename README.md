# AFTERMATH

## AI-Powered Incident Investigation System

> **Don't just detect failures. Understand them.**

AFTERMATH is an AI-powered incident investigation system designed to help engineers understand software failures by reconstructing the sequence of events that led to an incident.

Rather than simply notifying engineers that something has gone wrong, AFTERMATH analyzes system events, service dependencies, configuration changes, and incident timelines to identify important events and generate a clear explanation of how the failure most likely unfolded.

---

## 1. Problem Statement

Modern software applications are composed of multiple interconnected services. While these services may appear healthy individually, a change or failure in one component can trigger a chain reaction across the system.

For example:

```text
User Application
       |
       v
  API Gateway
    /     \
   v       v
Order     Payment
Service   Service
   |         |
   v         v
Database  External API
```

When an incident occurs, the system can generate hundreds or thousands of:

* Error logs
* Alerts
* Metrics
* Service events
* Configuration changes

The challenge for engineers is not simply identifying that a failure has occurred. The difficult part is determining:

* What happened?
* What changed before the failure?
* Where did the incident originate?
* How did the failure propagate?
* What was the most likely root cause?

Engineers often need to move between multiple dashboards, logs, and monitoring systems to manually reconstruct the sequence of events. This can make incident investigation time-consuming and difficult, particularly in complex distributed systems.

---

## 2. Proposed Solution

AFTERMATH provides an AI-powered approach to incident investigation.

The system analyzes the available evidence surrounding an incident and connects significant events into a coherent sequence.

Instead of presenting engineers with thousands of isolated system events, AFTERMATH produces an understandable explanation of the incident.

### Example

A failure may develop through the following sequence:

```text
Configuration Change
        |
        v
Payment Service Slowdown
        |
        v
Increased Request Retries
        |
        v
API Overload
        |
        v
Order Failure
```

AFTERMATH analyzes this sequence and can generate an explanation such as:

> A configuration change in the payment service was followed by increased latency. This triggered excessive retry requests, eventually overloading the API and causing order failures.

---

## 3. How AFTERMATH Works

AFTERMATH focuses on reconstructing the events surrounding a software incident.

### Step 1: Incident Detection

A system failure is identified, such as users being unable to place orders.

### Step 2: Timeline Analysis

Events occurring before and during the incident are organized chronologically.

```text
10:05  Configuration Change
10:06  Payment Slowdown
10:07  Retry Spike
10:08  API Overload
10:09  Order Failure
```

### Step 3: Dependency Analysis

AFTERMATH examines relationships between services to understand how an issue in one component may affect other components.

### Step 4: Event Correlation

Important system changes and events are identified and connected based on their relationship to the incident.

### Step 5: Failure Reconstruction

The system reconstructs the sequence through which the incident developed.

### Step 6: AI Investigation Report

The available evidence is analyzed to produce the most likely explanation, including the suspected root cause, confidence level, and chain of events.

---

## 4. System Visualization

AFTERMATH represents the application as a live, interactive network of services and dependencies.

```text
                    USER APP
                       |
                       v
                 API GATEWAY
                  /         \
                 /           \
                v             v
        ORDER SERVICE    PAYMENT SERVICE
              |                 |
              v                 v
          DATABASE          EXTERNAL API
```

Under normal conditions, the system represents a healthy flow between services.

When an incident occurs, affected services can be identified within the network, allowing engineers to follow the impact of the failure through the application architecture.

---

## 5. Investigation Mode

When a failure is detected, AFTERMATH enters **Investigation Mode**.

The system moves backwards through the incident timeline, highlighting important events and tracing the path through which the failure developed.

```text
10:09  Order Failure
          ^
10:08  API Overload
          ^
10:07  Retry Spike
          ^
10:06  Payment Slowdown
          ^
10:05  Configuration Change
```

This provides engineers with a structured way to move from the observed failure toward the events that most likely contributed to it.

---

## 6. AI Investigation Report

After analyzing the available evidence, AFTERMATH presents the most likely explanation for the incident.

### Example

**Most Likely Root Cause**

```text
Payment Service Configuration Change
```

**Confidence**

```text
91%
```

**Chain of Events**

```text
Configuration Change
        |
        v
Increased Latency
        |
        v
Retry Storm
        |
        v
API Overload
        |
        v
Order Failure
```

The report provides a concise representation of the suspected root cause and the sequence of events leading to the incident.

---

## 7. Key Capabilities

| Capability                  | Description                                                             |
| --------------------------- | ----------------------------------------------------------------------- |
| Incident Timeline           | Organizes events before and during an incident                          |
| Service Dependency Analysis | Identifies relationships between application components                 |
| Event Correlation           | Connects relevant system changes and events                             |
| Failure Reconstruction      | Reconstructs how an incident developed                                  |
| AI Reasoning                | Generates an explanation based on available evidence                    |
| Root Cause Analysis         | Identifies the most likely source of the incident                       |
| Confidence Assessment       | Indicates the confidence associated with the investigation              |
| Interactive Visualization   | Represents services and incident impact through a connected system view |

---

## 8. What Makes AFTERMATH Different?

Traditional monitoring systems primarily focus on answering:

> **"Is something wrong?"**

AFTERMATH goes beyond detection by addressing:

> **"What happened?"**
> **"How did it happen?"**
> **"What most likely caused it?"**

The system combines event timelines, service dependencies, system changes, and AI reasoning to reconstruct a clear narrative of the incident.

---

## 9. Incident Investigation Flow

```text
                  Software Incident
                         |
                         v
                  Collect Events
                         |
                         v
                   Build Timeline
                         |
                         v
             Analyze Service Dependencies
                         |
                         v
                 Identify Key Events
                         |
                         v
              Reconstruct Event Chain
                         |
                         v
                  AI Investigation
                         |
                         v
                Root Cause Report
                         |
                         v
                  Engineer Insight
```

---

## 10. Example Scenario

Consider a large food delivery application.

Under normal conditions:

```text
Database       — Online
Payment        — Active
API            — Running
Authentication — Connected
```

Users suddenly become unable to place orders.

AFTERMATH analyzes the available events and reconstructs the incident:

```text
Configuration Change
        |
        v
Payment Latency Increase
        |
        v
Retry Spike
        |
        v
API Overload
        |
        v
Order Failure
```

Instead of requiring engineers to manually search through every available log and dashboard, AFTERMATH presents the sequence of events and identifies where the investigation should begin.

---

## 11. Project Objective

The primary objective of AFTERMATH is to reduce the time and effort required to understand complex software incidents.

When a system fails, receiving another alert is not enough. Engineers need to understand:

* What changed?
* How did the failure spread?
* Which events were significant?
* Where should the investigation begin?
* What is the most likely root cause?

AFTERMATH is designed to provide this information in a structured and understandable format.

---

## 12. Vision

The traditional incident response process can involve:

```text
Detect
  |
  v
Receive Alert
  |
  v
Search Logs
  |
  v
Check Dashboards
  |
  v
Correlate Events
  |
  v
Investigate
  |
  v
Understand
```

AFTERMATH aims to simplify this process:

```text
Detect
  |
  v
Investigate
  |
  v
Explain
  |
  v
Understand
```

The goal is to move incident response from simply detecting failures toward understanding the events and relationships behind them.

---

## 13. Project Summary

AFTERMATH is an AI-powered incident investigation system that transforms scattered system events into a structured explanation of a software failure.

By combining:

* Event timelines
* Service dependencies
* Configuration changes
* System events
* AI reasoning

AFTERMATH helps engineers understand how an incident developed, identify its most likely root cause, and determine where the investigation should begin.

---

## 14. Core Principle

> **Don't just detect failures. Understand them.**

---

## 15. Project Information

**Project Name:** AFTERMATH
**Project Type:** AI-Powered Incident Investigation System
**Focus Area:** Software Reliability and Incident Investigation
**Primary Objective:** Understand and explain the causes and progression of software failures

---
